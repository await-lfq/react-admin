const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use("/lfq", createProxyMiddleware({
    target: "http://localhost:2021",
    changeOrigin: true,
    pathRewrite: {
      "^/lfq": ""
    }
  }))
}