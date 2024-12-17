import {
  require_session
} from "./chunk-DCAB6CTW.js";
import {
  require_dateProvider,
  require_postSuperTokensInitCallbacks
} from "./chunk-AAK6N5TR.js";
import {
  require_querier,
  require_utils as require_utils2
} from "./chunk-Z5ISHUDP.js";
import {
  require_build,
  require_constants,
  require_sessionClaimValidatorStore,
  require_utils
} from "./chunk-AMLKBHRA.js";
import {
  __commonJS,
  __spreadValues
} from "./chunk-3OV72XIM.js";

// ../../node_modules/.pnpm/supertokens-website@20.1.5/node_modules/supertokens-website/utils/sessionClaimValidatorStore/index.js
var require_sessionClaimValidatorStore2 = __commonJS({
  "../../node_modules/.pnpm/supertokens-website@20.1.5/node_modules/supertokens-website/utils/sessionClaimValidatorStore/index.js"(exports) {
    "use strict";
    function __export(m) {
      for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    exports.__esModule = true;
    var d = require_sessionClaimValidatorStore();
    if (d.default !== void 0) {
      __export(d);
    } else {
      __export(__spreadValues({
        default: d
      }, d));
    }
  }
});

// ../../node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/lib/build/sessionClaimValidatorStore.js
var require_sessionClaimValidatorStore3 = __commonJS({
  "../../node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/lib/build/sessionClaimValidatorStore.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.SessionClaimValidatorStore = void 0;
    var sessionClaimValidatorStore_1 = require_sessionClaimValidatorStore2();
    Object.defineProperty(exports, "SessionClaimValidatorStore", {
      enumerable: true,
      get: function() {
        return sessionClaimValidatorStore_1.SessionClaimValidatorStore;
      }
    });
  }
});

// ../../node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/lib/build/recipe/emailverification/utils.js
var require_utils3 = __commonJS({
  "../../node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/lib/build/recipe/emailverification/utils.js"(exports) {
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
      return __assign(__assign({}, (0, utils_1.normaliseRecipeModuleConfig)(config)), {
        override
      });
    }
    exports.normaliseUserInput = normaliseUserInput;
  }
});

// ../../node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/lib/build/recipe/emailverification/recipeImplementation.js
var require_recipeImplementation = __commonJS({
  "../../node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/lib/build/recipe/emailverification/recipeImplementation.js"(exports) {
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
    function getRecipeImplementation(recipeImpleInput) {
      var querier = new querier_1.default(recipeImpleInput.recipeId, recipeImpleInput.appInfo);
      return {
        verifyEmail: function(_a) {
          var options = _a.options, userContext = _a.userContext;
          return __awaiter(this, void 0, void 0, function() {
            var token, tenantId, _b, jsonBody, fetchResponse;
            return __generator(this, function(_c) {
              switch (_c.label) {
                case 0:
                  token = this.getEmailVerificationTokenFromURL({
                    userContext
                  });
                  tenantId = this.getTenantIdFromURL({
                    userContext
                  });
                  return [4, querier.post(tenantId, "/user/email/verify", {
                    body: JSON.stringify({
                      method: "token",
                      token
                    })
                  }, querier_1.default.preparePreAPIHook({
                    recipePreAPIHook: recipeImpleInput.preAPIHook,
                    action: "VERIFY_EMAIL",
                    options,
                    userContext
                  }), querier_1.default.preparePostAPIHook({
                    recipePostAPIHook: recipeImpleInput.postAPIHook,
                    userContext,
                    action: "VERIFY_EMAIL"
                  }))];
                case 1:
                  _b = _c.sent(), jsonBody = _b.jsonBody, fetchResponse = _b.fetchResponse;
                  return [2, {
                    status: jsonBody.status,
                    fetchResponse
                  }];
              }
            });
          });
        },
        isEmailVerified: function(_a) {
          var options = _a.options, userContext = _a.userContext;
          return __awaiter(this, void 0, void 0, function() {
            var _b, jsonBody, fetchResponse;
            return __generator(this, function(_c) {
              switch (_c.label) {
                case 0:
                  return [4, querier.get(void 0, "/user/email/verify", {}, void 0, querier_1.default.preparePreAPIHook({
                    recipePreAPIHook: recipeImpleInput.preAPIHook,
                    action: "IS_EMAIL_VERIFIED",
                    options,
                    userContext
                  }), querier_1.default.preparePostAPIHook({
                    recipePostAPIHook: recipeImpleInput.postAPIHook,
                    userContext,
                    action: "IS_EMAIL_VERIFIED"
                  }))];
                case 1:
                  _b = _c.sent(), jsonBody = _b.jsonBody, fetchResponse = _b.fetchResponse;
                  return [2, {
                    status: "OK",
                    isVerified: jsonBody.isVerified,
                    fetchResponse
                  }];
              }
            });
          });
        },
        sendVerificationEmail: function(_a) {
          var options = _a.options, userContext = _a.userContext;
          return __awaiter(this, void 0, void 0, function() {
            var _b, jsonBody, fetchResponse;
            return __generator(this, function(_c) {
              switch (_c.label) {
                case 0:
                  return [4, querier.post(void 0, "/user/email/verify/token", {
                    body: JSON.stringify({})
                  }, querier_1.default.preparePreAPIHook({
                    recipePreAPIHook: recipeImpleInput.preAPIHook,
                    action: "SEND_VERIFY_EMAIL",
                    options,
                    userContext
                  }), querier_1.default.preparePostAPIHook({
                    recipePostAPIHook: recipeImpleInput.postAPIHook,
                    userContext,
                    action: "SEND_VERIFY_EMAIL"
                  }))];
                case 1:
                  _b = _c.sent(), jsonBody = _b.jsonBody, fetchResponse = _b.fetchResponse;
                  return [2, {
                    status: jsonBody.status,
                    fetchResponse
                  }];
              }
            });
          });
        },
        getEmailVerificationTokenFromURL: function() {
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

// ../../node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/lib/build/recipe/emailverification/emailVerificationClaim.js
var require_emailVerificationClaim = __commonJS({
  "../../node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/lib/build/recipe/emailverification/emailVerificationClaim.js"(exports) {
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
    exports.EmailVerificationClaimClass = void 0;
    var dateProvider_1 = require_dateProvider();
    var session_1 = require_session();
    var constants_1 = require_constants();
    function getThresholdAwareDefaultValue(defaultVal) {
      return Math.max(defaultVal, dateProvider_1.DateProviderReference.getReferenceOrThrow().dateProvider.getThresholdInSeconds());
    }
    var EmailVerificationClaimClass = (
      /** @class */
      function(_super) {
        __extends(EmailVerificationClaimClass2, _super);
        function EmailVerificationClaimClass2(getRecipeImpl) {
          var _this = _super.call(this, {
            id: constants_1.EMAILVERIFICATION_CLAIM_ID,
            refresh: function(userContext) {
              return __awaiter(_this, void 0, void 0, function() {
                return __generator(this, function(_a) {
                  switch (_a.label) {
                    case 0:
                      return [4, getRecipeImpl().isEmailVerified({
                        userContext
                      })];
                    case 1:
                      _a.sent();
                      return [
                        2
                        /*return*/
                      ];
                  }
                });
              });
            }
          }) || this;
          _this.validators = __assign(__assign({}, _this.validators), {
            isVerified: function(refetchTimeOnFalseInSeconds, maxAgeInSeconds) {
              return {
                id: _this.id,
                refresh: _this.refresh,
                shouldRefresh: function(payload, userContext) {
                  var DateProvider = dateProvider_1.DateProviderReference.getReferenceOrThrow().dateProvider;
                  refetchTimeOnFalseInSeconds = refetchTimeOnFalseInSeconds !== null && refetchTimeOnFalseInSeconds !== void 0 ? refetchTimeOnFalseInSeconds : getThresholdAwareDefaultValue(10);
                  if (maxAgeInSeconds !== void 0 && maxAgeInSeconds < DateProvider.getThresholdInSeconds()) {
                    throw new Error("maxAgeInSeconds must be greater than or equal to the DateProvider threshold value -> ".concat(DateProvider.getThresholdInSeconds()));
                  }
                  if (refetchTimeOnFalseInSeconds < DateProvider.getThresholdInSeconds()) {
                    throw new Error("refetchTimeOnFalseInSeconds must be greater than or equal to the DateProvider threshold value -> ".concat(DateProvider.getThresholdInSeconds()));
                  }
                  var value = _this.getValueFromPayload(payload, userContext);
                  if (value === void 0) {
                    return true;
                  }
                  var currentTime = DateProvider.now();
                  var lastRefetchTime = _this.getLastFetchedTime(payload, userContext);
                  if (maxAgeInSeconds !== void 0) {
                    if (lastRefetchTime < currentTime - maxAgeInSeconds * 1e3) {
                      return true;
                    }
                  }
                  if (value === false) {
                    if (lastRefetchTime < currentTime - refetchTimeOnFalseInSeconds * 1e3) {
                      return true;
                    }
                  }
                  return false;
                },
                validate: function(payload, userContext) {
                  return __awaiter(_this, void 0, void 0, function() {
                    var value;
                    return __generator(this, function(_a) {
                      value = this.getValueFromPayload(payload, userContext);
                      return [2, value === true ? {
                        isValid: true
                      } : {
                        isValid: false,
                        reason: {
                          message: "wrong value",
                          expectedValue: true,
                          actualValue: value
                        }
                      }];
                    });
                  });
                }
              };
            }
          });
          return _this;
        }
        return EmailVerificationClaimClass2;
      }(session_1.BooleanClaim)
    );
    exports.EmailVerificationClaimClass = EmailVerificationClaimClass;
  }
});

// ../../node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/lib/build/recipe/emailverification/recipe.js
var require_recipe = __commonJS({
  "../../node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/lib/build/recipe/emailverification/recipe.js"(exports) {
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
    exports.Recipe = void 0;
    var sessionClaimValidatorStore_1 = require_sessionClaimValidatorStore3();
    var utils_1 = require_utils3();
    var recipeImplementation_1 = require_recipeImplementation();
    var supertokens_js_override_1 = require_build();
    var utils_2 = require_utils();
    var emailVerificationClaim_1 = require_emailVerificationClaim();
    var postSuperTokensInitCallbacks_1 = require_postSuperTokensInitCallbacks();
    var Recipe = (
      /** @class */
      function() {
        function Recipe2(config) {
          this.config = (0, utils_1.normaliseUserInput)(config);
          var builder = new supertokens_js_override_1.default((0, recipeImplementation_1.default)({
            recipeId: this.config.recipeId,
            appInfo: this.config.appInfo,
            clientType: this.config.clientType,
            preAPIHook: this.config.preAPIHook,
            postAPIHook: this.config.postAPIHook
          }));
          this.recipeImplementation = builder.override(this.config.override.functions).build();
          postSuperTokensInitCallbacks_1.PostSuperTokensInitCallbacks.addPostInitCallback(function() {
            sessionClaimValidatorStore_1.SessionClaimValidatorStore.addClaimValidatorFromOtherRecipe(Recipe2.EmailVerificationClaim.validators.isVerified(10));
          });
        }
        Recipe2.init = function(config) {
          return function(appInfo, clientType) {
            Recipe2.instance = new Recipe2(__assign(__assign({}, config), {
              appInfo,
              clientType,
              recipeId: Recipe2.RECIPE_ID
            }));
            return Recipe2.instance;
          };
        };
        Recipe2.getInstanceOrThrow = function() {
          if (Recipe2.instance === void 0) {
            var error = "No instance of EmailVerification found. Ensure that the 'EmailVerification.init' method is called within the 'SuperTokens.init' recipeList.";
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
        Recipe2.RECIPE_ID = "emailverification";
        Recipe2.EmailVerificationClaim = new emailVerificationClaim_1.EmailVerificationClaimClass(function() {
          return Recipe2.getInstanceOrThrow().recipeImplementation;
        });
        return Recipe2;
      }()
    );
    exports.Recipe = Recipe;
    exports.default = Recipe;
  }
});

// ../../node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/lib/build/recipe/emailverification/index.js
var require_emailverification = __commonJS({
  "../../node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/lib/build/recipe/emailverification/index.js"(exports) {
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
    exports.EmailVerificationClaimClass = exports.EmailVerificationClaim = exports.getTenantIdFromURL = exports.getEmailVerificationTokenFromURL = exports.isEmailVerified = exports.sendVerificationEmail = exports.verifyEmail = exports.init = void 0;
    var recipe_1 = require_recipe();
    var utils_1 = require_utils();
    var emailVerificationClaim_1 = require_emailVerificationClaim();
    Object.defineProperty(exports, "EmailVerificationClaimClass", {
      enumerable: true,
      get: function() {
        return emailVerificationClaim_1.EmailVerificationClaimClass;
      }
    });
    var RecipeWrapper = (
      /** @class */
      function() {
        function RecipeWrapper2() {
        }
        RecipeWrapper2.init = function(config) {
          return recipe_1.default.init(config);
        };
        RecipeWrapper2.verifyEmail = function(input) {
          return recipe_1.default.getInstanceOrThrow().recipeImplementation.verifyEmail(__assign(__assign({}, input), {
            userContext: (0, utils_1.getNormalisedUserContext)(input === null || input === void 0 ? void 0 : input.userContext)
          }));
        };
        RecipeWrapper2.sendVerificationEmail = function(input) {
          return recipe_1.default.getInstanceOrThrow().recipeImplementation.sendVerificationEmail(__assign(__assign({}, input), {
            userContext: (0, utils_1.getNormalisedUserContext)(input === null || input === void 0 ? void 0 : input.userContext)
          }));
        };
        RecipeWrapper2.isEmailVerified = function(input) {
          return recipe_1.default.getInstanceOrThrow().recipeImplementation.isEmailVerified(__assign(__assign({}, input), {
            userContext: (0, utils_1.getNormalisedUserContext)(input === null || input === void 0 ? void 0 : input.userContext)
          }));
        };
        RecipeWrapper2.getEmailVerificationTokenFromURL = function(input) {
          return recipe_1.default.getInstanceOrThrow().recipeImplementation.getEmailVerificationTokenFromURL(__assign(__assign({}, input), {
            userContext: (0, utils_1.getNormalisedUserContext)(input === null || input === void 0 ? void 0 : input.userContext)
          }));
        };
        RecipeWrapper2.getTenantIdFromURL = function(input) {
          return recipe_1.default.getInstanceOrThrow().recipeImplementation.getTenantIdFromURL(__assign(__assign({}, input), {
            userContext: (0, utils_1.getNormalisedUserContext)(input === null || input === void 0 ? void 0 : input.userContext)
          }));
        };
        RecipeWrapper2.EmailVerificationClaim = recipe_1.default.EmailVerificationClaim;
        return RecipeWrapper2;
      }()
    );
    exports.default = RecipeWrapper;
    var init = RecipeWrapper.init;
    exports.init = init;
    var verifyEmail = RecipeWrapper.verifyEmail;
    exports.verifyEmail = verifyEmail;
    var sendVerificationEmail = RecipeWrapper.sendVerificationEmail;
    exports.sendVerificationEmail = sendVerificationEmail;
    var isEmailVerified = RecipeWrapper.isEmailVerified;
    exports.isEmailVerified = isEmailVerified;
    var getEmailVerificationTokenFromURL = RecipeWrapper.getEmailVerificationTokenFromURL;
    exports.getEmailVerificationTokenFromURL = getEmailVerificationTokenFromURL;
    var getTenantIdFromURL = RecipeWrapper.getTenantIdFromURL;
    exports.getTenantIdFromURL = getTenantIdFromURL;
    var EmailVerificationClaim = RecipeWrapper.EmailVerificationClaim;
    exports.EmailVerificationClaim = EmailVerificationClaim;
  }
});

// ../../node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/recipe/emailverification/index.js
var require_emailverification2 = __commonJS({
  "../../node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/recipe/emailverification/index.js"(exports) {
    function __export(m) {
      for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    exports.__esModule = true;
    __export(require_emailverification());
  }
});
export default require_emailverification2();
//# sourceMappingURL=supertokens-web-js_recipe_emailverification.js.map
