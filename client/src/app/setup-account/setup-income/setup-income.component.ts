import { CommonModule } from '@angular/common';
import {
    Component,
    effect,
    EventEmitter,
    inject,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HlmFormFieldModule } from '@spartan-ng/ui-formfield-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { BrnSelectImports } from '@spartan-ng/ui-select-brain';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';
import { CURRENCIES, REQUIRED_ERROR_MESSAGE } from '../../shared/constants';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

@Component({
    selector: 'app-setup-income',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        CommonModule,
        HlmFormFieldModule,
        HlmInputDirective,
        BrnSelectImports,
        HlmSelectImports,
        HlmButtonDirective,
    ],
    templateUrl: './setup-income.component.html',
    styleUrl: './setup-income.component.scss',
})
export class SetupIncomeComponent {
    @Input() nextButtonClicked!: () => boolean;
    @Output() updateSection = new EventEmitter<'previous' | 'next'>();
    @Output() sendData = new EventEmitter<{
        income: number;
        currency: string;
    }>();

    fb = inject(FormBuilder);
    CURRENCIES = CURRENCIES;
    REQUIRED_ERROR_MESSAGE = REQUIRED_ERROR_MESSAGE;
    maxIncomeLength = 10;

    form = this.fb.group({
        income: [
            null,
            [
                Validators.required,
                Validators.maxLength(this.maxIncomeLength),
                Validators.min(0),
            ],
        ],
        currency: ['USD', [Validators.required]],
    });

    constructor() {}

    updateSectionFn(direction: 'previous' | 'next') {
        if (direction === 'next') {
            this.sendData.emit({
                currency: this.currency?.value ?? '',
                income: Number(this.income?.value) ?? -1,
            });
        }

        this.updateSection.emit(direction);
    }

    get currency() {
        return this.form.get('currency');
    }

    get income() {
        return this.form.get('income');
    }
}
