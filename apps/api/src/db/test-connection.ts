import { db } from "./index";
import { sql } from "drizzle-orm";

/**
 * Test database connection
 * Run with: bun run src/db/test-connection.ts
 */
async function testConnection() {
  try {
    const result = await db.execute(sql`SELECT 1 as test`);
    console.log("✅ Database connection successful!");
    console.log("Test query result:", result);
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
}

testConnection();
