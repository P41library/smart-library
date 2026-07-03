// Vercel Node.js serverless function — wraps TanStack Start's Fetch API handler
export default async function handler(req, res) {
  try {
    const protocol = req.headers["x-forwarded-proto"] || "https";
    const host = req.headers.host;
    const url = new URL(req.url, `${protocol}://${host}`);

    // Build a Web API Request from Node.js req
    const webRequest = new Request(url.toString(), {
      method: req.method,
      headers: Object.entries(req.headers).reduce((acc, [k, v]) => {
        acc[k] = Array.isArray(v) ? v.join(", ") : v;
        return acc;
      }, {}),
      body:
        req.method !== "GET" && req.method !== "HEAD"
          ? await readBody(req)
          : undefined,
      duplex: "half",
    });

    // Import the TanStack Start server (built output)
    const { default: server } = await import("../dist/server/server.js");
    const response = await server.fetch(webRequest, {}, {});

    res.statusCode = response.status;
    for (const [key, value] of response.headers.entries()) {
      res.setHeader(key, value);
    }

    const buffer = await response.arrayBuffer();
    res.end(Buffer.from(buffer));
  } catch (e) {
    console.error(e);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}
