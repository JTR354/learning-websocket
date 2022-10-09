const koa = require("koa");
const Router = require("koa-router");
const json = require("koa-json");
const body = require("koa-body");
const cors = require("@koa/cors");

const app = new koa();

const router = new Router();

router.prefix("/api");

router.get("/", async (ctx, next) => {
  const param = ctx.request.query;
  console.log(typeof param, param);
  ctx.body = "hello koa-router" + JSON.stringify(param);
  next();
});

router.get("/api", async (ctx, next) => {
  ctx.body = "hi api";
  await next();
  console.log("api end");
});

router.post("/post", (ctx, next) => {
  const { body } = ctx.request;
  // console.log(typeof body, body);
  // ctx.body = { name: "leo", nick: "jtr" };
  // `body` is string
  ctx.body = JSON.parse(body);
  next();
});

const port = 3000;
app
  .use(cors())
  .use(body())
  .use(json({ param: "pretty", pretty: false }))
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(port, () => {
    console.log(`server at port: ${port}`);
  });
