import {
  Injectable,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable
} from "./chunk-F45ESUFI.js";

// ../../node_modules/.pnpm/@spartan-ng+ui-forms-brain@0.0.1-alpha.356_@angular+core@18.2.13_rxjs@7.8.1_zone.js@0.14.10___4yivduhurc5lkfm22rietjk6ai/node_modules/@spartan-ng/ui-forms-brain/fesm2022/spartan-ng-ui-forms-brain.mjs
var ShowOnDirtyErrorStateMatcher = class _ShowOnDirtyErrorStateMatcher {
  isInvalid(control, form) {
    return !!(control && control.invalid && (control.dirty || form && form.submitted));
  }
  static {
    this.ɵfac = function ShowOnDirtyErrorStateMatcher_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ShowOnDirtyErrorStateMatcher)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _ShowOnDirtyErrorStateMatcher,
      factory: _ShowOnDirtyErrorStateMatcher.ɵfac
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ShowOnDirtyErrorStateMatcher, [{
    type: Injectable
  }], null, null);
})();
var ErrorStateMatcher = class _ErrorStateMatcher {
  isInvalid(control, form) {
    return !!(control && control.invalid && (control.touched || form && form.submitted));
  }
  static {
    this.ɵfac = function ErrorStateMatcher_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ErrorStateMatcher)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _ErrorStateMatcher,
      factory: _ErrorStateMatcher.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ErrorStateMatcher, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var ErrorStateTracker = class {
  constructor(_defaultMatcher, ngControl, _parentFormGroup, _parentForm) {
    this._defaultMatcher = _defaultMatcher;
    this.ngControl = ngControl;
    this._parentFormGroup = _parentFormGroup;
    this._parentForm = _parentForm;
    this.errorState = signal(false);
    this.matcher = null;
  }
  /** Updates the error state based on the provided error state matcher. */
  updateErrorState() {
    const oldState = this.errorState();
    const parent = this._parentFormGroup || this._parentForm;
    const matcher = this.matcher || this._defaultMatcher;
    const control = this.ngControl ? this.ngControl.control : null;
    const newState = matcher?.isInvalid(control, parent) ?? false;
    if (newState !== oldState) {
      this.errorState.set(newState);
    }
  }
};

export {
  ShowOnDirtyErrorStateMatcher,
  ErrorStateMatcher,
  ErrorStateTracker
};
//# sourceMappingURL=chunk-4N75XGXU.js.map
