import Koa from "koa";
import routes from "./routes";
import helmet from "koa-helmet";
import statics from "koa-static";
import path from "path";
import compose from "koa-compose";
import koaBody from "koa-body";
import koaJson from "koa-json";
import compress from "koa-compress";

const isDev = !String(process.env.NODE_ENV).startsWith("prod");
const app = new Koa();
const port = 3000;

const middleware = compose([
  helmet(), // https://helmetjs.github.io/ 安全策略 header
  statics(path.join(__dirname, "./public")),
  koaBody(),
  koaJson({ param: "pretty", pretty: false }),
  routes(),
]);

app.use(middleware);

if (!isDev) {
  app.use(compress());
}

app.listen(port, () => {
  console.log(`server is on port: ${port}`);
});
