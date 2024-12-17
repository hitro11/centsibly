import {
  require_authRecipe,
  require_recipe,
  require_utils as require_utils2
} from "./chunk-4DFJ3BKI.js";
import {
  require_error,
  require_querier
} from "./chunk-Z5ISHUDP.js";
import {
  require_build,
  require_utils,
  require_windowHandler
} from "./chunk-AMLKBHRA.js";
import {
  __commonJS
} from "./chunk-3OV72XIM.js";

// ../../node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/lib/build/recipe/thirdparty/utils.js
var require_utils3 = __commonJS({
  "../../node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/lib/build/recipe/thirdparty/utils.js"(exports) {
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

// ../../node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/lib/build/recipe/thirdparty/recipeImplementation.js
var require_recipeImplementation = __commonJS({
  "../../node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/lib/build/recipe/thirdparty/recipeImplementation.js"(exports) {
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
    var utils_1 = require_utils();
    var error_1 = require_error();
    var windowHandler_1 = require_windowHandler();
    function getRecipeImplementation(recipeImplInput) {
      var querier = new querier_1.default(recipeImplInput.recipeId, recipeImplInput.appInfo);
      return {
        getStateAndOtherInfoFromStorage: function() {
          var stateFromStorage = windowHandler_1.WindowHandlerReference.getReferenceOrThrow().windowHandler.sessionStorage.getItemSync("supertokens-oauth-state-2");
          if (stateFromStorage === null) {
            return void 0;
          }
          try {
            return JSON.parse(stateFromStorage);
          } catch (_a) {
            return void 0;
          }
        },
        setStateAndOtherInfoToStorage: function(input) {
          return __awaiter(this, void 0, void 0, function() {
            var value;
            return __generator(this, function(_a) {
              switch (_a.label) {
                case 0:
                  value = JSON.stringify(__assign({}, input.state));
                  return [4, windowHandler_1.WindowHandlerReference.getReferenceOrThrow().windowHandler.sessionStorage.setItem("supertokens-oauth-state-2", value)];
                case 1:
                  _a.sent();
                  return [
                    2
                    /*return*/
                  ];
              }
            });
          });
        },
        getAuthorisationURLWithQueryParamsAndSetState: function(input) {
          return __awaiter(this, void 0, void 0, function() {
            var urlResponse, frontendRedirectURIToSave, stateToSendToAuthProvider, stateExpiry, urlWithState;
            return __generator(this, function(_a) {
              switch (_a.label) {
                case 0:
                  return [4, this.getAuthorisationURLFromBackend({
                    thirdPartyId: input.thirdPartyId,
                    tenantId: input.tenantId,
                    redirectURIOnProviderDashboard: input.redirectURIOnProviderDashboard || input.frontendRedirectURI,
                    userContext: input.userContext,
                    options: input.options
                  })];
                case 1:
                  urlResponse = _a.sent();
                  frontendRedirectURIToSave = input.redirectURIOnProviderDashboard !== void 0 && input.frontendRedirectURI !== input.redirectURIOnProviderDashboard ? input.frontendRedirectURI : void 0;
                  stateToSendToAuthProvider = this.generateStateToSendToOAuthProvider({
                    frontendRedirectURI: frontendRedirectURIToSave,
                    userContext: input.userContext
                  });
                  stateExpiry = Date.now() + 1e3 * 60 * 10;
                  return [4, this.setStateAndOtherInfoToStorage({
                    state: {
                      stateForAuthProvider: stateToSendToAuthProvider,
                      thirdPartyId: input.thirdPartyId,
                      tenantId: input.tenantId,
                      expiresAt: stateExpiry,
                      redirectURIOnProviderDashboard: input.redirectURIOnProviderDashboard || input.frontendRedirectURI,
                      shouldTryLinkingWithSessionUser: input.shouldTryLinkingWithSessionUser,
                      pkceCodeVerifier: urlResponse.pkceCodeVerifier
                    },
                    userContext: input.userContext
                  })];
                case 2:
                  _a.sent();
                  urlWithState = (0, utils_1.appendQueryParamsToURL)(urlResponse.urlWithQueryParams, {
                    state: stateToSendToAuthProvider
                  });
                  return [2, urlWithState];
              }
            });
          });
        },
        getAuthorisationURLFromBackend: function(input) {
          return __awaiter(this, void 0, void 0, function() {
            var queryParams, _a, jsonBody, fetchResponse;
            return __generator(this, function(_b) {
              switch (_b.label) {
                case 0:
                  queryParams = {
                    thirdPartyId: input.thirdPartyId,
                    redirectURIOnProviderDashboard: input.redirectURIOnProviderDashboard
                  };
                  if (recipeImplInput.clientType !== void 0) {
                    queryParams.clientType = recipeImplInput.clientType;
                  }
                  return [4, querier.get(input.tenantId, "/authorisationurl", {}, queryParams, querier_1.default.preparePreAPIHook({
                    recipePreAPIHook: recipeImplInput.preAPIHook,
                    action: "GET_AUTHORISATION_URL",
                    options: input.options,
                    userContext: input.userContext
                  }), querier_1.default.preparePostAPIHook({
                    recipePostAPIHook: recipeImplInput.postAPIHook,
                    action: "GET_AUTHORISATION_URL",
                    userContext: input.userContext
                  }))];
                case 1:
                  _a = _b.sent(), jsonBody = _a.jsonBody, fetchResponse = _a.fetchResponse;
                  return [2, {
                    status: "OK",
                    urlWithQueryParams: jsonBody.urlWithQueryParams,
                    pkceCodeVerifier: jsonBody.pkceCodeVerifier,
                    fetchResponse
                  }];
              }
            });
          });
        },
        signInAndUp: function(input) {
          return __awaiter(this, void 0, void 0, function() {
            var stateFromStorage, stateFromQueryParams, verifiedState, errorInQuery, queryParams, queryParamsObj, _a, jsonBody, fetchResponse;
            return __generator(this, function(_b) {
              switch (_b.label) {
                case 0:
                  stateFromStorage = this.getStateAndOtherInfoFromStorage({
                    userContext: input.userContext
                  });
                  stateFromQueryParams = this.getAuthStateFromURL({
                    userContext: input.userContext
                  });
                  return [4, this.verifyAndGetStateOrThrowError({
                    stateFromAuthProvider: stateFromQueryParams,
                    stateObjectFromStorage: stateFromStorage,
                    userContext: input.userContext
                  })];
                case 1:
                  verifiedState = _b.sent();
                  errorInQuery = this.getAuthErrorFromURL({
                    userContext: input.userContext
                  });
                  if (errorInQuery !== void 0) {
                    throw new Error("Auth provider responded with error: ".concat(errorInQuery));
                  }
                  queryParams = (0, utils_1.getAllQueryParams)();
                  queryParamsObj = Object.fromEntries(queryParams);
                  return [4, querier.post(verifiedState.tenantId, "/signinup", {
                    body: JSON.stringify({
                      thirdPartyId: verifiedState.thirdPartyId,
                      clientType: recipeImplInput.clientType,
                      redirectURIInfo: {
                        redirectURIOnProviderDashboard: verifiedState.redirectURIOnProviderDashboard,
                        redirectURIQueryParams: queryParamsObj,
                        pkceCodeVerifier: verifiedState.pkceCodeVerifier
                      },
                      shouldTryLinkingWithSessionUser: verifiedState.shouldTryLinkingWithSessionUser
                    })
                  }, querier_1.default.preparePreAPIHook({
                    recipePreAPIHook: recipeImplInput.preAPIHook,
                    action: "THIRD_PARTY_SIGN_IN_UP",
                    options: input.options,
                    userContext: input.userContext
                  }), querier_1.default.preparePostAPIHook({
                    recipePostAPIHook: recipeImplInput.postAPIHook,
                    action: "THIRD_PARTY_SIGN_IN_UP",
                    userContext: input.userContext
                  }))];
                case 2:
                  _a = _b.sent(), jsonBody = _a.jsonBody, fetchResponse = _a.fetchResponse;
                  if (jsonBody.status === "FIELD_ERROR") {
                    throw new error_1.default(jsonBody.error);
                  }
                  if (jsonBody.status !== "OK") {
                    return [2, __assign(__assign({}, jsonBody), {
                      fetchResponse
                    })];
                  }
                  return [2, __assign(__assign({
                    status: "OK"
                  }, (0, utils_1.normaliseUserResponse)("thirdparty", jsonBody)), {
                    fetchResponse
                  })];
              }
            });
          });
        },
        generateStateToSendToOAuthProvider: function(input) {
          var state = {
            state: "".concat(1e20).replace(/[018]/g, function(c) {
              return (parseInt(c) ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> parseInt(c) / 4).toString(16);
            })
          };
          if (input !== void 0 && input.frontendRedirectURI !== void 0) {
            state.frontendRedirectURI = input.frontendRedirectURI;
          }
          return btoa(JSON.stringify(state));
        },
        verifyAndGetStateOrThrowError: function(input) {
          return __awaiter(this, void 0, void 0, function() {
            return __generator(this, function(_a) {
              if (input.stateObjectFromStorage === void 0 || input.stateObjectFromStorage.stateForAuthProvider === void 0) {
                throw new Error("No valid auth state present in session storage");
              }
              if (input.stateFromAuthProvider === void 0) {
                throw new Error("No state recieved from auth provider");
              }
              if (input.stateObjectFromStorage.expiresAt < Date.now()) {
                throw new Error("Auth state verification failed. The auth provider took too long to respond");
              }
              if (input.stateFromAuthProvider !== input.stateObjectFromStorage.stateForAuthProvider) {
                throw new Error("Auth state verification failed. The auth provider responded with an invalid state");
              }
              return [2, input.stateObjectFromStorage];
            });
          });
        },
        getAuthErrorFromURL: function() {
          return (0, utils_1.getQueryParams)("error");
        },
        getAuthStateFromURL: function() {
          var stateFromURL = (0, utils_1.getQueryParams)("state");
          if (stateFromURL === void 0) {
            return "";
          }
          return stateFromURL;
        }
      };
    }
    exports.default = getRecipeImplementation;
    exports.getRecipeImplementation = getRecipeImplementation;
  }
});

// ../../node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/lib/build/recipe/thirdparty/recipe.js
var require_recipe2 = __commonJS({
  "../../node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/lib/build/recipe/thirdparty/recipe.js"(exports) {
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
            var error = "No instance of ThirdParty found. Ensure that the 'ThirdParty.init' method is called within the 'SuperTokens.init' recipeList.";
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
        Recipe2.RECIPE_ID = "thirdparty";
        return Recipe2;
      }(authRecipe_1.default)
    );
    exports.Recipe = Recipe;
    exports.default = Recipe;
  }
});

// ../../node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/lib/build/recipe/thirdparty/index.js
var require_thirdparty = __commonJS({
  "../../node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/lib/build/recipe/thirdparty/index.js"(exports) {
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
    exports.signOut = exports.signInAndUp = exports.getAuthorisationURLWithQueryParamsAndSetState = exports.getStateAndOtherInfoFromStorage = exports.init = void 0;
    var utils_1 = require_utils();
    var recipe_1 = require_recipe();
    var recipe_2 = require_recipe2();
    var RecipeWrapper = (
      /** @class */
      function() {
        function RecipeWrapper2() {
        }
        RecipeWrapper2.init = function(config) {
          return recipe_2.default.init(config);
        };
        RecipeWrapper2.signOut = function(input) {
          return recipe_2.default.getInstanceOrThrow().signOut({
            userContext: (0, utils_1.getNormalisedUserContext)(input === null || input === void 0 ? void 0 : input.userContext)
          });
        };
        RecipeWrapper2.getStateAndOtherInfoFromStorage = function(input) {
          return recipe_2.default.getInstanceOrThrow().recipeImplementation.getStateAndOtherInfoFromStorage(__assign(__assign({}, input), {
            userContext: (0, utils_1.getNormalisedUserContext)(input === null || input === void 0 ? void 0 : input.userContext)
          }));
        };
        RecipeWrapper2.getAuthorisationURLWithQueryParamsAndSetState = function(input) {
          return __awaiter(this, void 0, void 0, function() {
            var userContext, recipe, tenantId;
            return __generator(this, function(_a) {
              switch (_a.label) {
                case 0:
                  userContext = (0, utils_1.getNormalisedUserContext)(input.userContext);
                  recipe = recipe_2.default.getInstanceOrThrow();
                  return [4, recipe_1.default.getInstanceOrThrow().recipeImplementation.getTenantId({
                    userContext
                  })];
                case 1:
                  tenantId = _a.sent();
                  return [2, recipe.recipeImplementation.getAuthorisationURLWithQueryParamsAndSetState(__assign(__assign({
                    tenantId
                  }, input), {
                    shouldTryLinkingWithSessionUser: input === null || input === void 0 ? void 0 : input.shouldTryLinkingWithSessionUser,
                    userContext
                  }))];
              }
            });
          });
        };
        RecipeWrapper2.signInAndUp = function(input) {
          return recipe_2.default.getInstanceOrThrow().recipeImplementation.signInAndUp(__assign(__assign({}, input), {
            userContext: (0, utils_1.getNormalisedUserContext)(input === null || input === void 0 ? void 0 : input.userContext)
          }));
        };
        return RecipeWrapper2;
      }()
    );
    exports.default = RecipeWrapper;
    var init = RecipeWrapper.init;
    exports.init = init;
    var getAuthorisationURLWithQueryParamsAndSetState = RecipeWrapper.getAuthorisationURLWithQueryParamsAndSetState;
    exports.getAuthorisationURLWithQueryParamsAndSetState = getAuthorisationURLWithQueryParamsAndSetState;
    var getStateAndOtherInfoFromStorage = RecipeWrapper.getStateAndOtherInfoFromStorage;
    exports.getStateAndOtherInfoFromStorage = getStateAndOtherInfoFromStorage;
    var signInAndUp = RecipeWrapper.signInAndUp;
    exports.signInAndUp = signInAndUp;
    var signOut = RecipeWrapper.signOut;
    exports.signOut = signOut;
  }
});

// ../../node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/recipe/thirdparty/index.js
var require_thirdparty2 = __commonJS({
  "../../node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/recipe/thirdparty/index.js"(exports) {
    function __export(m) {
      for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    exports.__esModule = true;
    __export(require_thirdparty());
  }
});
export default require_thirdparty2();
//# sourceMappingURL=supertokens-web-js_recipe_thirdparty.js.map
