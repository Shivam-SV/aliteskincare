// @ts-nocheck
import { db } from "../db";
import { products } from "../db/schema";
import { eq, like, and, or, desc, asc, gte, lte } from "drizzle-orm";

export class ProductsController {
  /**
   * Get all products with pagination and filters
   */
  async getProducts(params: {
    page?: number;
    limit?: number;
    category?: "face-care" | "body-care" | "combo" | "others";
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    isBestSeller?: boolean;
    isActive?: boolean;
    sortBy?: "price" | "name" | "createdAt" | "discountPercentage";
    sortOrder?: "asc" | "desc";
  }) {
    const {
      page = 1,
      limit = 20,
      category,
      search,
      minPrice,
      maxPrice,
      isBestSeller,
      isActive = true,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = params;

    const conditions = [];

    if (isActive !== undefined) {
      conditions.push(eq(products.isActive, isActive));
    }

    if (category) {
      conditions.push(eq(products.category, category));
    }

    if (search) {
      conditions.push(
        or(
          like(products.name, `%${search}%`),
          like(products.description, `%${search}%`)
        )!
      );
    }

    if (minPrice !== undefined) {
      conditions.push(gte(products.price, minPrice.toString()));
    }

    if (maxPrice !== undefined) {
      conditions.push(lte(products.price, maxPrice.toString()));
    }

    if (isBestSeller !== undefined) {
      conditions.push(eq(products.isBestSeller, isBestSeller));
    }

    const whereClause = conditions.length > 0 ? (and(...conditions) as SQL<unknown>) : undefined;

    // Get total count for pagination
    const allProductsForCount = await db
      .select()
      .from(products)
      .where(whereClause);
    const totalCount = allProductsForCount.length;

    // Get products with pagination
    const offset = (page - 1) * limit;
    const sortColumn =
      sortBy === "price"
        ? products.price
        : sortBy === "name"
        ? products.name
        : sortBy === "discountPercentage"
        ? products.discountPercentage
        : products.createdAt;

    const orderBy = sortOrder === "asc" ? asc(sortColumn) : desc(sortColumn);

    const allProducts = await db
      .select()
      .from(products)
      .where(whereClause)
      .orderBy(orderBy)
      .limit(limit)
      .offset(offset);

    return {
      products: allProducts,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    };
  }

  /**
   * Get product by ID
   */
  async getProductById(id: number) {
    const [product] = await db
      .select()
      .from(products)
      .where(eq(products.id, id))
      .limit(1);
    return product || null;
  }

  /**
   * Get product by SKU
   */
  async getProductBySku(sku: string) {
    const [product] = await db
      .select()
      .from(products)
      .where(eq(products.sku, sku))
      .limit(1);
    return product || null;
  }

  /**
   * Get products by category
   */
  async getProductsByCategory(
    category: "face-care" | "body-care" | "combo" | "others",
    limit: number = 50
  ) {
    const allProducts = await db
      .select()
      .from(products)
      .where(and(eq(products.category, category), eq(products.isActive, true)) as SQL<unknown>)
      .limit(limit);
    return allProducts;
  }

  /**
   * Get best sellers
   */
  async getBestSellers(limit: number = 10) {
    const bestSellers = await db
      .select()
      .from(products)
      .where(and(eq(products.isBestSeller, true), eq(products.isActive, true)) as SQL<unknown>)
      .orderBy(desc(products.createdAt))
      .limit(limit);
    return bestSellers;
  }

  /**
   * Search products
   */
  async searchProducts(query: string, limit: number = 20) {
    const searchResults = await db
      .select()
      .from(products)
      .where(
        and(
          or(
            like(products.name, `%${query}%`),
            like(products.description, `%${query}%`)
          )!,
          eq(products.isActive, true)
        ) as SQL<unknown>
      )
      .limit(limit);
    return searchResults;
  }

  /**
   * Get products on sale
   */
  async getProductsOnSale(minDiscount: number = 1, limit: number = 20) {
    const onSaleProducts = await db
      .select()
      .from(products)
      .where(
        and(
          gte(products.discountPercentage, minDiscount),
          eq(products.isActive, true)
        ) as SQL<unknown>
      )
      .orderBy(desc(products.discountPercentage))
      .limit(limit);
    return onSaleProducts;
  }
}

// Export singleton instance
export const productsController = new ProductsController();
