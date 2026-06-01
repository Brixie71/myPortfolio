const express = require("express");
const path = require("node:path");

const app = express();
const publicDir = path.join(__dirname, "public");

app.use(express.static(publicDir));

app.get("/", (req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

function startServer({
  port = Number(process.env.PORT) || 3000,
  host = process.env.HOST || "127.0.0.1",
} = {}) {
  return new Promise((resolve, reject) => {
    const server = app.listen(port, host, () => {
      resolve(server);
    });

    server.on("error", reject);
  });
}

if (require.main === module) {
  startServer()
    .then((server) => {
      const address = server.address();
      const resolvedHost =
        typeof address === "object" && address.address ? address.address : "127.0.0.1";
      const resolvedPort =
        typeof address === "object" && address.port ? address.port : 3000;

      console.log(`Server running at http://${resolvedHost}:${resolvedPort}/`);
    })
    .catch((error) => {
      console.error("Failed to start server:", error);
      process.exitCode = 1;
    });
}

module.exports = {
  app,
  startServer,
};
