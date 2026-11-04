import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "out");
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};
http
  .createServer((request, response) => {
    const pathname = decodeURIComponent(
      new URL(request.url, "http://localhost").pathname,
    );
    const relative =
      pathname === "/"
        ? "/index.html"
        : pathname.endsWith("/")
          ? pathname + "index.html"
          : pathname;
    const target = path.resolve(root, "." + relative);
    if (
      !target.startsWith(root + path.sep) &&
      target !== path.join(root, "index.html")
    ) {
      response.writeHead(403);
      response.end();
      return;
    }
    fs.readFile(target, (error, data) => {
      if (error) {
        response.writeHead(404);
        response.end("Not found");
        return;
      }
      response.writeHead(200, {
        "content-type":
          types[path.extname(target)] || "application/octet-stream",
      });
      response.end(data);
    });
  })
  .listen(4173, "127.0.0.1", () =>
    console.log("Local URL: http://127.0.0.1:4173"),
  );
