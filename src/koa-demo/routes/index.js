const combineRouters = require("koa-combine-routers");
// 整合路由
module.exports = combineRouters(require("./a-route"), require("./b-route"));
