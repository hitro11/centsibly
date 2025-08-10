import { Component, forwardRef, input } from '@angular/core';
import {
    ControlValueAccessor,
    FormControl,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    Validator,
} from '@angular/forms';

@Component({
    selector: 'app-base-formcontrol',
    standalone: true,
    imports: [],
    template: '',
    styleUrl: './base-formcontrol.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => BaseFormcontrolComponent),
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => BaseFormcontrolComponent),
            multi: true,
        },
    ],
})
export class BaseFormcontrolComponent
    implements ControlValueAccessor, Validator
{
    label = input<string>();
    placeholder = input<string>('');
    errorMessage? = input<string>('');
    required = input<boolean>(false);
    disabled = false;

    protected _value: any;
    protected _onChange: onChangeFn<any> = () => {};
    protected _onTouched: onTouchFn = () => {};

    get value(): any {
        return this._value;
    }

    set value(val: any) {
        if (val !== this._value) {
            this._value = val;
            this._onChange(val);
        }
    }

    // ----- ControlValueAccessor methods -----
    writeValue(value: any): void {
        if (value !== this._value) {
            this._value = value;
        }
    }
    registerOnChange(fn: onChangeFn<any>): void {
        console.log('registerOnChange');
        this._onChange = fn;
    }
    registerOnTouched(fn: onTouchFn): void {
        console.log('registerOnTouched');
        this._onTouched = fn;
    }
    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    // Common methods for child components
    protected onBlur() {
        this._onTouched();
    }

    protected onInput(event: Event): void {
        const target = event.target as HTMLInputElement;
        this.value = target.value;
    }

    validate(control: FormControl) {
        return null;
    }
}

// types
type onChangeFn<T> = (value: T) => void;
type onTouchFn = () => void;
