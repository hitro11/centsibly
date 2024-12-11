import {
  require_authRecipe,
  require_recipe,
  require_utils as require_utils2
} from "./chunk-ETRNHHMA.js";
import {
  require_querier
} from "./chunk-UAORBIKZ.js";
import {
  require_build,
  require_utils
} from "./chunk-3S455SMP.js";
import {
  __commonJS
} from "./chunk-3OV72XIM.js";

// node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/lib/build/recipe/emailpassword/utils.js
var require_utils3 = __commonJS({
  "node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/lib/build/recipe/emailpassword/utils.js"(exports) {
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
    var utils_1 = require_utils2();
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

// node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/lib/build/recipe/emailpassword/recipeImplementation.js
var require_recipeImplementation = __commonJS({
  "node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/lib/build/recipe/emailpassword/recipeImplementation.js"(exports) {
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
    exports.getRecipeImplementation = void 0;
    var querier_1 = require_querier();
    var recipe_1 = require_recipe();
    var utils_1 = require_utils();
    function getRecipeImplementation(recipeImplInput) {
      var querier = new querier_1.default(recipeImplInput.recipeId, recipeImplInput.appInfo);
      return {
        submitNewPassword: function(_a) {
          var formFields = _a.formFields, options = _a.options, userContext = _a.userContext;
          return __awaiter(this, void 0, void 0, function() {
            var tenantId, token, _b, jsonBody, fetchResponse;
            return __generator(this, function(_c) {
              switch (_c.label) {
                case 0:
                  tenantId = this.getTenantIdFromURL({
                    userContext
                  });
                  token = this.getResetPasswordTokenFromURL({
                    userContext
                  });
                  return [4, querier.post(tenantId, "/user/password/reset", {
                    body: JSON.stringify({
                      formFields,
                      token,
                      method: "token"
                    })
                  }, querier_1.default.preparePreAPIHook({
                    recipePreAPIHook: recipeImplInput.preAPIHook,
                    action: "SUBMIT_NEW_PASSWORD",
                    options,
                    userContext
                  }), querier_1.default.preparePostAPIHook({
                    recipePostAPIHook: recipeImplInput.postAPIHook,
                    action: "SUBMIT_NEW_PASSWORD",
                    userContext
                  }))];
                case 1:
                  _b = _c.sent(), jsonBody = _b.jsonBody, fetchResponse = _b.fetchResponse;
                  if (jsonBody.status === "FIELD_ERROR") {
                    return [2, {
                      status: "FIELD_ERROR",
                      formFields: jsonBody.formFields,
                      fetchResponse
                    }];
                  }
                  if (jsonBody.status === "RESET_PASSWORD_INVALID_TOKEN_ERROR") {
                    return [2, {
                      status: jsonBody.status,
                      fetchResponse
                    }];
                  }
                  return [2, __assign(__assign({}, jsonBody), {
                    fetchResponse
                  })];
              }
            });
          });
        },
        sendPasswordResetEmail: function(_a) {
          var formFields = _a.formFields, options = _a.options, userContext = _a.userContext;
          return __awaiter(this, void 0, void 0, function() {
            var _b, jsonBody, fetchResponse, _c, _d;
            return __generator(this, function(_e) {
              switch (_e.label) {
                case 0:
                  _d = (_c = querier).post;
                  return [4, recipe_1.default.getInstanceOrThrow().recipeImplementation.getTenantId({
                    userContext
                  })];
                case 1:
                  return [4, _d.apply(_c, [_e.sent(), "/user/password/reset/token", {
                    body: JSON.stringify({
                      formFields
                    })
                  }, querier_1.default.preparePreAPIHook({
                    recipePreAPIHook: recipeImplInput.preAPIHook,
                    action: "SEND_RESET_PASSWORD_EMAIL",
                    options,
                    userContext
                  }), querier_1.default.preparePostAPIHook({
                    recipePostAPIHook: recipeImplInput.postAPIHook,
                    action: "SEND_RESET_PASSWORD_EMAIL",
                    userContext
                  })])];
                case 2:
                  _b = _e.sent(), jsonBody = _b.jsonBody, fetchResponse = _b.fetchResponse;
                  if (jsonBody.status === "FIELD_ERROR") {
                    return [2, {
                      status: "FIELD_ERROR",
                      formFields: jsonBody.formFields,
                      fetchResponse
                    }];
                  }
                  if (jsonBody.status === "PASSWORD_RESET_NOT_ALLOWED") {
                    return [2, {
                      status: jsonBody.status,
                      reason: jsonBody.reason,
                      fetchResponse
                    }];
                  }
                  return [2, {
                    status: jsonBody.status,
                    fetchResponse
                  }];
              }
            });
          });
        },
        signUp: function(_a) {
          var formFields = _a.formFields, shouldTryLinkingWithSessionUser = _a.shouldTryLinkingWithSessionUser, options = _a.options, userContext = _a.userContext;
          return __awaiter(this, void 0, void 0, function() {
            var _b, jsonBody, fetchResponse, _c, _d;
            return __generator(this, function(_e) {
              switch (_e.label) {
                case 0:
                  _d = (_c = querier).post;
                  return [4, recipe_1.default.getInstanceOrThrow().recipeImplementation.getTenantId({
                    userContext
                  })];
                case 1:
                  return [4, _d.apply(_c, [_e.sent(), "/signup", {
                    body: JSON.stringify({
                      formFields,
                      shouldTryLinkingWithSessionUser
                    })
                  }, querier_1.default.preparePreAPIHook({
                    recipePreAPIHook: recipeImplInput.preAPIHook,
                    action: "EMAIL_PASSWORD_SIGN_UP",
                    options,
                    userContext
                  }), querier_1.default.preparePostAPIHook({
                    recipePostAPIHook: recipeImplInput.postAPIHook,
                    action: "EMAIL_PASSWORD_SIGN_UP",
                    userContext
                  })])];
                case 2:
                  _b = _e.sent(), jsonBody = _b.jsonBody, fetchResponse = _b.fetchResponse;
                  if (jsonBody.status === "FIELD_ERROR") {
                    return [2, {
                      status: "FIELD_ERROR",
                      formFields: jsonBody.formFields,
                      fetchResponse
                    }];
                  }
                  if (jsonBody.status === "SIGN_UP_NOT_ALLOWED") {
                    return [2, {
                      status: "SIGN_UP_NOT_ALLOWED",
                      reason: jsonBody.reason,
                      fetchResponse
                    }];
                  }
                  return [2, {
                    status: jsonBody.status,
                    user: (0, utils_1.normaliseUser)("emailpassword", jsonBody.user),
                    fetchResponse
                  }];
              }
            });
          });
        },
        signIn: function(_a) {
          var formFields = _a.formFields, shouldTryLinkingWithSessionUser = _a.shouldTryLinkingWithSessionUser, options = _a.options, userContext = _a.userContext;
          return __awaiter(this, void 0, void 0, function() {
            var _b, jsonBody, fetchResponse, _c, _d;
            return __generator(this, function(_e) {
              switch (_e.label) {
                case 0:
                  _d = (_c = querier).post;
                  return [4, recipe_1.default.getInstanceOrThrow().recipeImplementation.getTenantId({
                    userContext
                  })];
                case 1:
                  return [4, _d.apply(_c, [_e.sent(), "/signin", {
                    body: JSON.stringify({
                      formFields,
                      shouldTryLinkingWithSessionUser
                    })
                  }, querier_1.default.preparePreAPIHook({
                    recipePreAPIHook: recipeImplInput.preAPIHook,
                    action: "EMAIL_PASSWORD_SIGN_IN",
                    options,
                    userContext
                  }), querier_1.default.preparePostAPIHook({
                    recipePostAPIHook: recipeImplInput.postAPIHook,
                    action: "EMAIL_PASSWORD_SIGN_IN",
                    userContext
                  })])];
                case 2:
                  _b = _e.sent(), jsonBody = _b.jsonBody, fetchResponse = _b.fetchResponse;
                  if (jsonBody.status === "FIELD_ERROR") {
                    return [2, {
                      status: "FIELD_ERROR",
                      formFields: jsonBody.formFields,
                      fetchResponse
                    }];
                  }
                  if (jsonBody.status === "WRONG_CREDENTIALS_ERROR") {
                    return [2, {
                      status: "WRONG_CREDENTIALS_ERROR",
                      fetchResponse
                    }];
                  }
                  if (jsonBody.status === "SIGN_IN_NOT_ALLOWED") {
                    return [2, {
                      status: "SIGN_IN_NOT_ALLOWED",
                      reason: jsonBody.reason,
                      fetchResponse
                    }];
                  }
                  return [2, {
                    status: "OK",
                    user: (0, utils_1.normaliseUser)("emailpassword", jsonBody.user),
                    fetchResponse
                  }];
              }
            });
          });
        },
        doesEmailExist: function(_a) {
          var email = _a.email, options = _a.options, userContext = _a.userContext;
          return __awaiter(this, void 0, void 0, function() {
            var _b, jsonBody, fetchResponse, _c, _d;
            return __generator(this, function(_e) {
              switch (_e.label) {
                case 0:
                  _d = (_c = querier).get;
                  return [4, recipe_1.default.getInstanceOrThrow().recipeImplementation.getTenantId({
                    userContext
                  })];
                case 1:
                  return [4, _d.apply(_c, [_e.sent(), "/emailpassword/email/exists", {}, {
                    email
                  }, querier_1.default.preparePreAPIHook({
                    recipePreAPIHook: recipeImplInput.preAPIHook,
                    action: "EMAIL_EXISTS",
                    options,
                    userContext
                  }), querier_1.default.preparePostAPIHook({
                    recipePostAPIHook: recipeImplInput.postAPIHook,
                    action: "EMAIL_EXISTS",
                    userContext
                  })])];
                case 2:
                  _b = _e.sent(), jsonBody = _b.jsonBody, fetchResponse = _b.fetchResponse;
                  return [2, {
                    status: jsonBody.status,
                    doesExist: jsonBody.exists,
                    fetchResponse
                  }];
              }
            });
          });
        },
        getResetPasswordTokenFromURL: function() {
          var token = (0, utils_1.getQueryParams)("token");
          if (token === void 0) {
            return "";
          }
          return token;
        },
        getTenantIdFromURL: function() {
          return (0, utils_1.getQueryParams)("tenantId");
        }
      };
    }
    exports.default = getRecipeImplementation;
    exports.getRecipeImplementation = getRecipeImplementation;
  }
});

// node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/lib/build/recipe/emailpassword/recipe.js
var require_recipe2 = __commonJS({
  "node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/lib/build/recipe/emailpassword/recipe.js"(exports) {
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
    var utils_1 = require_utils3();
    var recipeImplementation_1 = require_recipeImplementation();
    var supertokens_js_override_1 = require_build();
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
              clientType,
              appInfo
            }));
            return Recipe2.instance;
          };
        };
        Recipe2.getInstanceOrThrow = function() {
          if (Recipe2.instance === void 0) {
            var error = "No instance of EmailPassword found. Ensure that the 'EmailPassword.init' method is called within the 'SuperTokens.init' recipeList.";
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
        Recipe2.RECIPE_ID = "emailpassword";
        return Recipe2;
      }(authRecipe_1.default)
    );
    exports.Recipe = Recipe;
    exports.default = Recipe;
  }
});

// node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/lib/build/recipe/emailpassword/index.js
var require_emailpassword = __commonJS({
  "node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/lib/build/recipe/emailpassword/index.js"(exports) {
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
    exports.signOut = exports.getTenantIdFromURL = exports.getResetPasswordTokenFromURL = exports.doesEmailExist = exports.signIn = exports.signUp = exports.sendPasswordResetEmail = exports.submitNewPassword = exports.init = void 0;
    var recipe_1 = require_recipe2();
    var utils_1 = require_utils();
    var RecipeWrapper = (
      /** @class */
      function() {
        function RecipeWrapper2() {
        }
        RecipeWrapper2.init = function(config) {
          return recipe_1.default.init(config);
        };
        RecipeWrapper2.signOut = function(input) {
          return recipe_1.default.getInstanceOrThrow().signOut({
            userContext: (0, utils_1.getNormalisedUserContext)(input === null || input === void 0 ? void 0 : input.userContext)
          });
        };
        RecipeWrapper2.submitNewPassword = function(input) {
          return recipe_1.default.getInstanceOrThrow().recipeImplementation.submitNewPassword(__assign(__assign({}, input), {
            userContext: (0, utils_1.getNormalisedUserContext)(input.userContext)
          }));
        };
        RecipeWrapper2.sendPasswordResetEmail = function(input) {
          return recipe_1.default.getInstanceOrThrow().recipeImplementation.sendPasswordResetEmail(__assign(__assign({}, input), {
            userContext: (0, utils_1.getNormalisedUserContext)(input.userContext)
          }));
        };
        RecipeWrapper2.signUp = function(input) {
          return recipe_1.default.getInstanceOrThrow().recipeImplementation.signUp(__assign(__assign({}, input), {
            shouldTryLinkingWithSessionUser: input === null || input === void 0 ? void 0 : input.shouldTryLinkingWithSessionUser,
            userContext: (0, utils_1.getNormalisedUserContext)(input.userContext)
          }));
        };
        RecipeWrapper2.signIn = function(input) {
          return recipe_1.default.getInstanceOrThrow().recipeImplementation.signIn(__assign(__assign({}, input), {
            shouldTryLinkingWithSessionUser: input === null || input === void 0 ? void 0 : input.shouldTryLinkingWithSessionUser,
            userContext: (0, utils_1.getNormalisedUserContext)(input.userContext)
          }));
        };
        RecipeWrapper2.doesEmailExist = function(input) {
          return recipe_1.default.getInstanceOrThrow().recipeImplementation.doesEmailExist(__assign(__assign({}, input), {
            userContext: (0, utils_1.getNormalisedUserContext)(input.userContext)
          }));
        };
        RecipeWrapper2.getResetPasswordTokenFromURL = function(input) {
          return recipe_1.default.getInstanceOrThrow().recipeImplementation.getResetPasswordTokenFromURL(__assign(__assign({}, input), {
            userContext: (0, utils_1.getNormalisedUserContext)(input === null || input === void 0 ? void 0 : input.userContext)
          }));
        };
        RecipeWrapper2.getTenantIdFromURL = function(input) {
          return recipe_1.default.getInstanceOrThrow().recipeImplementation.getTenantIdFromURL(__assign(__assign({}, input), {
            userContext: (0, utils_1.getNormalisedUserContext)(input === null || input === void 0 ? void 0 : input.userContext)
          }));
        };
        return RecipeWrapper2;
      }()
    );
    exports.default = RecipeWrapper;
    var init = RecipeWrapper.init;
    exports.init = init;
    var submitNewPassword = RecipeWrapper.submitNewPassword;
    exports.submitNewPassword = submitNewPassword;
    var sendPasswordResetEmail = RecipeWrapper.sendPasswordResetEmail;
    exports.sendPasswordResetEmail = sendPasswordResetEmail;
    var signUp = RecipeWrapper.signUp;
    exports.signUp = signUp;
    var signIn = RecipeWrapper.signIn;
    exports.signIn = signIn;
    var doesEmailExist = RecipeWrapper.doesEmailExist;
    exports.doesEmailExist = doesEmailExist;
    var signOut = RecipeWrapper.signOut;
    exports.signOut = signOut;
    var getResetPasswordTokenFromURL = RecipeWrapper.getResetPasswordTokenFromURL;
    exports.getResetPasswordTokenFromURL = getResetPasswordTokenFromURL;
    var getTenantIdFromURL = RecipeWrapper.getTenantIdFromURL;
    exports.getTenantIdFromURL = getTenantIdFromURL;
  }
});

// node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/recipe/emailpassword/index.js
var require_emailpassword2 = __commonJS({
  "node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/recipe/emailpassword/index.js"(exports) {
    function __export(m) {
      for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    exports.__esModule = true;
    __export(require_emailpassword());
  }
});
export default require_emailpassword2();
//# sourceMappingURL=supertokens-web-js_recipe_emailpassword.js.map
