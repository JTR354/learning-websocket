import Koa from "koa";
import routes from "./routes";
import helmet from "koa-helmet";
import statics from "koa-static";
import path from "path";

const app = new Koa();
const port = 3000;

app.use(helmet()); // https://helmetjs.github.io/ 安全策略 header
app.use(statics(path.join(__dirname, "./public")));
app.use(routes());

app.listen(port, () => {
  console.log(`server is on port: ${port}`);
});
