import { CURRENCIES } from '../shared/constants';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HlmFormFieldModule } from '@spartan-ng/ui-formfield-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
    HlmCardContentDirective,
    HlmCardDirective,
    HlmCardFooterDirective,
    HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { firstValueFrom } from 'rxjs';
import { AuthenticationService } from '../auth/services/authentication.service';
import { Router } from '@angular/router';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import { BrnSelectImports } from '@spartan-ng/ui-select-brain';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';
import { SetupIncomeComponent } from './setup-income/setup-income.component';
import { SetupExpensesComponent } from './setup-expenses/setup-expenses.component';

@Component({
    selector: 'app-setup-account',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        CommonModule,
        HlmFormFieldModule,
        HlmCardContentDirective,
        HlmCardDirective,
        HlmCardTitleDirective,
        SetupIncomeComponent,
        SetupExpensesComponent,
    ],
    templateUrl: './setup-account.component.html',
    styleUrl: './setup-account.component.scss',
})
export class SetupAccountComponent implements OnInit {
    authService = inject(AuthenticationService);
    fb = inject(FormBuilder);
    router = inject(Router);
    maxIncomeLength = 10;
    currentSection = 2;
    CURRENCIES = CURRENCIES;

    async ngOnInit(): Promise<void> {}

    updateSection(direction: 'previous' | 'next'): void {
        direction === 'previous'
            ? this.currentSection--
            : this.currentSection++;
    }

    async onSubmit() {}
}
