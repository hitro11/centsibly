import { CURRENCIES } from '../shared/constants';
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
import { AuthenticationService } from '../auth/services/authentication.service';
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
import { SetupIncomeComponent } from './setup-income/setup-income.component';
import { SetupExpensesComponent } from './setup-expenses/setup-expenses.component';

@Component({
  selector: 'app-setup-account',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HlmFormFieldModule,
    HlmButtonDirective,
    HlmCardContentDirective,
    HlmCardDirective,
    HlmCardFooterDirective,
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
  maxIncomeLength = 30;
  userid = '';
  userEmail = '';
  currrentScreen = 1;
  CURRENCIES = CURRENCIES;

  async ngOnInit(): Promise<void> {
    try {
      this.userid = await this.authService.getUserId();
      this.userEmail = (
        await firstValueFrom(this.authService.getUserInfo())
      ).emails[0];
    } catch (error) {
      console.error(error);
    }
  }

  updateScreen(update: 'previous' | 'next') {
    update === 'previous' ? this.currrentScreen-- : this.currrentScreen++;
  }

  async onSubmit() {
    // try {
    //   if (this.incomeForm.valid) {
    //     await firstValueFrom(this.authService.setUserRoleForUser());
    //     console.log('username updated');
    //     this.router.navigateByUrl('/');
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  }
}
