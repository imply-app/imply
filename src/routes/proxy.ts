import type { APIEvent } from "@solidjs/start/server";

export async function GET(e: APIEvent) {
  try {
    const url = new URL(e.request.url);
    const proxy_to = url.searchParams.get("url");
    console.log('proxy_to', proxy_to);

    if (!proxy_to) {
      throw new Error("url param not found");
    }

    const fetchResponse = await fetch(proxy_to);

    if (!fetchResponse.ok) {
      throw new Error("Failed to fetch the proxied URL");
    }

    return new Response(fetchResponse.body, {
      status: fetchResponse.status
    });

  } catch (error) {
    console.error("Error fetching data:", error);
    return new Response("Failed to fetch the proxied URL", { status: 500 });
  }
}
