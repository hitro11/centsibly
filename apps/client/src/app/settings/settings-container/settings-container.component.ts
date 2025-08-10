import { Component } from '@angular/core';
import { BrnSeparatorComponent } from '@spartan-ng/ui-separator-brain';
import { HlmSeparatorDirective } from '@spartan-ng/ui-separator-helm';
@Component({
    selector: 'app-settings-container',
    standalone: true,
    imports: [BrnSeparatorComponent, HlmSeparatorDirective],
    templateUrl: './settings-container.component.html',
    styleUrl: './settings-container.component.scss',
})
export class SettingsContainerComponent {}
