class DemoController {
  async demo(ctx) {
    ctx.body = {
      msg: "demo",
    };
  }
}

export default new DemoController();
