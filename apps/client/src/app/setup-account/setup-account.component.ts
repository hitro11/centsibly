import { CURRENCIES } from '@centsibly/utils/constants';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HlmFormFieldModule } from '@spartan-ng/ui-formfield-helm';
import { AuthenticationService } from '../auth/services/authentication.service';
import { Router } from '@angular/router';
import { SetupIncomeComponent } from './setup-income/setup-income.component';
import { SetupExpensesComponent } from './setup-expenses/setup-expenses.component';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
    HlmCardContentDirective,
    HlmCardDescriptionDirective,
    HlmCardDirective,
    HlmCardFooterDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';

@Component({
    selector: 'app-setup-account',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        CommonModule,
        HlmFormFieldModule,
        SetupIncomeComponent,
        SetupExpensesComponent,
        HlmButtonDirective,
        HlmCardContentDirective,
        HlmCardDescriptionDirective,
        HlmCardDirective,
        HlmCardFooterDirective,
        HlmCardHeaderDirective,
        HlmCardTitleDirective,
    ],
    templateUrl: './setup-account.component.html',
    styleUrl: './setup-account.component.scss',
})
export class SetupAccountComponent implements OnInit {
    authService = inject(AuthenticationService);
    fb = inject(FormBuilder);
    router = inject(Router);
    maxIncomeLength = 10;
    currentSection = 0;
    CURRENCIES = CURRENCIES;

    async ngOnInit(): Promise<void> {}

    updateSection(direction: 'previous' | 'next'): void {
        direction === 'previous'
            ? this.currentSection--
            : this.currentSection++;
    }

    async onSubmit() {}
}
