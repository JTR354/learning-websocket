import combineRouters from "koa-combine-routers";
import aRouter from "./a-route";
import bRouter from "./b-route";
import demoRouter from "./demo-route";

// 整合路由
export default combineRouters(aRouter, bRouter, demoRouter);
