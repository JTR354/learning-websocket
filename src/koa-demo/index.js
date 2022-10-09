const Koa = require("koa");
const routes = require("./routes");
const app = new Koa();
const port = 3000;

app.use(require("koa-helmet")()); // https://helmetjs.github.io/ 安全策略 header
app.use(require("koa-static")("./public"));
app.use(routes());

app.listen(port, () => {
  console.log(`server is on port: ${port}`);
});
