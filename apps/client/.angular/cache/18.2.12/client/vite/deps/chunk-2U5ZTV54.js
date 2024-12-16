import {
  require_error,
  require_normalisedURLPath
} from "./chunk-VCHKITVJ.js";
import {
  __commonJS,
  __spreadValues
} from "./chunk-3OV72XIM.js";

// ../../node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/lib/build/recipe/recipeModule/utils.js
var require_utils = __commonJS({
  "../../node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/lib/build/recipe/recipeModule/utils.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = exports && exports.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return {
                value: op[1],
                done: false
              };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.normaliseRecipeModuleConfig = void 0;
    function normaliseRecipeModuleConfig(config) {
      var _this = this;
      var preAPIHook = config.preAPIHook;
      if (preAPIHook === void 0) {
        preAPIHook = function(context) {
          return __awaiter(_this, void 0, void 0, function() {
            return __generator(this, function(_a) {
              return [2, context];
            });
          });
        };
      }
      var postAPIHook = config.postAPIHook;
      if (postAPIHook === void 0) {
        postAPIHook = function() {
          return __awaiter(_this, void 0, void 0, function() {
            return __generator(this, function(_a) {
              return [
                2
                /*return*/
              ];
            });
          });
        };
      }
      return {
        recipeId: config.recipeId,
        appInfo: config.appInfo,
        clientType: config.clientType,
        preAPIHook,
        postAPIHook
      };
    }
    exports.normaliseRecipeModuleConfig = normaliseRecipeModuleConfig;
  }
});

// ../../node_modules/.pnpm/supertokens-website@20.1.5/node_modules/supertokens-website/utils/error/index.js
var require_error2 = __commonJS({
  "../../node_modules/.pnpm/supertokens-website@20.1.5/node_modules/supertokens-website/utils/error/index.js"(exports) {
    "use strict";
    function __export(m) {
      for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    exports.__esModule = true;
    var d = require_error();
    if (d.default !== void 0) {
      __export(d);
    } else {
      __export(__spreadValues({
        default: d
      }, d));
    }
  }
});

// ../../node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/lib/build/error.js
var require_error3 = __commonJS({
  "../../node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/lib/build/error.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var error_1 = require_error2();
    exports.default = error_1.STGeneralError;
  }
});

// ../../node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/lib/build/version.js
var require_version = __commonJS({
  "../../node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/lib/build/version.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.supported_fdi = exports.package_version = void 0;
    exports.package_version = "0.14.0";
    exports.supported_fdi = ["3.1", "4.0"];
  }
});

// ../../node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/lib/build/querier.js
var require_querier = __commonJS({
  "../../node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/lib/build/querier.js"(exports) {
    "use strict";
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = exports && exports.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return {
                value: op[1],
                done: false
              };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var normalisedURLPath_1 = require_normalisedURLPath();
    var version_1 = require_version();
    var error_1 = require_error3();
    var Querier = (
      /** @class */
      function() {
        function Querier2(recipeId, appInfo) {
          var _this = this;
          this.recipeId = recipeId;
          this.appInfo = appInfo;
          this.get = function(tenantId, path, config, queryParams, preAPIHook, postAPIHook) {
            return __awaiter(_this, void 0, void 0, function() {
              var result, jsonBody;
              return __generator(this, function(_b) {
                switch (_b.label) {
                  case 0:
                    return [4, this.fetch(this.getFullUrl(tenantId, path, queryParams), __assign({
                      method: "GET"
                    }, config), preAPIHook, postAPIHook)];
                  case 1:
                    result = _b.sent();
                    return [4, this.getResponseJsonOrThrowGeneralError(result)];
                  case 2:
                    jsonBody = _b.sent();
                    return [2, {
                      jsonBody,
                      fetchResponse: result
                    }];
                }
              });
            });
          };
          this.post = function(tenantId, path, config, preAPIHook, postAPIHook) {
            return __awaiter(_this, void 0, void 0, function() {
              var result, jsonBody;
              return __generator(this, function(_b) {
                switch (_b.label) {
                  case 0:
                    if (config.body === void 0) {
                      throw new Error("Post request must have a body");
                    }
                    return [4, this.fetch(this.getFullUrl(tenantId, path), __assign({
                      method: "POST"
                    }, config), preAPIHook, postAPIHook)];
                  case 1:
                    result = _b.sent();
                    return [4, this.getResponseJsonOrThrowGeneralError(result)];
                  case 2:
                    jsonBody = _b.sent();
                    return [2, {
                      jsonBody,
                      fetchResponse: result
                    }];
                }
              });
            });
          };
          this.delete = function(tenantId, path, config, preAPIHook, postAPIHook) {
            return __awaiter(_this, void 0, void 0, function() {
              var result, jsonBody;
              return __generator(this, function(_b) {
                switch (_b.label) {
                  case 0:
                    return [4, this.fetch(this.getFullUrl(tenantId, path), __assign({
                      method: "DELETE"
                    }, config), preAPIHook, postAPIHook)];
                  case 1:
                    result = _b.sent();
                    return [4, this.getResponseJsonOrThrowGeneralError(result)];
                  case 2:
                    jsonBody = _b.sent();
                    return [2, {
                      jsonBody,
                      fetchResponse: result
                    }];
                }
              });
            });
          };
          this.put = function(tenantId, path, config, preAPIHook, postAPIHook) {
            return __awaiter(_this, void 0, void 0, function() {
              var result, jsonBody;
              return __generator(this, function(_b) {
                switch (_b.label) {
                  case 0:
                    return [4, this.fetch(this.getFullUrl(tenantId, path), __assign({
                      method: "PUT"
                    }, config), preAPIHook, postAPIHook)];
                  case 1:
                    result = _b.sent();
                    return [4, this.getResponseJsonOrThrowGeneralError(result)];
                  case 2:
                    jsonBody = _b.sent();
                    return [2, {
                      jsonBody,
                      fetchResponse: result
                    }];
                }
              });
            });
          };
          this.fetch = function(url, config, preAPIHook, postAPIHook) {
            return __awaiter(_this, void 0, void 0, function() {
              var headers, _b, requestInit, modifiedUrl, result, reponseForPostAPI;
              return __generator(this, function(_c) {
                switch (_c.label) {
                  case 0:
                    if (config === void 0) {
                      headers = {};
                    } else {
                      headers = config.headers;
                    }
                    return [4, this.callPreAPIHook({
                      preAPIHook,
                      url,
                      requestInit: __assign(__assign({}, config), {
                        headers: __assign(__assign({}, headers), {
                          "fdi-version": version_1.supported_fdi.join(","),
                          "Content-Type": "application/json",
                          rid: this.recipeId
                        })
                      })
                    })];
                  case 1:
                    _b = _c.sent(), requestInit = _b.requestInit, modifiedUrl = _b.url;
                    return [4, fetch(modifiedUrl, requestInit)];
                  case 2:
                    result = _c.sent();
                    if (result.status >= 300) {
                      throw result;
                    }
                    if (!(postAPIHook !== void 0)) return [3, 4];
                    reponseForPostAPI = result.clone();
                    return [4, postAPIHook({
                      requestInit,
                      url,
                      fetchResponse: reponseForPostAPI
                    })];
                  case 3:
                    _c.sent();
                    _c.label = 4;
                  case 4:
                    return [2, result];
                }
              });
            });
          };
          this.callPreAPIHook = function(context) {
            return __awaiter(_this, void 0, void 0, function() {
              var result;
              return __generator(this, function(_b) {
                switch (_b.label) {
                  case 0:
                    if (context.preAPIHook === void 0) {
                      return [2, {
                        url: context.url,
                        requestInit: context.requestInit
                      }];
                    }
                    return [4, context.preAPIHook({
                      url: context.url,
                      requestInit: context.requestInit
                    })];
                  case 1:
                    result = _b.sent();
                    return [2, result];
                }
              });
            });
          };
          this.getFullUrl = function(tenantId, pathStr, queryParams) {
            var basePath = _this.appInfo.apiBasePath.getAsStringDangerous();
            if (tenantId !== void 0 && tenantId !== "public") {
              basePath = "".concat(basePath, "/").concat(tenantId);
            }
            var path = new normalisedURLPath_1.default(pathStr);
            var fullUrl = "".concat(_this.appInfo.apiDomain.getAsStringDangerous()).concat(basePath).concat(path.getAsStringDangerous());
            if (queryParams === void 0) {
              return fullUrl;
            }
            return fullUrl + "?" + new URLSearchParams(queryParams);
          };
          this.getResponseJsonOrThrowGeneralError = function(response) {
            return __awaiter(_this, void 0, void 0, function() {
              var json, message;
              return __generator(this, function(_b) {
                switch (_b.label) {
                  case 0:
                    return [4, response.clone().json()];
                  case 1:
                    json = _b.sent();
                    if (json.status === "GENERAL_ERROR") {
                      message = json.message === void 0 ? "No Error Message Provided" : json.message;
                      throw new error_1.default(message);
                    }
                    return [2, json];
                }
              });
            });
          };
        }
        var _a;
        _a = Querier2;
        Querier2.preparePreAPIHook = function(_b) {
          var recipePreAPIHook = _b.recipePreAPIHook, action = _b.action, options = _b.options, userContext = _b.userContext;
          return function(context) {
            return __awaiter(void 0, void 0, void 0, function() {
              var postRecipeHookContext;
              return __generator(_a, function(_b2) {
                switch (_b2.label) {
                  case 0:
                    return [4, recipePreAPIHook(__assign(__assign({}, context), {
                      action,
                      userContext
                    }))];
                  case 1:
                    postRecipeHookContext = _b2.sent();
                    if (options === void 0 || options.preAPIHook === void 0) {
                      return [2, postRecipeHookContext];
                    }
                    return [2, options.preAPIHook({
                      url: postRecipeHookContext.url,
                      requestInit: postRecipeHookContext.requestInit,
                      userContext
                    })];
                }
              });
            });
          };
        };
        Querier2.preparePostAPIHook = function(_b) {
          var recipePostAPIHook = _b.recipePostAPIHook, action = _b.action, userContext = _b.userContext;
          return function(context) {
            return __awaiter(void 0, void 0, void 0, function() {
              return __generator(_a, function(_b2) {
                switch (_b2.label) {
                  case 0:
                    return [4, recipePostAPIHook(__assign(__assign({}, context), {
                      userContext,
                      action
                    }))];
                  case 1:
                    _b2.sent();
                    return [
                      2
                      /*return*/
                    ];
                }
              });
            });
          };
        };
        return Querier2;
      }()
    );
    exports.default = Querier;
  }
});

export {
  require_utils,
  require_error3 as require_error,
  require_querier
};
//# sourceMappingURL=chunk-2U5ZTV54.js.map
