import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HlmFormFieldModule } from '@spartan-ng/ui-formfield-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { hlmH2 } from '@spartan-ng/ui-typography-helm';
import {
    HlmCardContentDirective,
    HlmCardDescriptionDirective,
    HlmCardDirective,
    HlmCardFooterDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import {
    HlmMenuComponent,
    HlmMenuGroupComponent,
    HlmMenuItemDirective,
    HlmMenuItemIconDirective,
    HlmMenuItemSubIndicatorComponent,
    HlmMenuLabelComponent,
    HlmMenuSeparatorComponent,
    HlmMenuShortcutComponent,
    HlmSubMenuComponent,
} from '@spartan-ng/ui-menu-helm';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import { BrnSelectImports } from '@spartan-ng/ui-select-brain';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';
import { AuthenticationService } from '../../auth/services/authentication.service';
import { CURRENCIES, REQUIRED_ERROR_MESSAGE } from '../../shared/constants';

@Component({
    selector: 'app-setup-income',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        CommonModule,
        HlmFormFieldModule,
        HlmInputDirective,
        HlmButtonDirective,
        HlmCardContentDirective,
        HlmCardDirective,
        HlmCardFooterDirective,
        HlmCardTitleDirective,
        HlmMenuComponent,
        HlmMenuGroupComponent,
        HlmMenuItemDirective,
        HlmMenuItemIconDirective,
        HlmMenuItemSubIndicatorComponent,
        HlmMenuLabelComponent,
        HlmMenuSeparatorComponent,
        HlmMenuShortcutComponent,
        HlmSubMenuComponent,
        BrnSelectImports,
        HlmSelectImports,
    ],
    templateUrl: './setup-income.component.html',
    styleUrl: './setup-income.component.scss',
})
export class SetupIncomeComponent {
    fb = inject(FormBuilder);
    CURRENCIES = CURRENCIES;
    REQUIRED_ERROR_MESSAGE = REQUIRED_ERROR_MESSAGE;
    maxIncomeLength = 20;

    form = this.fb.group({
        income: [
            '',
            [
                Validators.required,
                Validators.maxLength(this.maxIncomeLength),
                Validators.pattern(/^[0-9]+$/), // numbers only
            ],
        ],
        currency: ['USD', [Validators.required]],
    });

    get currency() {
        return this.form.get('currency');
    }

    get income() {
        return this.form.get('income');
    }
}
