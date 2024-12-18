import { CommonModule } from '@angular/common';
import {
    Component,
    effect,
    EventEmitter,
    inject,
    Input,
    output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HlmFormFieldModule } from '@spartan-ng/ui-formfield-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { BrnSelectImports } from '@spartan-ng/ui-select-brain';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';
import {
    AMOUNT_REGEX,
    CURRENCIES,
    REQUIRED_ERROR_MESSAGE,
} from '../../shared/constants';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { UserService } from '../services/user.service';
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';
import { lucideDollarSign } from '@ng-icons/lucide';
import { MAX_NUMBER_VALUE } from 'utils/constants';
import { Currency } from 'utils/schemas/schemas';

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
        HlmIconComponent,
    ],
    providers: [provideIcons({ lucideDollarSign })],
    templateUrl: './setup-income.component.html',
    styleUrl: './setup-income.component.scss',
})
export class SetupIncomeComponent {
    @Input() nextButtonClicked!: () => boolean;
    updateSection = output<'previous' | 'next'>();

    fb = inject(FormBuilder);
    setupAccountService = inject(UserService);
    CURRENCIES = CURRENCIES;
    REQUIRED_ERROR_MESSAGE = REQUIRED_ERROR_MESSAGE;

    form = this.fb.group({
        currency: [
            this.setupAccountService.accountInfo.currency,
            [Validators.required],
        ],
        income: [
            this.setupAccountService.accountInfo.income,
            [
                Validators.required,
                Validators.max(MAX_NUMBER_VALUE),
                Validators.min(1),
                Validators.pattern(AMOUNT_REGEX),
            ],
        ],
    });

    constructor() {}

    updateSectionFn(direction: 'previous' | 'next') {
        if (this.form.valid) {
            this.setupAccountService.accountInfo.currency = (this.currency
                ?.value ?? 'CAD') as Currency;

            this.setupAccountService.accountInfo.income =
                this.income?.value ?? undefined;
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
