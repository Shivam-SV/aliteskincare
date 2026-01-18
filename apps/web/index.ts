import { serve } from "bun";
import { render } from "./src/entry-server";

const port = process.env.PORT ? parseInt(process.env.PORT as string) : 3000;

serve({
  port: port,
  async fetch(req) {
    const url = new URL(req.url);

    // SSR route
    if (url.pathname === "/" || !url.pathname.includes(".")) {
      try {
        const html = render();
        
        return new Response(html, {
          headers: {
            "Content-Type": "text/html",
          },
        });
      } catch (error) {
        console.error("SSR Error:", error);
        return new Response("Internal Server Error", { status: 500 });
      }
    }

    return new Response("Not Found", { status: 404 });
  },
});

console.log(`🚀 Web server running on http://localhost:${port}`);
console.log(`📦 For development with Tailwind/HMR, use: bunx vite`);
