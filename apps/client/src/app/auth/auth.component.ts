import {
    Component,
    OnDestroy,
    AfterViewInit,
    Renderer2,
    Inject,
    inject,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ThemeService } from '../shared/services/theme.service';
import { environment } from '../../../environments/environment';
import { UserService } from '../setup-account/services/user.service';

@Component({
    selector: 'app-auth',
    imports: [],
    standalone: true,
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnDestroy, AfterViewInit {
    themeService = inject(ThemeService);
    userService = inject(UserService);
    errorMessage = '';

    constructor(
        private renderer: Renderer2,
        @Inject(DOCUMENT) private document: Document
    ) {}

    ngAfterViewInit() {
        this.loadScript(
            'https://cdn.jsdelivr.net/gh/supertokens/prebuiltui@v0.48.0/build/static/js/main.81589a39.js'
        );
    }

    ngOnDestroy() {
        const script = this.document.getElementById('supertokens-script');
        if (script) {
            script.remove();
        }
    }

    private loadScript(src: string) {
        const script = this.renderer.createElement('script');
        script.type = 'text/javascript';
        script.src = src;
        script.id = 'supertokens-script';

        script.onload = () => {
            (window as any).supertokensUIInit('supertokensui', {
                appInfo: {
                    appName: 'Grove',
                    apiDomain: environment.SERVER_URL,
                    websiteDomain: environment.HOST,
                    apiBasePath: '/auth',
                    websiteBasePath: '/auth',
                },
                getRedirectionURL: async (context: any) => {
                    if (
                        context.action === 'SUCCESS' &&
                        context.newSessionCreated
                    ) {
                        const doesAccountExist =
                            await this.userService.doesAccountExist();

                        if (!doesAccountExist) {
                            return '/create-account';
                        }
                        return context.redirectToPath ?? '/dashboard';
                    }
                    return undefined;
                },
                recipeList: [
                    (window as any).supertokensUIEmailVerification.init({
                        mode: 'REQUIRED',
                    }),
                    (window as any).supertokensUIEmailPassword.init({}),
                    (window as any).supertokensUIThirdParty.init({
                        signInAndUpFeature: {
                            providers: [
                                (
                                    window as any
                                ).supertokensUIThirdParty.Google.init(),
                            ],
                        },
                    }),
                    (window as any).supertokensUISession.init(),
                ],

                style:
                    this.themeService.getTheme()() === 'dark'
                        ? `
        [data-supertokens~=container] {
          --palette-background: 25, 25, 25;
          --palette-inputBackground: 20, 20, 20;
          --palette-inputBorder: 41, 41, 41;
          --palette-textTitle: 200, 200, 200;
          --palette-textLabel: 200, 200, 200;
          --palette-textPrimary: 200, 200, 200;
          --palette-textGray: 200, 200, 200;
          --palette-error: 173, 46, 46;
          --palette-textInput: 169, 169, 169;
          --palette-textLink: 169, 169, 169;
        }
        [data-supertokens~="button"] {
          background-color: #19251b;
          color: rgb(200, 200, 200);
          border: 1px solid lightgrey;
        }
        [data-supertokens~="button"][data-supertokens~="providerButton"],
        [data-supertokens~="superTokensBranding"] {
          background-color: rgb(40, 40, 40);
          color: rgb(169, 169, 169);
        }
        `
                        : '',
            });
        };
        this.renderer.appendChild(this.document.body, script);
    }
}
