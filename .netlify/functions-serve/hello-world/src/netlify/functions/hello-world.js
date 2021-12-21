var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// netlify/functions/hello-world.ts
__export(exports, {
  handler: () => handler
});
var handler = async () => {
  return {
    statusCode: 200,
    body: "hello ts!"
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
//# sourceMappingURL=hello-world.js.map
