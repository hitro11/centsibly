import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BrnSeparatorComponent } from '@spartan-ng/ui-separator-brain';
import { HlmSeparatorDirective } from '@spartan-ng/ui-separator-helm';
import { BudgetSettingsComponent } from './budget-settings/budget-settings.component';
import { SetupAccountContainerComponent } from '../../setup-account-container/setup-account-container.component';
import { BudgetService } from '../../setup-account-container/services/budget/budget.service';
import { UserService } from '../../setup-account-container/services/user.service';
@Component({
    selector: 'app-settings-container',
    standalone: true,
    imports: [
        BrnSeparatorComponent,
        HlmSeparatorDirective,
        BudgetSettingsComponent,
        SetupAccountContainerComponent,
    ],
    templateUrl: './settings-container.component.html',
    styleUrl: './settings-container.component.scss',
})
export class SettingsContainerComponent implements OnInit, OnDestroy {
    accountInfo: any;
    userService = inject(UserService);

    ngOnInit(): void {
        this.userService.getAccountInfo();
    }

    ngOnDestroy(): void {
        throw new Error('Method not implemented.');
    }
}
