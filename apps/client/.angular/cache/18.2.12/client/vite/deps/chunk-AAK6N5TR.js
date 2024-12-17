import {
  require_dateProvider
} from "./chunk-AMLKBHRA.js";
import {
  __commonJS
} from "./chunk-3OV72XIM.js";

// ../../node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/lib/build/postSuperTokensInitCallbacks.js
var require_postSuperTokensInitCallbacks = __commonJS({
  "../../node_modules/.pnpm/supertokens-web-js@0.14.0/node_modules/supertokens-web-js/lib/build/postSuperTokensInitCallbacks.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.PostSuperTokensInitCallbacks = void 0;
    var PostSuperTokensInitCallbacks = (
      /** @class */
      function() {
        function PostSuperTokensInitCallbacks2() {
        }
        PostSuperTokensInitCallbacks2.addPostInitCallback = function(cb) {
          PostSuperTokensInitCallbacks2.postInitCallbacks.push(cb);
        };
        PostSuperTokensInitCallbacks2.runPostInitCallbacks = function() {
          for (var _i = 0, _a = PostSuperTokensInitCallbacks2.postInitCallbacks; _i < _a.length; _i++) {
            var cb = _a[_i];
            cb();
          }
        };
        PostSuperTokensInitCallbacks2.postInitCallbacks = [];
        return PostSuperTokensInitCallbacks2;
      }()
    );
    exports.PostSuperTokensInitCallbacks = PostSuperTokensInitCallbacks;
  }
});

// ../../node_modules/.pnpm/supertokens-website@20.1.5/node_modules/supertokens-website/utils/dateProvider/index.js
var require_dateProvider2 = __commonJS({
  "../../node_modules/.pnpm/supertokens-website@20.1.5/node_modules/supertokens-website/utils/dateProvider/index.js"(exports) {
    "use strict";
    function __export(m) {
      for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    exports.__esModule = true;
    __export(require_dateProvider());
  }
});

export {
  require_postSuperTokensInitCallbacks,
  require_dateProvider2 as require_dateProvider
};
//# sourceMappingURL=chunk-AAK6N5TR.js.map
