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
import {
    CURRENCIES,
    MAX_NUMBER_VALUE,
    REQUIRED_ERROR_MESSAGE,
} from '../../shared/constants';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { SetupAccountService } from '../services/setup-account.service';

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
    setupAccountService = inject(SetupAccountService);
    CURRENCIES = CURRENCIES;
    REQUIRED_ERROR_MESSAGE = REQUIRED_ERROR_MESSAGE;

    form = this.fb.group({
        income: [
            null,
            [
                Validators.required,
                Validators.maxLength(MAX_NUMBER_VALUE),
                Validators.min(0),
            ],
        ],
        currency: ['USD', [Validators.required]],
    });

    constructor() {}

    updateSectionFn(direction: 'previous' | 'next') {
        if (direction === 'next') {
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
