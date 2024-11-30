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
  selector: 'app-setup-expenses',
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
  templateUrl: './setup-expenses.component.html',
  styleUrl: './setup-expenses.component.scss',
})
export class SetupExpensesComponent {
  fb = inject(FormBuilder);

  form = this.fb.group({
    rows: this.fb.array([]),
  });
}
