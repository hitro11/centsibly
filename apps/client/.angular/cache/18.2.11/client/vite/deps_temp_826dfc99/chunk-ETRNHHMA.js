import {
  require_querier,
  require_utils as require_utils2
} from "./chunk-UAORBIKZ.js";
import {
  require_build,
  require_recipe,
  require_recipeModule,
  require_utils
} from "./chunk-3S455SMP.js";
import {
  __commonJS
} from "./chunk-3OV72XIM.js";

// node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/lib/build/recipe/authRecipe/utils.js
var require_utils3 = __commonJS({
  "node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/lib/build/recipe/authRecipe/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.normaliseAuthRecipe = void 0;
    var utils_1 = require_utils2();
    function normaliseAuthRecipe(config) {
      return (0, utils_1.normaliseRecipeModuleConfig)(config);
    }
    exports.normaliseAuthRecipe = normaliseAuthRecipe;
  }
});

// node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/lib/build/recipe/multitenancy/utils.js
var require_utils4 = __commonJS({
  "node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/lib/build/recipe/multitenancy/utils.js"(exports) {
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
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.normaliseUserInput = void 0;
    var utils_1 = require_utils3();
    function normaliseUserInput(config) {
      var override = __assign({
        functions: function(originalImplementation) {
          return originalImplementation;
        }
      }, config.override);
      return __assign(__assign({}, (0, utils_1.normaliseAuthRecipe)(config)), {
        override
      });
    }
    exports.normaliseUserInput = normaliseUserInput;
  }
});

// node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/lib/build/recipe/multitenancy/recipeImplementation.js
var require_recipeImplementation = __commonJS({
  "node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/lib/build/recipe/multitenancy/recipeImplementation.js"(exports) {
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
    exports.getRecipeImplementation = void 0;
    var querier_1 = require_querier();
    var utils_1 = require_utils();
    function getRecipeImplementation(recipeImplInput) {
      var querier = new querier_1.default(recipeImplInput.recipeId, recipeImplInput.appInfo);
      return {
        getTenantId: function() {
          var queryParam = (0, utils_1.getQueryParams)("tenantId");
          if ((queryParam === null || queryParam === void 0 ? void 0 : queryParam.trim()) === "") {
            return void 0;
          }
          return queryParam;
        },
        getLoginMethods: function(_a) {
          var tenantId = _a.tenantId, options = _a.options, userContext = _a.userContext;
          return __awaiter(this, void 0, void 0, function() {
            var queryParams, _b, jsonBody, fetchResponse, firstFactors;
            return __generator(this, function(_c) {
              switch (_c.label) {
                case 0:
                  queryParams = {};
                  if (recipeImplInput.clientType !== void 0) {
                    queryParams.clientType = recipeImplInput.clientType;
                  }
                  return [4, querier.get(tenantId, "/loginmethods", {}, queryParams, querier_1.default.preparePreAPIHook({
                    recipePreAPIHook: recipeImplInput.preAPIHook,
                    action: "GET_LOGIN_METHODS",
                    options,
                    userContext
                  }), querier_1.default.preparePostAPIHook({
                    recipePostAPIHook: recipeImplInput.postAPIHook,
                    action: "GET_LOGIN_METHODS",
                    userContext
                  }))];
                case 1:
                  _b = _c.sent(), jsonBody = _b.jsonBody, fetchResponse = _b.fetchResponse;
                  if (jsonBody.firstFactors === void 0) {
                    firstFactors = [];
                    if (jsonBody.emailPassword.enabled) {
                      firstFactors.push("emailpassword");
                    }
                    if (jsonBody.thirdParty.enabled) {
                      firstFactors.push("thirdparty");
                    }
                    if (jsonBody.passwordless.enabled) {
                      firstFactors.push("otp-email");
                      firstFactors.push("otp-phone");
                      firstFactors.push("link-email");
                      firstFactors.push("link-phone");
                    }
                  } else {
                    firstFactors = jsonBody.firstFactors;
                  }
                  return [2, {
                    status: "OK",
                    thirdParty: {
                      providers: jsonBody.thirdParty.providers
                    },
                    firstFactors,
                    fetchResponse
                  }];
              }
            });
          });
        }
      };
    }
    exports.default = getRecipeImplementation;
    exports.getRecipeImplementation = getRecipeImplementation;
  }
});

// node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/lib/build/recipe/authRecipe/index.js
var require_authRecipe = __commonJS({
  "node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/lib/build/recipe/authRecipe/index.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
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
    var recipeModule_1 = require_recipeModule();
    var recipe_1 = require_recipe();
    var AuthRecipe = (
      /** @class */
      function(_super) {
        __extends(AuthRecipe2, _super);
        function AuthRecipe2(config) {
          var _this = _super.call(this, config) || this;
          _this.signOut = function(input) {
            return __awaiter(_this, void 0, void 0, function() {
              return __generator(this, function(_a) {
                switch (_a.label) {
                  case 0:
                    return [4, recipe_1.default.getInstanceOrThrow().signOut({
                      userContext: input.userContext
                    })];
                  case 1:
                    return [2, _a.sent()];
                }
              });
            });
          };
          return _this;
        }
        return AuthRecipe2;
      }(recipeModule_1.default)
    );
    exports.default = AuthRecipe;
  }
});

// node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/lib/build/recipe/multitenancy/recipe.js
var require_recipe2 = __commonJS({
  "node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/lib/build/recipe/multitenancy/recipe.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
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
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Recipe = void 0;
    var utils_1 = require_utils4();
    var supertokens_js_override_1 = require_build();
    var recipeImplementation_1 = require_recipeImplementation();
    var utils_2 = require_utils();
    var authRecipe_1 = require_authRecipe();
    var Recipe = (
      /** @class */
      function(_super) {
        __extends(Recipe2, _super);
        function Recipe2(config) {
          var _this = _super.call(this, (0, utils_1.normaliseUserInput)(config)) || this;
          var builder = new supertokens_js_override_1.default((0, recipeImplementation_1.default)({
            recipeId: _this.config.recipeId,
            appInfo: _this.config.appInfo,
            clientType: _this.config.clientType,
            preAPIHook: _this.config.preAPIHook,
            postAPIHook: _this.config.postAPIHook
          }));
          _this.recipeImplementation = builder.override(_this.config.override.functions).build();
          return _this;
        }
        Recipe2.init = function(config) {
          return function(appInfo, clientType) {
            Recipe2.instance = new Recipe2(__assign(__assign({}, config), {
              recipeId: Recipe2.RECIPE_ID,
              appInfo,
              clientType
            }));
            return Recipe2.instance;
          };
        };
        Recipe2.getInstanceOrThrow = function() {
          if (Recipe2.instance === void 0) {
            var error = "No instance of Multitenancy found. Ensure that 'SuperTokens.init' method has been called.";
            error = (0, utils_2.checkForSSRErrorAndAppendIfNeeded)(error);
            throw Error(error);
          }
          return Recipe2.instance;
        };
        Recipe2.reset = function() {
          if (!(0, utils_2.isTest)()) {
            return;
          }
          Recipe2.instance = void 0;
          return;
        };
        Recipe2.RECIPE_ID = "multitenancy";
        return Recipe2;
      }(authRecipe_1.default)
    );
    exports.Recipe = Recipe;
    exports.default = Recipe;
  }
});

export {
  require_utils3 as require_utils,
  require_authRecipe,
  require_recipe2 as require_recipe
};
//# sourceMappingURL=chunk-ETRNHHMA.js.map
