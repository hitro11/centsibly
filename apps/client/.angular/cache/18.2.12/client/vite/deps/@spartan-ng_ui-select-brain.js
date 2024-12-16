import {
  ErrorStateMatcher,
  ErrorStateTracker
} from "./chunk-6Y5L4HJZ.js";
import {
  BrnFormFieldControl
} from "./chunk-W3UF43IE.js";
import {
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
  NgControl,
  NgForm
} from "./chunk-GAXSG525.js";
import {
  A,
  ActiveDescendantKeyManager,
  CdkConnectedOverlay,
  CdkOverlayOrigin,
  DOWN_ARROW,
  Directionality,
  END,
  ENTER,
  HOME,
  LEFT_ARROW,
  OverlayModule,
  Platform,
  RIGHT_ARROW,
  SPACE,
  SelectionModel,
  UP_ARROW,
  coerceArray,
  hasModifierKey,
  takeUntilDestroyed,
  toObservable,
  toSignal
} from "./chunk-M5EOFY2U.js";
import {
  NgTemplateOutlet,
  isPlatformBrowser
} from "./chunk-7LQFOFQE.js";
import {
  provideExposedSideProviderExisting,
  provideExposesStateProviderExisting
} from "./chunk-YPMR6W2R.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  DestroyRef,
  Directive,
  ElementRef,
  EventEmitter,
  Injectable,
  Input,
  NgModule,
  NgZone,
  Output,
  PLATFORM_ID,
  Subject,
  ViewChild,
  booleanAttribute,
  combineLatest,
  computed,
  contentChildren,
  defer,
  delay,
  effect,
  filter,
  forwardRef,
  fromEvent,
  inject,
  input,
  interval,
  map,
  merge,
  of,
  setClassMetadata,
  signal,
  skip,
  startWith,
  switchMap,
  takeUntil,
  ɵɵHostDirectivesFeature,
  ɵɵInputTransformsFeature,
  ɵɵProvidersFeature,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵcontentQuery,
  ɵɵcontentQuerySignal,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵhostProperty,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵqueryAdvance,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-IFZJIHJU.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-3OV72XIM.js";

// ../../node_modules/.pnpm/@angular+cdk@18.2.14_@angular+common@18.2.13_@angular+core@18.2.13_rxjs@7.8.1_zone.js@0.14.10_t3k6xxu4dovxyc5l37rae6qkbi/node_modules/@angular/cdk/fesm2022/listbox.mjs
var nextId = 0;
var ListboxSelectionModel = class extends SelectionModel {
  constructor(multiple = false, initiallySelectedValues, emitChanges = true, compareWith) {
    super(true, initiallySelectedValues, emitChanges, compareWith);
    this.multiple = multiple;
  }
  isMultipleSelection() {
    return this.multiple;
  }
  select(...values) {
    if (this.multiple) {
      return super.select(...values);
    } else {
      return super.setSelection(...values);
    }
  }
};
var CdkOption = class _CdkOption {
  constructor() {
    this._generatedId = `cdk-option-${nextId++}`;
    this._disabled = signal(false);
    this._enabledTabIndex = signal(void 0);
    this.element = inject(ElementRef).nativeElement;
    this.listbox = inject(CdkListbox);
    this.destroyed = new Subject();
    this._clicked = new Subject();
  }
  /** The id of the option's host element. */
  get id() {
    return this._id || this._generatedId;
  }
  set id(value) {
    this._id = value;
  }
  /** Whether this option is disabled. */
  get disabled() {
    return this.listbox.disabled || this._disabled();
  }
  set disabled(value) {
    this._disabled.set(value);
  }
  /** The tabindex of the option when it is enabled. */
  get enabledTabIndex() {
    return this._enabledTabIndex() === void 0 ? this.listbox.enabledTabIndex : this._enabledTabIndex();
  }
  set enabledTabIndex(value) {
    this._enabledTabIndex.set(value);
  }
  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
  /** Whether this option is selected. */
  isSelected() {
    return this.listbox.isSelected(this);
  }
  /** Whether this option is active. */
  isActive() {
    return this.listbox.isActive(this);
  }
  /** Toggle the selected state of this option. */
  toggle() {
    this.listbox.toggle(this);
  }
  /** Select this option if it is not selected. */
  select() {
    this.listbox.select(this);
  }
  /** Deselect this option if it is selected. */
  deselect() {
    this.listbox.deselect(this);
  }
  /** Focus this option. */
  focus() {
    this.element.focus();
  }
  /** Get the label for this element which is required by the FocusableOption interface. */
  getLabel() {
    return (this.typeaheadLabel ?? this.element.textContent?.trim()) || "";
  }
  /**
   * No-op implemented as a part of `Highlightable`.
   * @docs-private
   */
  setActiveStyles() {
    if (this.listbox.useActiveDescendant) {
      this.element.scrollIntoView({
        block: "nearest",
        inline: "nearest"
      });
    }
  }
  /**
   * No-op implemented as a part of `Highlightable`.
   * @docs-private
   */
  setInactiveStyles() {
  }
  /** Handle focus events on the option. */
  _handleFocus() {
    if (this.listbox.useActiveDescendant) {
      this.listbox._setActiveOption(this);
      this.listbox.focus();
    }
  }
  /** Get the tabindex for this option. */
  _getTabIndex() {
    if (this.listbox.useActiveDescendant || this.disabled) {
      return -1;
    }
    return this.isActive() ? this.enabledTabIndex : -1;
  }
  static {
    this.ɵfac = function CdkOption_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CdkOption)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _CdkOption,
      selectors: [["", "cdkOption", ""]],
      hostAttrs: ["role", "option", 1, "cdk-option"],
      hostVars: 6,
      hostBindings: function CdkOption_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("click", function CdkOption_click_HostBindingHandler($event) {
            return ctx._clicked.next($event);
          })("focus", function CdkOption_focus_HostBindingHandler() {
            return ctx._handleFocus();
          });
        }
        if (rf & 2) {
          ɵɵhostProperty("id", ctx.id);
          ɵɵattribute("aria-selected", ctx.isSelected())("tabindex", ctx._getTabIndex())("aria-disabled", ctx.disabled);
          ɵɵclassProp("cdk-option-active", ctx.isActive());
        }
      },
      inputs: {
        id: "id",
        value: [0, "cdkOption", "value"],
        typeaheadLabel: [0, "cdkOptionTypeaheadLabel", "typeaheadLabel"],
        disabled: [2, "cdkOptionDisabled", "disabled", booleanAttribute],
        enabledTabIndex: [0, "tabindex", "enabledTabIndex"]
      },
      exportAs: ["cdkOption"],
      standalone: true,
      features: [ɵɵInputTransformsFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkOption, [{
    type: Directive,
    args: [{
      selector: "[cdkOption]",
      standalone: true,
      exportAs: "cdkOption",
      host: {
        "role": "option",
        "class": "cdk-option",
        "[id]": "id",
        "[attr.aria-selected]": "isSelected()",
        "[attr.tabindex]": "_getTabIndex()",
        "[attr.aria-disabled]": "disabled",
        "[class.cdk-option-active]": "isActive()",
        "(click)": "_clicked.next($event)",
        "(focus)": "_handleFocus()"
      }
    }]
  }], null, {
    id: [{
      type: Input
    }],
    value: [{
      type: Input,
      args: ["cdkOption"]
    }],
    typeaheadLabel: [{
      type: Input,
      args: ["cdkOptionTypeaheadLabel"]
    }],
    disabled: [{
      type: Input,
      args: [{
        alias: "cdkOptionDisabled",
        transform: booleanAttribute
      }]
    }],
    enabledTabIndex: [{
      type: Input,
      args: ["tabindex"]
    }]
  });
})();
var CdkListbox = class _CdkListbox {
  /** The id of the option's host element. */
  get id() {
    return this._id || this._generatedId;
  }
  set id(value) {
    this._id = value;
  }
  /** The tabindex to use when the listbox is enabled. */
  get enabledTabIndex() {
    return this._enabledTabIndex() === void 0 ? 0 : this._enabledTabIndex();
  }
  set enabledTabIndex(value) {
    this._enabledTabIndex.set(value);
  }
  /** The value selected in the listbox, represented as an array of option values. */
  get value() {
    return this._invalid ? [] : this.selectionModel.selected;
  }
  set value(value) {
    this._setSelection(value);
  }
  /**
   * Whether the listbox allows multiple options to be selected. If the value switches from `true`
   * to `false`, and more than one option is selected, all options are deselected.
   */
  get multiple() {
    return this.selectionModel.multiple;
  }
  set multiple(value) {
    this.selectionModel.multiple = value;
    if (this.options) {
      this._updateInternalValue();
    }
  }
  /** Whether the listbox is disabled. */
  get disabled() {
    return this._disabled();
  }
  set disabled(value) {
    this._disabled.set(value);
  }
  /** Whether the listbox will use active descendant or will move focus onto the options. */
  get useActiveDescendant() {
    return this._useActiveDescendant();
  }
  set useActiveDescendant(value) {
    this._useActiveDescendant.set(value);
  }
  /** The orientation of the listbox. Only affects keyboard interaction, not visual layout. */
  get orientation() {
    return this._orientation;
  }
  set orientation(value) {
    this._orientation = value === "horizontal" ? "horizontal" : "vertical";
    if (value === "horizontal") {
      this.listKeyManager?.withHorizontalOrientation(this._dir?.value || "ltr");
    } else {
      this.listKeyManager?.withVerticalOrientation();
    }
  }
  /** The function used to compare option values. */
  get compareWith() {
    return this.selectionModel.compareWith;
  }
  set compareWith(fn) {
    this.selectionModel.compareWith = fn;
  }
  /**
   * Whether the keyboard navigation should wrap when the user presses arrow down on the last item
   * or arrow up on the first item.
   */
  get navigationWrapDisabled() {
    return this._navigationWrapDisabled;
  }
  set navigationWrapDisabled(wrap) {
    this._navigationWrapDisabled = wrap;
    this.listKeyManager?.withWrap(!this._navigationWrapDisabled);
  }
  /** Whether keyboard navigation should skip over disabled items. */
  get navigateDisabledOptions() {
    return this._navigateDisabledOptions;
  }
  set navigateDisabledOptions(skip2) {
    this._navigateDisabledOptions = skip2;
    this.listKeyManager?.skipPredicate(this._navigateDisabledOptions ? this._skipNonePredicate : this._skipDisabledPredicate);
  }
  constructor() {
    this._generatedId = `cdk-listbox-${nextId++}`;
    this._enabledTabIndex = signal(void 0);
    this._disabled = signal(false);
    this._useActiveDescendant = signal(false);
    this._orientation = "vertical";
    this._navigationWrapDisabled = false;
    this._navigateDisabledOptions = false;
    this.valueChange = new Subject();
    this.selectionModel = new ListboxSelectionModel();
    this.destroyed = new Subject();
    this.element = inject(ElementRef).nativeElement;
    this.ngZone = inject(NgZone);
    this.changeDetectorRef = inject(ChangeDetectorRef);
    this._invalid = false;
    this._lastTriggered = null;
    this._onTouched = () => {
    };
    this._onChange = () => {
    };
    this._optionClicked = defer(() => this.options.changes.pipe(startWith(this.options), switchMap((options) => merge(...options.map((option) => option._clicked.pipe(map((event) => ({
      option,
      event
    }))))))));
    this._dir = inject(Directionality, {
      optional: true
    });
    this._isBrowser = inject(Platform).isBrowser;
    this._skipDisabledPredicate = (option) => option.disabled;
    this._skipNonePredicate = () => false;
    this._hasFocus = false;
    this._previousActiveOption = null;
    if (this._isBrowser) {
      this._setPreviousActiveOptionAsActiveOptionOnWindowBlur();
    }
  }
  ngAfterContentInit() {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      this._verifyNoOptionValueCollisions();
      this._verifyOptionValues();
    }
    this._initKeyManager();
    merge(this.selectionModel.changed, this.options.changes).pipe(startWith(null), takeUntil(this.destroyed)).subscribe(() => this._updateInternalValue());
    this._optionClicked.pipe(filter(({
      option
    }) => !option.disabled), takeUntil(this.destroyed)).subscribe(({
      option,
      event
    }) => this._handleOptionClicked(option, event));
  }
  ngOnDestroy() {
    this.listKeyManager?.destroy();
    this.destroyed.next();
    this.destroyed.complete();
  }
  /**
   * Toggle the selected state of the given option.
   * @param option The option to toggle
   */
  toggle(option) {
    this.toggleValue(option.value);
  }
  /**
   * Toggle the selected state of the given value.
   * @param value The value to toggle
   */
  toggleValue(value) {
    if (this._invalid) {
      this.selectionModel.clear(false);
    }
    this.selectionModel.toggle(value);
  }
  /**
   * Select the given option.
   * @param option The option to select
   */
  select(option) {
    this.selectValue(option.value);
  }
  /**
   * Select the given value.
   * @param value The value to select
   */
  selectValue(value) {
    if (this._invalid) {
      this.selectionModel.clear(false);
    }
    this.selectionModel.select(value);
  }
  /**
   * Deselect the given option.
   * @param option The option to deselect
   */
  deselect(option) {
    this.deselectValue(option.value);
  }
  /**
   * Deselect the given value.
   * @param value The value to deselect
   */
  deselectValue(value) {
    if (this._invalid) {
      this.selectionModel.clear(false);
    }
    this.selectionModel.deselect(value);
  }
  /**
   * Set the selected state of all options.
   * @param isSelected The new selected state to set
   */
  setAllSelected(isSelected) {
    if (!isSelected) {
      this.selectionModel.clear();
    } else {
      if (this._invalid) {
        this.selectionModel.clear(false);
      }
      this.selectionModel.select(...this.options.map((option) => option.value));
    }
  }
  /**
   * Get whether the given option is selected.
   * @param option The option to get the selected state of
   */
  isSelected(option) {
    return this.isValueSelected(option.value);
  }
  /**
   * Get whether the given option is active.
   * @param option The option to get the active state of
   */
  isActive(option) {
    return !!(this.listKeyManager?.activeItem === option);
  }
  /**
   * Get whether the given value is selected.
   * @param value The value to get the selected state of
   */
  isValueSelected(value) {
    if (this._invalid) {
      return false;
    }
    return this.selectionModel.isSelected(value);
  }
  /**
   * Registers a callback to be invoked when the listbox's value changes from user input.
   * @param fn The callback to register
   * @docs-private
   */
  registerOnChange(fn) {
    this._onChange = fn;
  }
  /**
   * Registers a callback to be invoked when the listbox is blurred by the user.
   * @param fn The callback to register
   * @docs-private
   */
  registerOnTouched(fn) {
    this._onTouched = fn;
  }
  /**
   * Sets the listbox's value.
   * @param value The new value of the listbox
   * @docs-private
   */
  writeValue(value) {
    this._setSelection(value);
    this._verifyOptionValues();
  }
  /**
   * Sets the disabled state of the listbox.
   * @param isDisabled The new disabled state
   * @docs-private
   */
  setDisabledState(isDisabled) {
    this.disabled = isDisabled;
    this.changeDetectorRef.markForCheck();
  }
  /** Focus the listbox's host element. */
  focus() {
    this.element.focus();
  }
  /**
   * Triggers the given option in response to user interaction.
   * - In single selection mode: selects the option and deselects any other selected option.
   * - In multi selection mode: toggles the selected state of the option.
   * @param option The option to trigger
   */
  triggerOption(option) {
    if (option && !option.disabled) {
      this._lastTriggered = option;
      const changed = this.multiple ? this.selectionModel.toggle(option.value) : this.selectionModel.select(option.value);
      if (changed) {
        this._onChange(this.value);
        this.valueChange.next({
          value: this.value,
          listbox: this,
          option
        });
      }
    }
  }
  /**
   * Trigger the given range of options in response to user interaction.
   * Should only be called in multi-selection mode.
   * @param trigger The option that was triggered
   * @param from The start index of the options to toggle
   * @param to The end index of the options to toggle
   * @param on Whether to toggle the option range on
   */
  triggerRange(trigger, from, to, on) {
    if (this.disabled || trigger && trigger.disabled) {
      return;
    }
    this._lastTriggered = trigger;
    const isEqual = this.compareWith ?? Object.is;
    const updateValues = [...this.options].slice(Math.max(0, Math.min(from, to)), Math.min(this.options.length, Math.max(from, to) + 1)).filter((option) => !option.disabled).map((option) => option.value);
    const selected = [...this.value];
    for (const updateValue of updateValues) {
      const selectedIndex = selected.findIndex((selectedValue) => isEqual(selectedValue, updateValue));
      if (on && selectedIndex === -1) {
        selected.push(updateValue);
      } else if (!on && selectedIndex !== -1) {
        selected.splice(selectedIndex, 1);
      }
    }
    let changed = this.selectionModel.setSelection(...selected);
    if (changed) {
      this._onChange(this.value);
      this.valueChange.next({
        value: this.value,
        listbox: this,
        option: trigger
      });
    }
  }
  /**
   * Sets the given option as active.
   * @param option The option to make active
   */
  _setActiveOption(option) {
    this.listKeyManager.setActiveItem(option);
  }
  /** Called when the listbox receives focus. */
  _handleFocus() {
    if (!this.useActiveDescendant) {
      if (this.selectionModel.selected.length > 0) {
        this._setNextFocusToSelectedOption();
      } else {
        this.listKeyManager.setNextItemActive();
      }
      this._focusActiveOption();
    }
  }
  /** Called when the user presses keydown on the listbox. */
  _handleKeydown(event) {
    if (this.disabled) {
      return;
    }
    const {
      keyCode
    } = event;
    const previousActiveIndex = this.listKeyManager.activeItemIndex;
    const ctrlKeys = ["ctrlKey", "metaKey"];
    if (this.multiple && keyCode === A && hasModifierKey(event, ...ctrlKeys)) {
      this.triggerRange(null, 0, this.options.length - 1, this.options.length !== this.value.length);
      event.preventDefault();
      return;
    }
    if (this.multiple && (keyCode === SPACE || keyCode === ENTER) && hasModifierKey(event, "shiftKey")) {
      if (this.listKeyManager.activeItem && this.listKeyManager.activeItemIndex != null) {
        this.triggerRange(this.listKeyManager.activeItem, this._getLastTriggeredIndex() ?? this.listKeyManager.activeItemIndex, this.listKeyManager.activeItemIndex, !this.listKeyManager.activeItem.isSelected());
      }
      event.preventDefault();
      return;
    }
    if (this.multiple && keyCode === HOME && hasModifierKey(event, ...ctrlKeys) && hasModifierKey(event, "shiftKey")) {
      const trigger = this.listKeyManager.activeItem;
      if (trigger) {
        const from = this.listKeyManager.activeItemIndex;
        this.listKeyManager.setFirstItemActive();
        this.triggerRange(trigger, from, this.listKeyManager.activeItemIndex, !trigger.isSelected());
      }
      event.preventDefault();
      return;
    }
    if (this.multiple && keyCode === END && hasModifierKey(event, ...ctrlKeys) && hasModifierKey(event, "shiftKey")) {
      const trigger = this.listKeyManager.activeItem;
      if (trigger) {
        const from = this.listKeyManager.activeItemIndex;
        this.listKeyManager.setLastItemActive();
        this.triggerRange(trigger, from, this.listKeyManager.activeItemIndex, !trigger.isSelected());
      }
      event.preventDefault();
      return;
    }
    if (keyCode === SPACE || keyCode === ENTER) {
      this.triggerOption(this.listKeyManager.activeItem);
      event.preventDefault();
      return;
    }
    const isNavKey = keyCode === UP_ARROW || keyCode === DOWN_ARROW || keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW || keyCode === HOME || keyCode === END;
    this.listKeyManager.onKeydown(event);
    if (isNavKey && event.shiftKey && previousActiveIndex !== this.listKeyManager.activeItemIndex) {
      this.triggerOption(this.listKeyManager.activeItem);
    }
  }
  /** Called when a focus moves into the listbox. */
  _handleFocusIn() {
    this._hasFocus = true;
  }
  /**
   * Called when the focus leaves an element in the listbox.
   * @param event The focusout event
   */
  _handleFocusOut(event) {
    this._previousActiveOption = this.listKeyManager.activeItem;
    const otherElement = event.relatedTarget;
    if (this.element !== otherElement && !this.element.contains(otherElement)) {
      this._onTouched();
      this._hasFocus = false;
      this._setNextFocusToSelectedOption();
    }
  }
  /** Get the id of the active option if active descendant is being used. */
  _getAriaActiveDescendant() {
    return this.useActiveDescendant ? this.listKeyManager?.activeItem?.id : null;
  }
  /** Get the tabindex for the listbox. */
  _getTabIndex() {
    if (this.disabled) {
      return -1;
    }
    return this.useActiveDescendant || !this.listKeyManager.activeItem ? this.enabledTabIndex : -1;
  }
  /** Initialize the key manager. */
  _initKeyManager() {
    this.listKeyManager = new ActiveDescendantKeyManager(this.options).withWrap(!this._navigationWrapDisabled).withTypeAhead().withHomeAndEnd().withAllowedModifierKeys(["shiftKey"]).skipPredicate(this._navigateDisabledOptions ? this._skipNonePredicate : this._skipDisabledPredicate);
    if (this.orientation === "vertical") {
      this.listKeyManager.withVerticalOrientation();
    } else {
      this.listKeyManager.withHorizontalOrientation(this._dir?.value || "ltr");
    }
    if (this.selectionModel.selected.length) {
      Promise.resolve().then(() => this._setNextFocusToSelectedOption());
    }
    this.listKeyManager.change.subscribe(() => this._focusActiveOption());
    this.options.changes.pipe(takeUntil(this.destroyed)).subscribe(() => {
      const activeOption = this.listKeyManager.activeItem;
      if (activeOption && !this.options.find((option) => option === activeOption)) {
        this.listKeyManager.setActiveItem(-1);
        this.changeDetectorRef.markForCheck();
      }
    });
  }
  /** Focus the active option. */
  _focusActiveOption() {
    if (!this.useActiveDescendant) {
      this.listKeyManager.activeItem?.focus();
    }
    this.changeDetectorRef.markForCheck();
  }
  /**
   * Set the selected values.
   * @param value The list of new selected values.
   */
  _setSelection(value) {
    if (this._invalid) {
      this.selectionModel.clear(false);
    }
    this.selectionModel.setSelection(...this._coerceValue(value));
    if (!this._hasFocus) {
      this._setNextFocusToSelectedOption();
    }
  }
  /** Sets the first selected option as first in the keyboard focus order. */
  _setNextFocusToSelectedOption() {
    const selected = this.options?.find((option) => option.isSelected());
    if (selected) {
      this.listKeyManager.updateActiveItem(selected);
    }
  }
  /** Update the internal value of the listbox based on the selection model. */
  _updateInternalValue() {
    const indexCache = /* @__PURE__ */ new Map();
    this.selectionModel.sort((a, b) => {
      const aIndex = this._getIndexForValue(indexCache, a);
      const bIndex = this._getIndexForValue(indexCache, b);
      return aIndex - bIndex;
    });
    const selected = this.selectionModel.selected;
    this._invalid = !this.multiple && selected.length > 1 || !!this._getInvalidOptionValues(selected).length;
    this.changeDetectorRef.markForCheck();
  }
  /**
   * Gets the index of the given value in the given list of options.
   * @param cache The cache of indices found so far
   * @param value The value to find
   * @return The index of the value in the options list
   */
  _getIndexForValue(cache, value) {
    const isEqual = this.compareWith || Object.is;
    if (!cache.has(value)) {
      let index = -1;
      for (let i = 0; i < this.options.length; i++) {
        if (isEqual(value, this.options.get(i).value)) {
          index = i;
          break;
        }
      }
      cache.set(value, index);
    }
    return cache.get(value);
  }
  /**
   * Handle the user clicking an option.
   * @param option The option that was clicked.
   */
  _handleOptionClicked(option, event) {
    event.preventDefault();
    this.listKeyManager.setActiveItem(option);
    if (event.shiftKey && this.multiple) {
      this.triggerRange(option, this._getLastTriggeredIndex() ?? this.listKeyManager.activeItemIndex, this.listKeyManager.activeItemIndex, !option.isSelected());
    } else {
      this.triggerOption(option);
    }
  }
  /** Verifies that no two options represent the same value under the compareWith function. */
  _verifyNoOptionValueCollisions() {
    this.options.changes.pipe(startWith(this.options), takeUntil(this.destroyed)).subscribe(() => {
      const isEqual = this.compareWith ?? Object.is;
      for (let i = 0; i < this.options.length; i++) {
        const option = this.options.get(i);
        let duplicate = null;
        for (let j = i + 1; j < this.options.length; j++) {
          const other = this.options.get(j);
          if (isEqual(option.value, other.value)) {
            duplicate = other;
            break;
          }
        }
        if (duplicate) {
          if (this.compareWith) {
            console.warn(`Found multiple CdkOption representing the same value under the given compareWith function`, {
              option1: option.element,
              option2: duplicate.element,
              compareWith: this.compareWith
            });
          } else {
            console.warn(`Found multiple CdkOption with the same value`, {
              option1: option.element,
              option2: duplicate.element
            });
          }
          return;
        }
      }
    });
  }
  /** Verifies that the option values are valid. */
  _verifyOptionValues() {
    if (this.options && (typeof ngDevMode === "undefined" || ngDevMode)) {
      const selected = this.selectionModel.selected;
      const invalidValues = this._getInvalidOptionValues(selected);
      if (!this.multiple && selected.length > 1) {
        throw Error("Listbox cannot have more than one selected value in multi-selection mode.");
      }
      if (invalidValues.length) {
        throw Error("Listbox has selected values that do not match any of its options.");
      }
    }
  }
  /**
   * Coerces a value into an array representing a listbox selection.
   * @param value The value to coerce
   * @return An array
   */
  _coerceValue(value) {
    return value == null ? [] : coerceArray(value);
  }
  /**
   * Get the sublist of values that do not represent valid option values in this listbox.
   * @param values The list of values
   * @return The sublist of values that are not valid option values
   */
  _getInvalidOptionValues(values) {
    const isEqual = this.compareWith || Object.is;
    const validValues = (this.options || []).map((option) => option.value);
    return values.filter((value) => !validValues.some((validValue) => isEqual(value, validValue)));
  }
  /** Get the index of the last triggered option. */
  _getLastTriggeredIndex() {
    const index = this.options.toArray().indexOf(this._lastTriggered);
    return index === -1 ? null : index;
  }
  /**
   * Set previous active option as active option on window blur.
   * This ensures that the `activeOption` matches the actual focused element when the user returns to the document.
   */
  _setPreviousActiveOptionAsActiveOptionOnWindowBlur() {
    this.ngZone.runOutsideAngular(() => {
      fromEvent(window, "blur").pipe(takeUntil(this.destroyed)).subscribe(() => {
        if (this.element.contains(document.activeElement) && this._previousActiveOption) {
          this._setActiveOption(this._previousActiveOption);
          this._previousActiveOption = null;
        }
      });
    });
  }
  static {
    this.ɵfac = function CdkListbox_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CdkListbox)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _CdkListbox,
      selectors: [["", "cdkListbox", ""]],
      contentQueries: function CdkListbox_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          ɵɵcontentQuery(dirIndex, CdkOption, 5);
        }
        if (rf & 2) {
          let _t;
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.options = _t);
        }
      },
      hostAttrs: ["role", "listbox", 1, "cdk-listbox"],
      hostVars: 6,
      hostBindings: function CdkListbox_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("focus", function CdkListbox_focus_HostBindingHandler() {
            return ctx._handleFocus();
          })("keydown", function CdkListbox_keydown_HostBindingHandler($event) {
            return ctx._handleKeydown($event);
          })("focusout", function CdkListbox_focusout_HostBindingHandler($event) {
            return ctx._handleFocusOut($event);
          })("focusin", function CdkListbox_focusin_HostBindingHandler() {
            return ctx._handleFocusIn();
          });
        }
        if (rf & 2) {
          ɵɵhostProperty("id", ctx.id);
          ɵɵattribute("tabindex", ctx._getTabIndex())("aria-disabled", ctx.disabled)("aria-multiselectable", ctx.multiple)("aria-activedescendant", ctx._getAriaActiveDescendant())("aria-orientation", ctx.orientation);
        }
      },
      inputs: {
        id: "id",
        enabledTabIndex: [0, "tabindex", "enabledTabIndex"],
        value: [0, "cdkListboxValue", "value"],
        multiple: [2, "cdkListboxMultiple", "multiple", booleanAttribute],
        disabled: [2, "cdkListboxDisabled", "disabled", booleanAttribute],
        useActiveDescendant: [2, "cdkListboxUseActiveDescendant", "useActiveDescendant", booleanAttribute],
        orientation: [0, "cdkListboxOrientation", "orientation"],
        compareWith: [0, "cdkListboxCompareWith", "compareWith"],
        navigationWrapDisabled: [2, "cdkListboxNavigationWrapDisabled", "navigationWrapDisabled", booleanAttribute],
        navigateDisabledOptions: [2, "cdkListboxNavigatesDisabledOptions", "navigateDisabledOptions", booleanAttribute]
      },
      outputs: {
        valueChange: "cdkListboxValueChange"
      },
      exportAs: ["cdkListbox"],
      standalone: true,
      features: [ɵɵProvidersFeature([{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => _CdkListbox),
        multi: true
      }]), ɵɵInputTransformsFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkListbox, [{
    type: Directive,
    args: [{
      selector: "[cdkListbox]",
      standalone: true,
      exportAs: "cdkListbox",
      host: {
        "role": "listbox",
        "class": "cdk-listbox",
        "[id]": "id",
        "[attr.tabindex]": "_getTabIndex()",
        "[attr.aria-disabled]": "disabled",
        "[attr.aria-multiselectable]": "multiple",
        "[attr.aria-activedescendant]": "_getAriaActiveDescendant()",
        "[attr.aria-orientation]": "orientation",
        "(focus)": "_handleFocus()",
        "(keydown)": "_handleKeydown($event)",
        "(focusout)": "_handleFocusOut($event)",
        "(focusin)": "_handleFocusIn()"
      },
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => CdkListbox),
        multi: true
      }]
    }]
  }], () => [], {
    id: [{
      type: Input
    }],
    enabledTabIndex: [{
      type: Input,
      args: ["tabindex"]
    }],
    value: [{
      type: Input,
      args: ["cdkListboxValue"]
    }],
    multiple: [{
      type: Input,
      args: [{
        alias: "cdkListboxMultiple",
        transform: booleanAttribute
      }]
    }],
    disabled: [{
      type: Input,
      args: [{
        alias: "cdkListboxDisabled",
        transform: booleanAttribute
      }]
    }],
    useActiveDescendant: [{
      type: Input,
      args: [{
        alias: "cdkListboxUseActiveDescendant",
        transform: booleanAttribute
      }]
    }],
    orientation: [{
      type: Input,
      args: ["cdkListboxOrientation"]
    }],
    compareWith: [{
      type: Input,
      args: ["cdkListboxCompareWith"]
    }],
    navigationWrapDisabled: [{
      type: Input,
      args: [{
        alias: "cdkListboxNavigationWrapDisabled",
        transform: booleanAttribute
      }]
    }],
    navigateDisabledOptions: [{
      type: Input,
      args: [{
        alias: "cdkListboxNavigatesDisabledOptions",
        transform: booleanAttribute
      }]
    }],
    valueChange: [{
      type: Output,
      args: ["cdkListboxValueChange"]
    }],
    options: [{
      type: ContentChildren,
      args: [CdkOption, {
        descendants: true
      }]
    }]
  });
})();
var EXPORTED_DECLARATIONS = [CdkListbox, CdkOption];
var CdkListboxModule = class _CdkListboxModule {
  static {
    this.ɵfac = function CdkListboxModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CdkListboxModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _CdkListboxModule,
      imports: [CdkListbox, CdkOption],
      exports: [CdkListbox, CdkOption]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({});
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkListboxModule, [{
    type: NgModule,
    args: [{
      imports: [...EXPORTED_DECLARATIONS],
      exports: [...EXPORTED_DECLARATIONS]
    }]
  }], null, null);
})();

// ../../node_modules/.pnpm/@spartan-ng+ui-label-brain@0.0.1-alpha.356_@angular+common@18.2.13_@angular+core@18.2.13_rxjs_6a23flq7xskkenmxve2ea7favu/node_modules/@spartan-ng/ui-label-brain/fesm2022/spartan-ng-ui-label-brain.mjs
var nextId2 = 0;
var BrnLabelDirective = class _BrnLabelDirective {
  constructor() {
    this._id = signal(`brn-label-${nextId2++}`);
    this._ngControl = inject(NgControl, {
      optional: true
    });
    this._isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
    this._element = inject(ElementRef).nativeElement;
    this._dataDisabled = signal("auto");
    this.dataDisabled = this._dataDisabled.asReadonly();
  }
  set id(id) {
    this._id.set(id || this._id());
  }
  get id() {
    return this._id();
  }
  ngOnInit() {
    if (!this._isBrowser) return;
    this._changes = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName !== "data-disabled") return;
        const state = mutation.target.attributes.getNamedItem(mutation.attributeName)?.value === "true";
        this._dataDisabled.set(state ?? "auto");
      });
    });
    this._changes?.observe(this._element, {
      attributes: true,
      childList: true,
      characterData: true
    });
  }
  static {
    this.ɵfac = function BrnLabelDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BrnLabelDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _BrnLabelDirective,
      selectors: [["", "brnLabel", ""]],
      hostVars: 9,
      hostBindings: function BrnLabelDirective_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵhostProperty("id", ctx._id());
          ɵɵclassProp("ng-invalid", (ctx._ngControl == null ? null : ctx._ngControl.invalid) || null)("ng-dirty", (ctx._ngControl == null ? null : ctx._ngControl.dirty) || null)("ng-valid", (ctx._ngControl == null ? null : ctx._ngControl.valid) || null)("ng-touched", (ctx._ngControl == null ? null : ctx._ngControl.touched) || null);
        }
      },
      inputs: {
        id: "id"
      },
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BrnLabelDirective, [{
    type: Directive,
    args: [{
      selector: "[brnLabel]",
      standalone: true,
      host: {
        "[id]": "_id()",
        "[class.ng-invalid]": "this._ngControl?.invalid || null",
        "[class.ng-dirty]": "this._ngControl?.dirty || null",
        "[class.ng-valid]": "this._ngControl?.valid || null",
        "[class.ng-touched]": "this._ngControl?.touched || null"
      }
    }]
  }], null, {
    id: [{
      type: Input
    }]
  });
})();
var BrnLabelModule = class _BrnLabelModule {
  static {
    this.ɵfac = function BrnLabelModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BrnLabelModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _BrnLabelModule,
      imports: [BrnLabelDirective],
      exports: [BrnLabelDirective]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({});
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BrnLabelModule, [{
    type: NgModule,
    args: [{
      imports: [BrnLabelDirective],
      exports: [BrnLabelDirective]
    }]
  }], null, null);
})();

// ../../node_modules/.pnpm/@spartan-ng+ui-select-brain@0.0.1-alpha.356_uvjgxynqjc7b7hin4ebxfjasda/node_modules/@spartan-ng/ui-select-brain/fesm2022/spartan-ng-ui-select-brain.mjs
var _c0 = ["viewport"];
var _c1 = ["*", [["hlm-select-scroll-up"]], [["brnSelectScrollUp"]], [["brnSelectScrollDown"]], [["hlm-select-scroll-down"]]];
var _c2 = ["*", "hlm-select-scroll-up", "brnSelectScrollUp", "brnSelectScrollDown", "hlm-select-scroll-down"];
function BrnSelectContentComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵprojection(0, 1);
    ɵɵprojection(1, 2);
  }
}
function BrnSelectContentComponent_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function BrnSelectContentComponent_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵprojection(0, 3);
    ɵɵprojection(1, 4);
  }
}
function BrnSelectContentComponent_ng_container_8_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
var _c3 = [[["hlm-select-trigger"], ["", "brnSelectTrigger", ""]], [["label", "hlmLabel", ""], ["label", "brnLabel", ""]], "*"];
var _c4 = ["hlm-select-trigger,[brnSelectTrigger]", "label[hlmLabel],label[brnLabel]", "*"];
function BrnSelectComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "label", 1);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵattribute("id", ctx_r1.backupLabelId());
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r1._placeholder());
  }
}
function BrnSelectComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵprojection(0, 1);
  }
}
function BrnSelectComponent_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵprojection(0, 2);
  }
}
var BrnSelectService = class _BrnSelectService {
  get selectTrigger() {
    return this._selectTrigger;
  }
  constructor() {
    this.state = signal({
      id: "",
      labelId: "",
      panelId: "",
      placeholder: "",
      isExpanded: false,
      multiple: false,
      disabled: false,
      dir: "ltr",
      selectedOptions: [],
      possibleOptions: [],
      value: "",
      triggerWidth: 0
    });
    this.id = computed(() => this.state().id);
    this.labelId = computed(() => this.state().labelId);
    this.panelId = computed(() => this.state().panelId);
    this.placeholder = computed(() => this.state().placeholder);
    this.disabled = computed(() => this.state().disabled);
    this.isExpanded = computed(() => this.state().isExpanded);
    this.multiple = computed(() => this.state().multiple);
    this.dir = computed(() => this.state().dir);
    this.selectedOptions = computed(() => this.state().selectedOptions);
    this.value = computed(() => this.state().value);
    this.triggerWidth = computed(() => this.state().triggerWidth);
    this.possibleOptions = computed(() => this.state().possibleOptions);
    this.multiple$ = toObservable(this.multiple);
    this.listBoxValueChangeEvent$ = new Subject();
    this.listBoxValueChangeEvent$.pipe(takeUntilDestroyed()).subscribe((listBoxChange) => {
      const updatedSelections = this.multiple() ? this.getUpdatedOptions(listBoxChange) : [listBoxChange.option];
      const value = this.multiple() ? listBoxChange.value : listBoxChange.value[0];
      this.state.update((state) => __spreadProps(__spreadValues({}, state), {
        selectedOptions: [...updatedSelections],
        value
      }));
    });
    this.multiple$.pipe(skip(1), takeUntilDestroyed()).subscribe((multiple) => {
      if (!multiple && this.value().length > 1) {
        this.deselectAllOptions();
      }
    });
  }
  setTriggerWidth(triggerWidth) {
    this.state.update((s) => __spreadProps(__spreadValues({}, s), {
      triggerWidth
    }));
  }
  getUpdatedOptions(latestListboxChange) {
    const isNewSelection = latestListboxChange.value.findIndex((value) => value === latestListboxChange.option?.value);
    if (isNewSelection === -1) {
      const removedOptionIndex = this.selectedOptions().findIndex((option) => latestListboxChange.option === option);
      const options = this.selectedOptions();
      options.splice(removedOptionIndex, 1);
      return options;
    }
    return [...this.selectedOptions(), latestListboxChange.option];
  }
  deselectAllOptions() {
    this.state.update((state) => __spreadProps(__spreadValues({}, state), {
      selectedOptions: [],
      value: []
    }));
  }
  // Needed due to https://github.com/angular/angular/issues/20810
  _setSelectTrigger(trigger) {
    this._selectTrigger = trigger;
  }
  setInitialSelectedOptions(value) {
    this.selectOptionByValue(value);
    this.state.update((state) => __spreadProps(__spreadValues({}, state), {
      value,
      initialSelectedOptions: this.selectedOptions(),
      selectedOptions: this.selectedOptions()
    }));
  }
  selectOptionByValue(value) {
    const options = this.possibleOptions();
    if (value === null || value === void 0) {
      const nullOrUndefinedOption = options.find((o) => o && o.value === value);
      if (!nullOrUndefinedOption) {
        this.state.update((state) => __spreadProps(__spreadValues({}, state), {
          selectedOptions: [],
          value: this.multiple() ? [] : ""
        }));
        return;
      }
    }
    if (this.multiple()) {
      const selectedOptions = options.filter((option) => {
        if (Array.isArray(value)) {
          return value.includes(option?.value);
        }
        return value === option?.value;
      });
      this.state.update((state) => __spreadProps(__spreadValues({}, state), {
        selectedOptions,
        value
      }));
    } else {
      const selectedOption = options.find((option) => option?.value === value);
      if (!selectedOption) {
        return;
      }
      this.state.update((state) => __spreadProps(__spreadValues({}, state), {
        selectedOptions: [selectedOption],
        value: selectedOption.value
      }));
    }
  }
  static {
    this.ɵfac = function BrnSelectService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BrnSelectService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _BrnSelectService,
      factory: _BrnSelectService.ɵfac
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BrnSelectService, [{
    type: Injectable
  }], () => [], null);
})();
var BrnSelectOptionDirective = class _BrnSelectOptionDirective {
  constructor() {
    this._cdkSelectOption = inject(CdkOption, {
      host: true
    });
    this._selectService = inject(BrnSelectService);
    this._selected = signal(false);
    this._focused = signal(false);
    this.elementRef = inject(ElementRef);
    this.selected = computed(() => this._selected());
    this.focused = computed(() => this._focused());
    this.checkedState = computed(() => this._selected() ? "checked" : "unchecked");
    this.dir = computed(() => this._selectService.dir());
    this._disabled = false;
    toObservable(this._selectService.value).subscribe((selectedValues) => {
      if (Array.isArray(selectedValues)) {
        const itemFound = selectedValues.find((val) => val === this._cdkSelectOption.value);
        this._selected.set(!!itemFound);
      } else {
        this._selected.set(this._cdkSelectOption.value === selectedValues);
      }
    });
  }
  set value(value) {
    this._cdkSelectOption.value = value;
  }
  set disabled(value) {
    this._disabled = value;
  }
  get disabled() {
    return this._disabled;
  }
  hover() {
    this.focus();
  }
  focus() {
    this._cdkSelectOption.focus();
    this._focused.set(true);
  }
  blur() {
    this._focused.set(false);
  }
  static {
    this.ɵfac = function BrnSelectOptionDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BrnSelectOptionDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _BrnSelectOptionDirective,
      selectors: [["", "brnOption", ""]],
      hostVars: 1,
      hostBindings: function BrnSelectOptionDirective_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("mouseenter", function BrnSelectOptionDirective_mouseenter_HostBindingHandler() {
            return ctx.hover();
          })("blur", function BrnSelectOptionDirective_blur_HostBindingHandler() {
            return ctx.blur();
          });
        }
        if (rf & 2) {
          ɵɵattribute("dir", ctx._selectService.dir());
        }
      },
      inputs: {
        value: "value",
        disabled: "disabled"
      },
      standalone: true,
      features: [ɵɵHostDirectivesFeature([CdkOption])]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BrnSelectOptionDirective, [{
    type: Directive,
    args: [{
      selector: "[brnOption]",
      standalone: true,
      hostDirectives: [CdkOption],
      host: {
        "(mouseenter)": "hover()",
        "(blur)": "blur()",
        "[attr.dir]": "_selectService.dir()"
      }
    }]
  }], () => [], {
    value: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }]
  });
})();
var BrnSelectScrollDownDirective = class _BrnSelectScrollDownDirective {
  constructor() {
    this._el = inject(ElementRef);
    this._selectContent = inject(BrnSelectContentComponent);
    this.endReached = new Subject();
    this._destroyRef = inject(DestroyRef);
  }
  startEmittingEvents() {
    const mouseLeave$ = fromEvent(this._el.nativeElement, "mouseleave");
    interval(100).pipe(takeUntil(mouseLeave$), takeUntil(this.endReached), takeUntilDestroyed(this._destroyRef)).subscribe(() => this._selectContent.moveFocusDown());
  }
  stopEmittingEvents() {
    this.endReached.next(true);
  }
  static {
    this.ɵfac = function BrnSelectScrollDownDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BrnSelectScrollDownDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _BrnSelectScrollDownDirective,
      selectors: [["", "brnSelectScrollDown", ""], ["brn-select-scroll-down"], ["hlm-select-scroll-down", 5, "noHlm"]],
      hostAttrs: ["aria-hidden", "true"],
      hostBindings: function BrnSelectScrollDownDirective_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("mouseenter", function BrnSelectScrollDownDirective_mouseenter_HostBindingHandler() {
            return ctx.startEmittingEvents();
          });
        }
      },
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BrnSelectScrollDownDirective, [{
    type: Directive,
    args: [{
      selector: "[brnSelectScrollDown], brn-select-scroll-down, hlm-select-scroll-down:not(noHlm)",
      standalone: true,
      host: {
        "aria-hidden": "true",
        "(mouseenter)": "startEmittingEvents()"
      }
    }]
  }], null, null);
})();
var BrnSelectScrollUpDirective = class _BrnSelectScrollUpDirective {
  constructor() {
    this._el = inject(ElementRef);
    this._selectContent = inject(BrnSelectContentComponent);
    this.endReached = new Subject();
    this._destroyRef = inject(DestroyRef);
  }
  startEmittingEvents() {
    const mouseLeave$ = fromEvent(this._el.nativeElement, "mouseleave");
    interval(100).pipe(takeUntil(mouseLeave$), takeUntil(this.endReached), takeUntilDestroyed(this._destroyRef)).subscribe(() => this._selectContent.moveFocusUp());
  }
  stopEmittingEvents() {
    this.endReached.next(true);
  }
  static {
    this.ɵfac = function BrnSelectScrollUpDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BrnSelectScrollUpDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _BrnSelectScrollUpDirective,
      selectors: [["", "brnSelectScrollUp", ""], ["brn-select-scroll-up"], ["hlm-select-scroll-up", 5, "noHlm"]],
      hostAttrs: ["aria-hidden", "true"],
      hostBindings: function BrnSelectScrollUpDirective_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("mouseenter", function BrnSelectScrollUpDirective_mouseenter_HostBindingHandler() {
            return ctx.startEmittingEvents();
          });
        }
      },
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BrnSelectScrollUpDirective, [{
    type: Directive,
    args: [{
      selector: "[brnSelectScrollUp], brn-select-scroll-up, hlm-select-scroll-up:not(noHlm)",
      standalone: true,
      host: {
        "aria-hidden": "true",
        "(mouseenter)": "startEmittingEvents()"
      }
    }]
  }], null, null);
})();
var BrnSelectContentComponent = class _BrnSelectContentComponent {
  constructor() {
    this._el = inject(ElementRef);
    this._cdkListbox = inject(CdkListbox, {
      host: true
    });
    this.destroyRef = inject(DestroyRef);
    this._selectService = inject(BrnSelectService);
    this.labelledBy = this._selectService.labelId;
    this.id = this._selectService.id;
    this.canScrollUp = signal(false);
    this.canScrollDown = signal(false);
    this.initialSelectedOptions$ = toObservable(this._selectService.selectedOptions);
    this._cdkListbox.valueChange.asObservable().pipe(takeUntilDestroyed()).subscribe((val) => this._selectService.listBoxValueChangeEvent$.next(val));
    effect(() => {
      this._cdkListbox.multiple = this._selectService.multiple();
      this._selectService.isExpanded() && setTimeout(() => this.updateArrowDisplay());
    });
  }
  ngAfterViewInit() {
    this.setInitiallySelectedOptions();
  }
  setInitiallySelectedOptions() {
    this.initialSelectedOptions$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((selectedOptions) => {
      if (this._selectService.multiple()) {
        this._cdkListbox.multiple = true;
      }
      for (const cdkOption of this._selectService.possibleOptions()) {
        if (selectedOptions.includes(cdkOption)) {
          cdkOption?.select();
        } else {
          cdkOption?.deselect();
        }
      }
      for (const cdkOption of selectedOptions) {
        cdkOption?.select();
      }
    });
  }
  updateArrowDisplay() {
    this.canScrollUp.set(this.viewport.nativeElement.scrollTop > 0);
    const maxScroll = this.viewport.nativeElement.scrollHeight - this.viewport.nativeElement.clientHeight;
    this.canScrollDown.set(Math.ceil(this.viewport.nativeElement.scrollTop) < maxScroll);
  }
  handleScroll() {
    this.updateArrowDisplay();
  }
  focusList() {
    this._cdkListbox.focus();
  }
  moveFocusUp() {
    this.viewport.nativeElement.scrollBy({
      top: -100,
      behavior: "smooth"
    });
    if (this.viewport.nativeElement.scrollTop === 0) {
      this.scrollUpBtn.stopEmittingEvents();
    }
  }
  moveFocusDown() {
    this.viewport.nativeElement.scrollBy({
      top: 100,
      behavior: "smooth"
    });
    const viewportSize = this._el.nativeElement.scrollHeight;
    const viewportScrollPosition = this.viewport.nativeElement.scrollTop;
    if (viewportSize + viewportScrollPosition + 100 > this.viewport.nativeElement.scrollHeight + 50) {
      this.scrollDownBtn.stopEmittingEvents();
    }
  }
  static {
    this.ɵfac = function BrnSelectContentComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BrnSelectContentComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _BrnSelectContentComponent,
      selectors: [["brn-select-content"], ["hlm-select-content", 5, "noHlm"]],
      contentQueries: function BrnSelectContentComponent_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          ɵɵcontentQuery(dirIndex, BrnSelectScrollUpDirective, 5);
          ɵɵcontentQuery(dirIndex, BrnSelectScrollDownDirective, 5);
          ɵɵcontentQuery(dirIndex, BrnSelectOptionDirective, 5);
        }
        if (rf & 2) {
          let _t;
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.scrollUpBtn = _t.first);
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.scrollDownBtn = _t.first);
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._options = _t);
        }
      },
      viewQuery: function BrnSelectContentComponent_Query(rf, ctx) {
        if (rf & 1) {
          ɵɵviewQuery(_c0, 5);
        }
        if (rf & 2) {
          let _t;
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.viewport = _t.first);
        }
      },
      hostVars: 4,
      hostBindings: function BrnSelectContentComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵhostProperty("id", ctx.id() + "--content");
          ɵɵattribute("aria-labelledBy", ctx.labelledBy())("aria-controlledBy", ctx.id() + "--trigger")("dir", ctx._selectService.dir());
        }
      },
      standalone: true,
      features: [ɵɵHostDirectivesFeature([CdkListbox]), ɵɵStandaloneFeature],
      ngContentSelectors: _c2,
      decls: 9,
      vars: 2,
      consts: [["scrollUp", ""], ["viewport", ""], ["scrollDown", ""], [4, "ngTemplateOutlet"], ["data-brn-select-viewport", "", 2, "flex", "1 1 0%", "position", "relative", "width", "100%", "overflow", "auto", "min-height", "36px", "padding-bottom", "2px", "margin-bottom", "-2px", 3, "scroll"]],
      template: function BrnSelectContentComponent_Template(rf, ctx) {
        if (rf & 1) {
          const _r1 = ɵɵgetCurrentView();
          ɵɵprojectionDef(_c1);
          ɵɵtemplate(0, BrnSelectContentComponent_ng_template_0_Template, 2, 0, "ng-template", null, 0, ɵɵtemplateRefExtractor)(2, BrnSelectContentComponent_ng_container_2_Template, 1, 0, "ng-container", 3);
          ɵɵelementStart(3, "div", 4, 1);
          ɵɵlistener("scroll", function BrnSelectContentComponent_Template_div_scroll_3_listener() {
            ɵɵrestoreView(_r1);
            return ɵɵresetView(ctx.handleScroll());
          });
          ɵɵprojection(5);
          ɵɵelementEnd();
          ɵɵtemplate(6, BrnSelectContentComponent_ng_template_6_Template, 2, 0, "ng-template", null, 2, ɵɵtemplateRefExtractor)(8, BrnSelectContentComponent_ng_container_8_Template, 1, 0, "ng-container", 3);
        }
        if (rf & 2) {
          const scrollUp_r2 = ɵɵreference(1);
          const scrollDown_r3 = ɵɵreference(7);
          ɵɵadvance(2);
          ɵɵproperty("ngTemplateOutlet", ctx.canScrollUp() && ctx.scrollUpBtn ? scrollUp_r2 : null);
          ɵɵadvance(6);
          ɵɵproperty("ngTemplateOutlet", ctx.canScrollDown() && ctx.scrollDownBtn ? scrollDown_r3 : null);
        }
      },
      dependencies: [NgTemplateOutlet],
      styles: ["[_nghost-%COMP%]{display:flex;box-sizing:border-box;flex-direction:column;outline:none;pointer-events:auto}[data-brn-select-viewport][_ngcontent-%COMP%]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch}[data-brn-select-viewport][_ngcontent-%COMP%]::-webkit-scrollbar{display:none}"],
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BrnSelectContentComponent, [{
    type: Component,
    args: [{
      selector: "brn-select-content, hlm-select-content:not(noHlm)",
      standalone: true,
      imports: [BrnSelectScrollUpDirective, BrnSelectScrollDownDirective, NgTemplateOutlet],
      hostDirectives: [CdkListbox],
      changeDetection: ChangeDetectionStrategy.OnPush,
      host: {
        "[attr.aria-labelledBy]": "labelledBy()",
        "[attr.aria-controlledBy]": "id() +'--trigger'",
        "[id]": "id() + '--content'",
        "[attr.dir]": "_selectService.dir()"
      },
      template: `
		<ng-template #scrollUp>
			<ng-content select="hlm-select-scroll-up" />
			<ng-content select="brnSelectScrollUp" />
		</ng-template>
		<ng-container *ngTemplateOutlet="canScrollUp() && scrollUpBtn ? scrollUp : null" />
		<div
			data-brn-select-viewport
			#viewport
			(scroll)="handleScroll()"
			style="flex: 1 1 0%;
			position: relative;
			width:100%;
			overflow:auto;
			min-height: 36px;
      padding-bottom: 2px;
      margin-bottom: -2px;"
		>
			<ng-content />
		</div>
		<ng-template #scrollDown>
			<ng-content select="brnSelectScrollDown" />
			<ng-content select="hlm-select-scroll-down" />
		</ng-template>
		<ng-container *ngTemplateOutlet="canScrollDown() && scrollDownBtn ? scrollDown : null" />
	`,
      styles: [":host{display:flex;box-sizing:border-box;flex-direction:column;outline:none;pointer-events:auto}[data-brn-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch}[data-brn-select-viewport]::-webkit-scrollbar{display:none}\n"]
    }]
  }], () => [], {
    viewport: [{
      type: ViewChild,
      args: ["viewport"]
    }],
    scrollUpBtn: [{
      type: ContentChild,
      args: [BrnSelectScrollUpDirective, {
        static: false
      }]
    }],
    scrollDownBtn: [{
      type: ContentChild,
      args: [BrnSelectScrollDownDirective, {
        static: false
      }]
    }],
    _options: [{
      type: ContentChildren,
      args: [BrnSelectOptionDirective, {
        descendants: true
      }]
    }]
  });
})();
var BrnSelectGroupDirective = class _BrnSelectGroupDirective {
  constructor() {
    this.labelledBy = signal("");
  }
  static {
    this.ɵfac = function BrnSelectGroupDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BrnSelectGroupDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _BrnSelectGroupDirective,
      selectors: [["", "brnSelectGroup", ""]],
      hostAttrs: ["role", "group"],
      hostVars: 1,
      hostBindings: function BrnSelectGroupDirective_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵattribute("aria-labelledby", ctx.labelledBy());
        }
      },
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BrnSelectGroupDirective, [{
    type: Directive,
    args: [{
      selector: "[brnSelectGroup]",
      standalone: true,
      host: {
        role: "group",
        "[attr.aria-labelledby]": "labelledBy()"
      }
    }]
  }], null, null);
})();
var BrnSelectLabelDirective = class _BrnSelectLabelDirective {
  constructor() {
    this.group = inject(BrnSelectGroupDirective, {
      optional: true
    });
    this.label = inject(BrnLabelDirective, {
      host: true
    });
    this.group?.labelledBy.set(this.label.id);
  }
  static {
    this.ɵfac = function BrnSelectLabelDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BrnSelectLabelDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _BrnSelectLabelDirective,
      selectors: [["", "brnSelectLabel", ""]],
      standalone: true,
      features: [ɵɵHostDirectivesFeature([BrnLabelDirective])]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BrnSelectLabelDirective, [{
    type: Directive,
    args: [{
      selector: "[brnSelectLabel]",
      hostDirectives: [BrnLabelDirective],
      standalone: true
    }]
  }], () => [], null);
})();
var BrnSelectTriggerDirective = class _BrnSelectTriggerDirective {
  constructor() {
    this.el = inject(ElementRef);
    this._selectService = inject(BrnSelectService);
    this._ngControl = inject(NgControl, {
      optional: true
    });
    this.isExpanded = this._selectService.isExpanded;
    this.selectTriggerId = computed(() => `${this._selectService.id()}--trigger`);
    this.selectContentId = computed(() => `${this._selectService.id()}--content`);
    this.selectDisable = computed(() => this._selectService.disabled());
    this.selectTriggerLabelledBy = computed(() => {
      if (this._selectService.value() && this._selectService.value().length > 0) {
        return `${this._selectService.labelId()} ${this._selectService.id()}--value`;
      }
      return this._selectService.labelId();
    });
    if (!this._selectService) return;
    this._selectService._setSelectTrigger(this);
  }
  ngAfterViewInit() {
    this._selectService.setTriggerWidth(this.el.nativeElement.offsetWidth);
  }
  focus() {
    this.el.nativeElement.focus();
  }
  static {
    this.ɵfac = function BrnSelectTriggerDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BrnSelectTriggerDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _BrnSelectTriggerDirective,
      selectors: [["", "brnSelectTrigger", ""]],
      hostAttrs: ["role", "combobox", "aria-autocomplete", "none", "type", "button"],
      hostVars: 18,
      hostBindings: function BrnSelectTriggerDirective_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵhostProperty("disabled", ctx.selectDisable());
          ɵɵattribute("id", ctx.selectTriggerId())("aria-expanded", ctx.isExpanded())("aria-controls", ctx.selectContentId() + "")("aria-labelledBy", ctx.selectTriggerLabelledBy())("dir", ctx._selectService.dir());
          ɵɵclassProp("ng-invalid", (ctx._ngControl == null ? null : ctx._ngControl.invalid) || null)("ng-dirty", (ctx._ngControl == null ? null : ctx._ngControl.dirty) || null)("ng-valid", (ctx._ngControl == null ? null : ctx._ngControl.valid) || null)("ng-touched", (ctx._ngControl == null ? null : ctx._ngControl.touched) || null)("ng-untouched", (ctx._ngControl == null ? null : ctx._ngControl.untouched) || null)("ng-pristine", (ctx._ngControl == null ? null : ctx._ngControl.pristine) || null);
        }
      },
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BrnSelectTriggerDirective, [{
    type: Directive,
    args: [{
      selector: "[brnSelectTrigger]",
      standalone: true,
      host: {
        role: "combobox",
        "[attr.id]": "selectTriggerId()",
        "[disabled]": "selectDisable()",
        "[attr.aria-expanded]": "isExpanded()",
        "[attr.aria-controls]": "selectContentId() + ''",
        "[attr.aria-labelledBy]": "selectTriggerLabelledBy()",
        "aria-autocomplete": "none",
        "[attr.dir]": "_selectService.dir()",
        "[class.ng-invalid]": "this._ngControl?.invalid || null",
        "[class.ng-dirty]": "this._ngControl?.dirty || null",
        "[class.ng-valid]": "this._ngControl?.valid || null",
        "[class.ng-touched]": "this._ngControl?.touched || null",
        "[class.ng-untouched]": "this._ngControl?.untouched || null",
        "[class.ng-pristine]": "this._ngControl?.pristine || null",
        type: "button"
      }
    }]
  }], () => [], null);
})();
var BrnSelectValueComponent = class _BrnSelectValueComponent {
  constructor() {
    this._selectService = inject(BrnSelectService);
    this.id = computed(() => `${this._selectService.id()}--value`);
    this.placeholder = computed(() => this._selectService.placeholder());
    this.value = null;
    this.transformFn = (values) => (values ?? []).join(", ");
    const cdr = inject(ChangeDetectorRef);
    toObservable(this._selectService.selectedOptions).pipe(takeUntilDestroyed()).subscribe((value) => {
      if (value.length === 0) {
        this.value = null;
        cdr.detectChanges();
        return;
      }
      const selectedLabels = value.map((selectedOption) => selectedOption?.getLabel());
      if (this._selectService.dir() === "rtl") {
        selectedLabels.reverse();
      }
      const result = this.transformFn(selectedLabels);
      this.value = result;
      cdr.detectChanges();
    });
  }
  static {
    this.ɵfac = function BrnSelectValueComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BrnSelectValueComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _BrnSelectValueComponent,
      selectors: [["brn-select-value"], ["hlm-select-value"]],
      hostVars: 1,
      hostBindings: function BrnSelectValueComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵhostProperty("id", ctx.id());
        }
      },
      inputs: {
        transformFn: "transformFn"
      },
      standalone: true,
      features: [ɵɵStandaloneFeature],
      decls: 1,
      vars: 1,
      template: function BrnSelectValueComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵtext(0);
        }
        if (rf & 2) {
          ɵɵtextInterpolate1(" ", ctx.value || ctx.placeholder(), " ");
        }
      },
      styles: ["[_nghost-%COMP%]{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1;white-space:nowrap;pointer-events:none}"],
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BrnSelectValueComponent, [{
    type: Component,
    args: [{
      selector: "brn-select-value, hlm-select-value",
      template: `
		{{ value || placeholder() }}
	`,
      host: {
        "[id]": "id()"
      },
      standalone: true,
      changeDetection: ChangeDetectionStrategy.OnPush,
      styles: [":host{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1;white-space:nowrap;pointer-events:none}\n"]
    }]
  }], () => [], {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transformFn: [{
      type: Input
    }]
  });
})();
var nextId3 = 0;
var BrnSelectComponent = class _BrnSelectComponent {
  set multiple(multiple) {
    this._selectService.state.update((state) => __spreadProps(__spreadValues({}, state), {
      multiple
    }));
  }
  set placeholder(placeholder) {
    this._selectService.state.update((state) => __spreadProps(__spreadValues({}, state), {
      placeholder
    }));
  }
  set disabled(disabled) {
    this._selectService.state.update((state) => __spreadProps(__spreadValues({}, state), {
      disabled
    }));
  }
  constructor() {
    this._selectService = inject(BrnSelectService);
    this.triggerWidth = this._selectService.triggerWidth;
    this._multiple = this._selectService.multiple;
    this._placeholder = this._selectService.placeholder;
    this._disabled = this._selectService.disabled;
    this.dir = input("ltr");
    this.options = contentChildren(CdkOption, {
      descendants: true
    });
    this.options$ = toObservable(this.options);
    this.optionsAndIndex$ = this.options$.pipe(map((options, index) => [options, index]));
    this.openedChange = new EventEmitter();
    this.closeDelay = input(100);
    this.isExpanded = this._selectService.isExpanded;
    this._delayedExpanded = toSignal(toObservable(this.isExpanded).pipe(switchMap((expanded) => !expanded ? of(expanded).pipe(delay(this.closeDelay())) : of(expanded)), takeUntilDestroyed()), {
      initialValue: false
    });
    this.state = computed(() => this.isExpanded() ? "open" : "closed");
    this._positionChanges$ = new Subject();
    this.side = toSignal(this._positionChanges$.pipe(map((change) => (
      // todo: better translation or adjusting hlm to take that into account
      change.connectionPair.originY === "center" ? change.connectionPair.originX === "start" ? "left" : "right" : change.connectionPair.originY
    ))), {
      initialValue: "bottom"
    });
    this.backupLabelId = computed(() => this._selectService.labelId());
    this.labelProvided = signal(false);
    this.ngControl = inject(NgControl, {
      optional: true,
      self: true
    });
    this._onChange = () => {
    };
    this._onTouched = () => {
    };
    this._shouldEmitValueChange = signal(false);
    this._positions = [{
      originX: "start",
      originY: "bottom",
      overlayX: "start",
      overlayY: "top"
    }, {
      originX: "end",
      originY: "bottom",
      overlayX: "end",
      overlayY: "top"
    }, {
      originX: "start",
      originY: "top",
      overlayX: "start",
      overlayY: "bottom"
    }, {
      originX: "end",
      originY: "top",
      overlayX: "end",
      overlayY: "bottom"
    }];
    this.defaultErrorStateMatcher = inject(ErrorStateMatcher);
    this.parentForm = inject(NgForm, {
      optional: true
    });
    this.parentFormGroup = inject(FormGroupDirective, {
      optional: true
    });
    this.errorState = computed(() => this.errorStateTracker.errorState());
    this.writeValue$ = new Subject();
    this.handleOptionChanges();
    this.handleInitialOptionSelect();
    this._selectService.state.update((state) => __spreadProps(__spreadValues({}, state), {
      id: `brn-select-${nextId3++}`
    }));
    if (this.ngControl !== null) {
      this.ngControl.valueAccessor = this;
    }
    this._selectService.listBoxValueChangeEvent$.pipe(takeUntilDestroyed()).subscribe(() => {
      if (!this._multiple()) {
        this.close();
      }
      this._shouldEmitValueChange.set(true);
    });
    toObservable(this._selectService.value).subscribe((value) => {
      if (this._shouldEmitValueChange()) {
        this._onChange(value ?? null);
      }
      this._shouldEmitValueChange.set(true);
    });
    toObservable(this.dir).subscribe((dir) => this._selectService.state.update((state) => __spreadProps(__spreadValues({}, state), {
      dir
    })));
    this.errorStateTracker = new ErrorStateTracker(this.defaultErrorStateMatcher, this.ngControl, this.parentFormGroup, this.parentForm);
  }
  ngAfterContentInit() {
    if (this.selectLabel) {
      this.labelProvided.set(true);
      this._selectService.state.update((state) => __spreadProps(__spreadValues({}, state), {
        labelId: this.selectLabel.id,
        dir: this.dir()
      }));
    } else if (this._placeholder()) {
      this._selectService.state.update((state) => __spreadProps(__spreadValues({}, state), {
        labelId: `${state.id}--label`,
        dir: this.dir()
      }));
    }
  }
  ngDoCheck() {
    this.errorStateTracker.updateErrorState();
  }
  toggle() {
    if (this.isExpanded()) {
      this.close();
    } else {
      this.open();
    }
  }
  open() {
    if (!this._canOpen()) return;
    this._selectService.state.update((state) => __spreadProps(__spreadValues({}, state), {
      isExpanded: true
    }));
    this.openedChange.next(true);
    this._moveFocusToCDKList();
  }
  close() {
    if (!this.isExpanded()) return;
    if (this._selectService.selectTrigger) {
      this._selectService.selectTrigger.focus();
    }
    this.openedChange.next(false);
    this._selectService.state.update((state) => __spreadProps(__spreadValues({}, state), {
      isExpanded: false
    }));
    this._onTouched();
  }
  _canOpen() {
    return !this.isExpanded() && !this._disabled() && this.options()?.length > 0;
  }
  _moveFocusToCDKList() {
    setTimeout(() => this.selectContent.focusList());
  }
  writeValue(value) {
    this.writeValue$.next(value);
  }
  registerOnChange(fn) {
    this._onChange = fn;
  }
  registerOnTouched(fn) {
    this._onTouched = fn;
  }
  setDisabledState(isDisabled) {
    this.disabled = isDisabled;
  }
  /**
   * Once writeValue is called and options are available we can handle setting the initial options
   * @private
   */
  handleInitialOptionSelect() {
    combineLatest([this.writeValue$, this.options$]).pipe(map((values, index) => [...values, index]), takeUntilDestroyed()).subscribe(([value, _, index]) => {
      this._shouldEmitValueChange.set(false);
      this._selectService.setInitialSelectedOptions(value);
      if (index === 0) {
        this.ngControl?.control?.markAsPristine();
      }
    });
  }
  /**
   * When options change, our current selected options may become invalid
   * Here we will automatically update our current selected options so that they are always inline with the possibleOptions
   * @private
   */
  handleOptionChanges() {
    this.optionsAndIndex$.pipe(takeUntilDestroyed()).subscribe(([options, index]) => {
      if (index > 0) {
        this.handleInvalidOptions(options);
      }
      this.updatePossibleOptions(options);
    });
  }
  /**
   * Check that our "selectedOptions" are still valid when "possibleOptions" is about to be updated
   */
  handleInvalidOptions(options) {
    const selectedOptions = this._selectService.selectedOptions();
    const availableOptionSet = new Set(options);
    if (this._selectService.multiple()) {
      const filteredOptions = selectedOptions.filter((o) => availableOptionSet.has(o));
      if (selectedOptions.length !== filteredOptions.length) {
        this._shouldEmitValueChange.set(true);
        const value = filteredOptions.map((o) => o?.value ?? "");
        this._selectService.state.update((state) => __spreadProps(__spreadValues({}, state), {
          selectedOptions: filteredOptions,
          value
        }));
        this._onChange(value ?? null);
      }
    } else {
      const selectedOption = selectedOptions[0] ?? null;
      if (selectedOption !== null && !availableOptionSet.has(selectedOption)) {
        this._shouldEmitValueChange.set(true);
        this._selectService.state.update((state) => __spreadProps(__spreadValues({}, state), {
          selectedOptions: [],
          value: ""
        }));
        this._onChange("");
      }
    }
  }
  /**
   * Sync the updated options with "possibleOptions" in the select service
   */
  updatePossibleOptions(options) {
    this._selectService.state.update((state) => __spreadProps(__spreadValues({}, state), {
      possibleOptions: options
    }));
  }
  static {
    this.ɵfac = function BrnSelectComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BrnSelectComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _BrnSelectComponent,
      selectors: [["brn-select"], ["hlm-select"]],
      contentQueries: function BrnSelectComponent_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          ɵɵcontentQuerySignal(dirIndex, ctx.options, CdkOption, 5);
          ɵɵcontentQuery(dirIndex, BrnLabelDirective, 4);
          ɵɵcontentQuery(dirIndex, BrnSelectContentComponent, 5);
        }
        if (rf & 2) {
          ɵɵqueryAdvance();
          let _t;
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.selectLabel = _t.first);
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.selectContent = _t.first);
        }
      },
      viewQuery: function BrnSelectComponent_Query(rf, ctx) {
        if (rf & 1) {
          ɵɵviewQuery(CdkConnectedOverlay, 5);
        }
        if (rf & 2) {
          let _t;
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._overlayDir = _t.first);
        }
      },
      inputs: {
        multiple: "multiple",
        placeholder: "placeholder",
        disabled: "disabled",
        dir: [1, "dir"],
        closeDelay: [1, "closeDelay"]
      },
      outputs: {
        openedChange: "openedChange"
      },
      standalone: true,
      features: [ɵɵProvidersFeature([BrnSelectService, CdkListbox, provideExposedSideProviderExisting(() => _BrnSelectComponent), provideExposesStateProviderExisting(() => _BrnSelectComponent), {
        provide: BrnFormFieldControl,
        useExisting: _BrnSelectComponent
      }]), ɵɵStandaloneFeature],
      ngContentSelectors: _c4,
      decls: 6,
      vars: 5,
      consts: [["trigger", "cdkOverlayOrigin"], [1, "hidden"], ["cdk-overlay-origin", "", 3, "click"], ["cdk-connected-overlay", "", "cdkConnectedOverlayLockPosition", "", "cdkConnectedOverlayHasBackdrop", "", "cdkConnectedOverlayBackdropClass", "cdk-overlay-transparent-backdrop", 3, "backdropClick", "detach", "positionChange", "cdkConnectedOverlayOrigin", "cdkConnectedOverlayOpen", "cdkConnectedOverlayPositions", "cdkConnectedOverlayWidth"]],
      template: function BrnSelectComponent_Template(rf, ctx) {
        if (rf & 1) {
          const _r1 = ɵɵgetCurrentView();
          ɵɵprojectionDef(_c3);
          ɵɵtemplate(0, BrnSelectComponent_Conditional_0_Template, 2, 2, "label", 1)(1, BrnSelectComponent_Conditional_1_Template, 1, 0);
          ɵɵelementStart(2, "div", 2, 0);
          ɵɵlistener("click", function BrnSelectComponent_Template_div_click_2_listener() {
            ɵɵrestoreView(_r1);
            return ɵɵresetView(ctx.toggle());
          });
          ɵɵprojection(4);
          ɵɵelementEnd();
          ɵɵtemplate(5, BrnSelectComponent_ng_template_5_Template, 1, 0, "ng-template", 3);
          ɵɵlistener("backdropClick", function BrnSelectComponent_Template_ng_template_backdropClick_5_listener() {
            ɵɵrestoreView(_r1);
            return ɵɵresetView(ctx.close());
          })("detach", function BrnSelectComponent_Template_ng_template_detach_5_listener() {
            ɵɵrestoreView(_r1);
            return ɵɵresetView(ctx.close());
          })("positionChange", function BrnSelectComponent_Template_ng_template_positionChange_5_listener($event) {
            ɵɵrestoreView(_r1);
            return ɵɵresetView(ctx._positionChanges$.next($event));
          });
        }
        if (rf & 2) {
          const trigger_r3 = ɵɵreference(3);
          ɵɵconditional(!ctx.labelProvided() && ctx._placeholder() ? 0 : 1);
          ɵɵadvance(5);
          ɵɵproperty("cdkConnectedOverlayOrigin", trigger_r3)("cdkConnectedOverlayOpen", ctx._delayedExpanded())("cdkConnectedOverlayPositions", ctx._positions)("cdkConnectedOverlayWidth", ctx.triggerWidth() > 0 ? ctx.triggerWidth() : "auto");
        }
      },
      dependencies: [OverlayModule, CdkConnectedOverlay, CdkOverlayOrigin, CdkListboxModule],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BrnSelectComponent, [{
    type: Component,
    args: [{
      selector: "brn-select, hlm-select",
      standalone: true,
      imports: [OverlayModule, BrnSelectTriggerDirective, CdkListboxModule],
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [BrnSelectService, CdkListbox, provideExposedSideProviderExisting(() => BrnSelectComponent), provideExposesStateProviderExisting(() => BrnSelectComponent), {
        provide: BrnFormFieldControl,
        useExisting: BrnSelectComponent
      }],
      template: `
		@if (!labelProvided() && _placeholder()) {
			<label class="hidden" [attr.id]="backupLabelId()">{{ _placeholder() }}</label>
		} @else {
			<ng-content select="label[hlmLabel],label[brnLabel]" />
		}

		<div cdk-overlay-origin (click)="toggle()" #trigger="cdkOverlayOrigin">
			<ng-content select="hlm-select-trigger,[brnSelectTrigger]" />
		</div>
		<ng-template
			cdk-connected-overlay
			cdkConnectedOverlayLockPosition
			cdkConnectedOverlayHasBackdrop
			cdkConnectedOverlayBackdropClass="cdk-overlay-transparent-backdrop"
			[cdkConnectedOverlayOrigin]="trigger"
			[cdkConnectedOverlayOpen]="_delayedExpanded()"
			[cdkConnectedOverlayPositions]="_positions"
			[cdkConnectedOverlayWidth]="triggerWidth() > 0 ? triggerWidth() : 'auto'"
			(backdropClick)="close()"
			(detach)="close()"
			(positionChange)="_positionChanges$.next($event)"
		>
			<ng-content />
		</ng-template>
	`
    }]
  }], () => [], {
    multiple: [{
      type: Input,
      args: [{
        alias: "multiple"
      }]
    }],
    placeholder: [{
      type: Input,
      args: [{
        alias: "placeholder"
      }]
    }],
    disabled: [{
      type: Input,
      args: [{
        alias: "disabled"
      }]
    }],
    selectLabel: [{
      type: ContentChild,
      args: [BrnLabelDirective, {
        descendants: false
      }]
    }],
    selectContent: [{
      type: ContentChild,
      args: [BrnSelectContentComponent]
    }],
    _overlayDir: [{
      type: ViewChild,
      args: [CdkConnectedOverlay]
    }],
    openedChange: [{
      type: Output
    }]
  });
})();
var BrnSelectImports = [BrnSelectComponent, BrnSelectContentComponent, BrnSelectTriggerDirective, BrnSelectOptionDirective, BrnSelectValueComponent, BrnSelectScrollDownDirective, BrnSelectScrollUpDirective, BrnSelectGroupDirective, BrnSelectLabelDirective];
var BrnSelectModule = class _BrnSelectModule {
  static {
    this.ɵfac = function BrnSelectModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BrnSelectModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _BrnSelectModule,
      imports: [BrnSelectComponent, BrnSelectContentComponent, BrnSelectTriggerDirective, BrnSelectOptionDirective, BrnSelectValueComponent, BrnSelectScrollDownDirective, BrnSelectScrollUpDirective, BrnSelectGroupDirective, BrnSelectLabelDirective],
      exports: [BrnSelectComponent, BrnSelectContentComponent, BrnSelectTriggerDirective, BrnSelectOptionDirective, BrnSelectValueComponent, BrnSelectScrollDownDirective, BrnSelectScrollUpDirective, BrnSelectGroupDirective, BrnSelectLabelDirective]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({
      imports: [BrnSelectComponent]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BrnSelectModule, [{
    type: NgModule,
    args: [{
      imports: [...BrnSelectImports],
      exports: [...BrnSelectImports]
    }]
  }], null, null);
})();
export {
  BrnSelectComponent,
  BrnSelectContentComponent,
  BrnSelectGroupDirective,
  BrnSelectImports,
  BrnSelectLabelDirective,
  BrnSelectModule,
  BrnSelectOptionDirective,
  BrnSelectScrollDownDirective,
  BrnSelectScrollUpDirective,
  BrnSelectService,
  BrnSelectTriggerDirective,
  BrnSelectValueComponent
};
//# sourceMappingURL=@spartan-ng_ui-select-brain.js.map
