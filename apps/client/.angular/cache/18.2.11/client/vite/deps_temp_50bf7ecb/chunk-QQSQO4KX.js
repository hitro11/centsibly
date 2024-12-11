import {
  require_recipe,
  require_supertokens_website,
  require_utils
} from "./chunk-3S455SMP.js";
import {
  __commonJS
} from "./chunk-3OV72XIM.js";

// node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/lib/build/recipe/session/index.js
var require_session = __commonJS({
  "node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/lib/build/recipe/session/index.js"(exports) {
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
    exports.getInvalidClaimsFromResponse = exports.getClaimValue = exports.validateClaims = exports.signOut = exports.addAxiosInterceptors = exports.doesSessionExist = exports.attemptRefreshingSession = exports.getAccessToken = exports.getAccessTokenPayloadSecurely = exports.getUserId = exports.init = exports.BooleanClaim = exports.PrimitiveArrayClaim = exports.PrimitiveClaim = void 0;
    var utils_1 = require_utils();
    var recipe_1 = require_recipe();
    var RecipeWrapper = (
      /** @class */
      function() {
        function RecipeWrapper2() {
        }
        RecipeWrapper2.init = function(config) {
          return recipe_1.default.init(config);
        };
        RecipeWrapper2.getUserId = function(input) {
          return recipe_1.default.getInstanceOrThrow().getUserId({
            userContext: (0, utils_1.getNormalisedUserContext)(input === null || input === void 0 ? void 0 : input.userContext)
          });
        };
        RecipeWrapper2.getAccessToken = function(input) {
          return recipe_1.default.getInstanceOrThrow().getAccessToken({
            userContext: (0, utils_1.getNormalisedUserContext)(input === null || input === void 0 ? void 0 : input.userContext)
          });
        };
        RecipeWrapper2.getAccessTokenPayloadSecurely = function(input) {
          return __awaiter(this, void 0, void 0, function() {
            return __generator(this, function(_a) {
              return [2, recipe_1.default.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                userContext: (0, utils_1.getNormalisedUserContext)(input === null || input === void 0 ? void 0 : input.userContext)
              })];
            });
          });
        };
        RecipeWrapper2.attemptRefreshingSession = function() {
          return __awaiter(this, void 0, void 0, function() {
            return __generator(this, function(_a) {
              return [2, recipe_1.default.getInstanceOrThrow().attemptRefreshingSession()];
            });
          });
        };
        RecipeWrapper2.doesSessionExist = function(input) {
          return recipe_1.default.getInstanceOrThrow().doesSessionExist({
            userContext: (0, utils_1.getNormalisedUserContext)(input === null || input === void 0 ? void 0 : input.userContext)
          });
        };
        RecipeWrapper2.addAxiosInterceptors = function(axiosInstance, userContext) {
          return recipe_1.default.addAxiosInterceptors(axiosInstance, (0, utils_1.getNormalisedUserContext)(userContext));
        };
        RecipeWrapper2.signOut = function(input) {
          return recipe_1.default.getInstanceOrThrow().signOut({
            userContext: (0, utils_1.getNormalisedUserContext)(input === null || input === void 0 ? void 0 : input.userContext)
          });
        };
        RecipeWrapper2.getClaimValue = function(input) {
          return recipe_1.default.getInstanceOrThrow().getClaimValue({
            claim: input.claim,
            userContext: (0, utils_1.getNormalisedUserContext)(input === null || input === void 0 ? void 0 : input.userContext)
          });
        };
        RecipeWrapper2.validateClaims = function(input) {
          return recipe_1.default.getInstanceOrThrow().validateClaims({
            overrideGlobalClaimValidators: input === null || input === void 0 ? void 0 : input.overrideGlobalClaimValidators,
            userContext: (0, utils_1.getNormalisedUserContext)(input === null || input === void 0 ? void 0 : input.userContext)
          });
        };
        RecipeWrapper2.getInvalidClaimsFromResponse = function(input) {
          return recipe_1.default.getInstanceOrThrow().getInvalidClaimsFromResponse({
            response: input.response,
            userContext: (0, utils_1.getNormalisedUserContext)(input === null || input === void 0 ? void 0 : input.userContext)
          });
        };
        return RecipeWrapper2;
      }()
    );
    exports.default = RecipeWrapper;
    var init = RecipeWrapper.init;
    exports.init = init;
    var getUserId = RecipeWrapper.getUserId;
    exports.getUserId = getUserId;
    var getAccessTokenPayloadSecurely = RecipeWrapper.getAccessTokenPayloadSecurely;
    exports.getAccessTokenPayloadSecurely = getAccessTokenPayloadSecurely;
    var getAccessToken = RecipeWrapper.getAccessToken;
    exports.getAccessToken = getAccessToken;
    var attemptRefreshingSession = RecipeWrapper.attemptRefreshingSession;
    exports.attemptRefreshingSession = attemptRefreshingSession;
    var doesSessionExist = RecipeWrapper.doesSessionExist;
    exports.doesSessionExist = doesSessionExist;
    var addAxiosInterceptors = RecipeWrapper.addAxiosInterceptors;
    exports.addAxiosInterceptors = addAxiosInterceptors;
    var signOut = RecipeWrapper.signOut;
    exports.signOut = signOut;
    var validateClaims = RecipeWrapper.validateClaims;
    exports.validateClaims = validateClaims;
    var getClaimValue = RecipeWrapper.getClaimValue;
    exports.getClaimValue = getClaimValue;
    var getInvalidClaimsFromResponse = RecipeWrapper.getInvalidClaimsFromResponse;
    exports.getInvalidClaimsFromResponse = getInvalidClaimsFromResponse;
    var supertokens_website_1 = require_supertokens_website();
    Object.defineProperty(exports, "PrimitiveClaim", {
      enumerable: true,
      get: function() {
        return supertokens_website_1.PrimitiveClaim;
      }
    });
    Object.defineProperty(exports, "PrimitiveArrayClaim", {
      enumerable: true,
      get: function() {
        return supertokens_website_1.PrimitiveArrayClaim;
      }
    });
    Object.defineProperty(exports, "BooleanClaim", {
      enumerable: true,
      get: function() {
        return supertokens_website_1.BooleanClaim;
      }
    });
  }
});

export {
  require_session
};
//# sourceMappingURL=chunk-QQSQO4KX.js.map
