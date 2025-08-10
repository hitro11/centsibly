import { Component, input } from '@angular/core';

@Component({
    selector: 'app-settings-section',
    standalone: true,
    imports: [],
    templateUrl: './settings-section.component.html',
    styleUrl: './settings-section.component.scss',
})
export class SettingsSectionComponent {
    title = input<string>();
}
