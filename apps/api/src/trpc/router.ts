import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { productsController } from "../controllers/products.controller";

const t = initTRPC.create();

export const appRouter = t.router({
  // Products procedures
  getProducts: t.procedure
    .input(
      z
        .object({
          page: z.number().min(1).default(1),
          limit: z.number().min(1).max(100).default(20),
          category: z.enum(["face-care", "body-care", "combo", "others"]).optional(),
          search: z.string().optional(),
          minPrice: z.number().optional(),
          maxPrice: z.number().optional(),
          isBestSeller: z.boolean().optional(),
          isActive: z.boolean().optional(),
          sortBy: z.enum(["price", "name", "createdAt", "discountPercentage"]).default("createdAt"),
          sortOrder: z.enum(["asc", "desc"]).default("desc"),
        })
        .optional()
    )
    .query(async ({ input = {} }) => {
      return productsController.getProducts(input);
    }),

  getProductById: t.procedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return productsController.getProductById(input.id);
    }),

  getProductBySku: t.procedure
    .input(z.object({ sku: z.string() }))
    .query(async ({ input }) => {
      return productsController.getProductBySku(input.sku);
    }),

  getProductsByCategory: t.procedure
    .input(
      z.object({
        category: z.enum(["face-care", "body-care", "combo", "others"]),
        limit: z.number().min(1).max(100).optional(),
      })
    )
    .query(async ({ input }) => {
      return productsController.getProductsByCategory(input.category, input.limit);
    }),

  getBestSellers: t.procedure
    .input(
      z
        .object({
          limit: z.number().min(1).max(50).default(10),
        })
        .optional()
    )
    .query(async ({ input }) => {
      return productsController.getBestSellers(input?.limit);
    }),

  searchProducts: t.procedure
    .input(
      z.object({
        query: z.string().min(1),
        limit: z.number().min(1).max(100).default(20),
      })
    )
    .query(async ({ input }) => {
      return productsController.searchProducts(input.query, input.limit);
    }),

  getProductsOnSale: t.procedure
    .input(
      z
        .object({
          minDiscount: z.number().min(0).default(1),
          limit: z.number().min(1).max(100).default(20),
        })
        .optional()
    )
    .query(async ({ input }) => {
      return productsController.getProductsOnSale(input?.minDiscount, input?.limit);
    }),
});

export type AppRouter = typeof appRouter;
