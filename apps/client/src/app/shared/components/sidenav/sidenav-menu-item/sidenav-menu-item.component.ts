import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-sidenav-menu-item',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './sidenav-menu-item.component.html',
    styleUrl: './sidenav-menu-item.component.scss',
})
export class SidenavMenuItemComponent {
    @Input() route = '';
    @Input() icon = '';
    @Input() title = '';

    router = inject(Router);

    clicker() {
        console.log(this.router.url);
    }
}
