import { Component, inject } from "@angular/core";
import { AuthenticationService } from "../login/services/authentication.service";
import { MatButtonModule } from "@angular/material/button";
import { firstValueFrom } from "rxjs";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {
  authService = inject(AuthenticationService);
}
