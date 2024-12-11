import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../auth/services/authentication.service';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent {
    authService = inject(AuthenticationService);
}
