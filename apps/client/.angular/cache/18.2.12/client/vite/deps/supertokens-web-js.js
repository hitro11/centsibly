import {
  require_dateProvider,
  require_postSuperTokensInitCallbacks
} from "./chunk-S4MKJWPZ.js";
import {
  require_recipe
} from "./chunk-4IMWS6QO.js";
import "./chunk-2U5ZTV54.js";
import {
  require_cookieHandler,
  require_utils,
  require_windowHandler
} from "./chunk-VCHKITVJ.js";
import {
  __commonJS
} from "./chunk-3OV72XIM.js";

// ../../node_modules/.pnpm/supertokens-website@20.1.5/node_modules/supertokens-website/utils/cookieHandler/index.js
var require_cookieHandler2 = __commonJS({
  "../../node_modules/.pnpm/supertokens-website@20.1.5/node_modules/supertokens-website/utils/cookieHandler/index.js"(exports) {
    "use strict";
    function __export(m) {
      for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    exports.__esModule = true;
    __export(require_cookieHandler());
  }
});

// ../../node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/lib/build/cookieHandler/index.js
var require_cookieHandler3 = __commonJS({
  "../../node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/lib/build/cookieHandler/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.CookieHandlerReference = void 0;
    var cookieHandler_1 = require_cookieHandler2();
    Object.defineProperty(exports, "CookieHandlerReference", {
      enumerable: true,
      get: function() {
        return cookieHandler_1.CookieHandlerReference;
      }
    });
  }
});

// ../../node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/lib/build/dateProvider/index.js
var require_dateProvider2 = __commonJS({
  "../../node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/lib/build/dateProvider/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.DateProviderReference = void 0;
    var dateProvider_1 = require_dateProvider();
    Object.defineProperty(exports, "DateProviderReference", {
      enumerable: true,
      get: function() {
        return dateProvider_1.DateProviderReference;
      }
    });
  }
});

// ../../node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/lib/build/supertokens.js
var require_supertokens = __commonJS({
  "../../node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/lib/build/supertokens.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var utils_1 = require_utils();
    var cookieHandler_1 = require_cookieHandler3();
    var windowHandler_1 = require_windowHandler();
    var postSuperTokensInitCallbacks_1 = require_postSuperTokensInitCallbacks();
    var recipe_1 = require_recipe();
    var dateProvider_1 = require_dateProvider2();
    var SuperTokens = (
      /** @class */
      function() {
        function SuperTokens2(config) {
          var _this = this;
          this.recipeList = [];
          this.appInfo = (0, utils_1.normaliseInputAppInfoOrThrowError)(config.appInfo);
          if (config.recipeList === void 0 || config.recipeList.length === 0) {
            throw new Error("Please provide at least one recipe to the supertokens.init function call. See https://supertokens.io/docs/emailpassword/quick-setup/frontend");
          }
          var enableDebugLogs = false;
          if (config.enableDebugLogs !== void 0) {
            enableDebugLogs = config.enableDebugLogs;
          }
          var multitenancyFound = false;
          this.recipeList = config.recipeList.map(function(recipe) {
            var recipeInstance = recipe(_this.appInfo, config.clientType, enableDebugLogs);
            if (recipeInstance.config.recipeId === recipe_1.Recipe.RECIPE_ID) {
              multitenancyFound = true;
            }
            return recipeInstance;
          });
          if (!multitenancyFound) {
            this.recipeList.push(recipe_1.Recipe.init()(this.appInfo, config.clientType, enableDebugLogs));
          }
        }
        SuperTokens2.init = function(config) {
          cookieHandler_1.CookieHandlerReference.init(config.cookieHandler);
          windowHandler_1.WindowHandlerReference.init(config.windowHandler);
          dateProvider_1.DateProviderReference.init(config.dateProvider);
          if (SuperTokens2.instance !== void 0) {
            console.warn("SuperTokens was already initialized");
            return;
          }
          SuperTokens2.instance = new SuperTokens2(config);
          postSuperTokensInitCallbacks_1.PostSuperTokensInitCallbacks.runPostInitCallbacks();
        };
        SuperTokens2.getInstanceOrThrow = function() {
          if (SuperTokens2.instance === void 0) {
            var error = "SuperTokens must be initialized before calling this method.";
            error = (0, utils_1.checkForSSRErrorAndAppendIfNeeded)(error);
            throw new Error(error);
          }
          return SuperTokens2.instance;
        };
        SuperTokens2.reset = function() {
          if (!(0, utils_1.isTest)()) {
            console.warn("Calling reset() is only supported during testing");
            return;
          }
          recipe_1.Recipe.reset();
          SuperTokens2.instance = void 0;
          return;
        };
        return SuperTokens2;
      }()
    );
    exports.default = SuperTokens;
  }
});

// ../../node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/lib/build/index.js
var require_build = __commonJS({
  "../../node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/lib/build/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.init = void 0;
    var supertokens_1 = require_supertokens();
    var SuperTokensAPIWrapper = (
      /** @class */
      function() {
        function SuperTokensAPIWrapper2() {
        }
        SuperTokensAPIWrapper2.init = function(config) {
          supertokens_1.default.init(config);
        };
        return SuperTokensAPIWrapper2;
      }()
    );
    exports.default = SuperTokensAPIWrapper;
    exports.init = SuperTokensAPIWrapper.init;
  }
});

// ../../node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/index.js
var require_supertokens_web_js = __commonJS({
  "../../node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/index.js"(exports) {
    function __export(m) {
      for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    exports.__esModule = true;
    __export(require_build());
  }
});
export default require_supertokens_web_js();
//# sourceMappingURL=supertokens-web-js.js.map
