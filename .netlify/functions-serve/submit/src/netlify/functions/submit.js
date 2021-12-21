var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// netlify/functions/submit.ts
__export(exports, {
  handler: () => handler
});
var isHexCode = (str) => /^#(?:[0-9a-fA-F]{3}){1,2}$/.test(str);
var handler = async (event) => {
  var _a;
  const { name, favoriteHexCode } = JSON.parse((_a = event.body) != null ? _a : "");
  let invalidFields = {};
  if (typeof name !== "string" || !name.length) {
    invalidFields.name = "The name cannot be left blank";
  }
  if (typeof favoriteHexCode !== "string" || !isHexCode(favoriteHexCode)) {
    invalidFields.favoriteHexCode = "Should be a valid hexcode. Ex: #CCC or #CCCDDD";
  }
  if (Object.keys(invalidFields).length) {
    const response2 = {
      invalidFields,
      message: "Some of this form data was malformed. Please try again."
    };
    return {
      statusCode: 400,
      body: JSON.stringify(response2)
    };
  }
  const response = {
    name,
    favoriteHexCode,
    message: `My name is ${name} and my favorite color is ${favoriteHexCode}`
  };
  return {
    statusCode: 200,
    body: JSON.stringify(response)
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
//# sourceMappingURL=submit.js.map
