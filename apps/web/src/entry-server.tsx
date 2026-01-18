import { renderToString } from "react-dom/server";
import App from "./App";
import "./index.css";

export function render() {
  const html = renderToString(<App />);
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Alite Skincare</title>
        <meta name="description" content="React SSR app with Bun and Hono" />
        <meta property="og:title" content="Alite Skincare" />
      </head>
      <body class="font-sans antialiased">
        <div id="app">${html}</div>
        <script type="module" src="/src/entry-client.tsx"></script>
      </body>
    </html>
  `;
}
