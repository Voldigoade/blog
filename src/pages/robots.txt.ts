import type { APIRoute } from "astro";
import { withBase } from "../utils/url";

export const GET: APIRoute = ({ site }) => {
  const body = [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${new URL(withBase("/sitemap-index.xml"), site)}`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
