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

      console.log(this.userEmail);
    } catch (error) {
      console.error(error);
    }
  }

  get username() {
    return this.form.get('username');
  }

  async onSubmit() {
    const id = await this.authService.getUserId();
    console.log({ id });

    if (this.form.valid) {
      console.log('Form Submitted:', this.form.value);
      // await firstValueFrom(this.authService.setUserRoleForUser());

      console.log('user role updated');
    } else {
      console.log('Form Invalid');
    }
  }
}
