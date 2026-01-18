const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export interface Product {
  id: number;
  name: string;
  description: string | null;
  originalPrice: string;
  price: string;
  discountPercentage: number;
  sku: string;
  category: string;
  stock: number;
  imageUrl: string | null;
  isActive: boolean;
  isBestSeller: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Call tRPC procedure using HTTP
 * For fetchRequestHandler with queries:
 * - GET: /api/procedureName?input=<URI-encoded-JSON>
 * - POST: /api/procedureName with JSON body (also works)
 * 
 * We'll use GET for queries (standard tRPC way) and POST for mutations
 */
async function trpcCall(procedure: string, input?: any, isMutation: boolean = false) {
  let url: string;
  let options: RequestInit;

  if (isMutation) {
    // Mutations use POST with input in body
    url = `${API_URL}/${procedure}`;
    options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input || {}),
    };
  } else {
    // Queries use GET with input in query parameter
    const inputParam = input ? encodeURIComponent(JSON.stringify(input)) : "";
    url = `${API_URL}/${procedure}${inputParam ? `?input=${inputParam}` : ""}`;
    options = {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
    };
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API call failed: ${response.statusText} - ${errorText}`);
  }

  const data = await response.json();
  
  // tRPC response format: { result: { data: ... } } or { error: ... }
  if (data.error) {
    throw new Error(data.error.message || data.error.code || "API error");
  }
  
  return data.result?.data || data;
}

/**
 * Get best seller products
 */
export async function getBestSellers(limit: number = 10): Promise<Product[]> {
  const result = await trpcCall("getBestSellers", { limit });
  return result;
}

/**
 * Get all products with filters
 */
export async function getProducts(params?: {
  page?: number;
  limit?: number;
  category?: "face-care" | "body-care" | "combo" | "others";
  search?: string;
  isBestSeller?: boolean;
}): Promise<{ products: Product[]; pagination: any }> {
  const result = await trpcCall("getProducts", params);
  return result;
}
