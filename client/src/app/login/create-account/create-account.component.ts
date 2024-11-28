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
import { AuthenticationService } from '../../auth/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
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
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
  ],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss',
})
export class CreateAccountComponent implements OnInit {
  authService = inject(AuthenticationService);
  fb = inject(FormBuilder);
  router = inject(Router);
  maxUsernameLength = 30;
  minUsernameLength = 3;
  userid = '';
  userEmail = '';

  form = this.fb.group({
    username: [
      '',
      [
        Validators.required,
        Validators.minLength(this.minUsernameLength),
        Validators.maxLength(this.maxUsernameLength),
        Validators.pattern(/^[a-zA-Z0-9._-]+$/), // alphanumeric underscores, hyphen, period
      ],
    ],
  });

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

  get username() {
    return this.form.get('username');
  }

  async onSubmit() {
    try {
      if (this.form.valid) {
        await firstValueFrom(this.authService.setUserRoleForUser());

        await firstValueFrom(
          this.authService.setUsername(this.username?.value as string)
        );

        console.log('username updated');
        this.router.navigateByUrl('/');
      }
    } catch (error) {
      console.error(error);
    }
  }
}
