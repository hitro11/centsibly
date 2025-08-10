import { Component, forwardRef, input, Input } from '@angular/core';
import { BaseFormcontrolComponent } from '../base-formcontrol/base-formcontrol.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-text-input',
    templateUrl: './text-input-formcontrol.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TextInputComponent),
            multi: true,
        },
    ],
})
export class TextInputComponent extends BaseFormcontrolComponent {
    type = input<'text' | 'email' | 'password'>('text');
}
