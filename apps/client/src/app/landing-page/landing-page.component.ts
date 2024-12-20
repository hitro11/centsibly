import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../auth/services/authentication.service';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'app-landing-page',
    standalone: true,
    imports: [],
    templateUrl: './landing-page.component.html',
    styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
    authService = inject(AuthenticationService);
}
