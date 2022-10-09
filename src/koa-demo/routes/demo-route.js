import Router from "koa-router";
import demoController from "../api/demo";

const router = new Router();

router.get("/demo", demoController.demo);

export default router;
