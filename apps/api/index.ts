import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from "bun";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "./src/trpc/router";
import type { Context } from "hono";

const app = new Hono();
const port = process.env.PORT ? parseInt(process.env.PORT as string) : 4000;

// CORS configuration
app.use(
  "*",
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  })
);

app.all("/api/*", (c: Context) =>
  fetchRequestHandler({
    endpoint: "/api",
    req: c.req.raw,
    router: appRouter,
    createContext: () => ({}),
  })
);

serve({
  fetch: app.fetch,
  port: port,
});

console.log(`API server is running on http://localhost:${port}`);
