export const config = { runtime: "edge" };

export default async function handler(request: Request) {
  try {
    const url = new URL(request.url);
    const originUrl = "https://live.kwikmotion.com/syriatv02live/syriatv02.smil/syriatv02publish/syriatv02_720p/chunks.m3u8";

    // 1. Serve M3U8 Playlist
    if (url.pathname.endsWith(".m3u8")) {
      const response = await fetch(originUrl, {
        headers: { "User-Agent": "Mozilla/5.0" } // Bypass bot blocks
      });
      
      let playlist = await response.text();
      
      // Rewrite segment URLs to use Vercel's endpoint
      playlist = playlist.replace(/(\n)(?!#)(.*?\.ts)/g, (_, newline, segment) => {
        const fullUrl = new URL(segment, originUrl).toString();
        return `${newline}${url.origin}/api/stream?segment=${encodeURIComponent(fullUrl)}`;
      });

      return new Response(playlist, {
        headers: {
          "Content-Type": "application/vnd.apple.mpegurl",
          "Cache-Control": "no-cache",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }

    // 2. Serve TS Segments
    if (url.searchParams.has("segment")) {
      const segmentUrl = decodeURIComponent(url.searchParams.get("segment")!);
      const response = await fetch(segmentUrl, {
        headers: { "User-Agent": "Mozilla/5.0" }
      });

      return new Response(response.body, {
        headers: {
          "Content-Type": "video/MP2T",
          "Cache-Control": "public, max-age=3600",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }

    return new Response("Not Found", { status: 404 });

  } catch (error) {
    return new Response("Server Error", { status: 500 });
  }
}
