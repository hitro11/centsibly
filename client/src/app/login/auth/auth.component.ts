import {
  Component,
  OnDestroy,
  AfterViewInit,
  Renderer2,
  Inject,
  inject,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ThemeService } from '../../shared/services/theme.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-auth',
  template: '<div id="supertokensui"></div>',
})
export class AuthComponent implements OnDestroy, AfterViewInit {
  themeService = inject(ThemeService);

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
    // Remove the script when the component is destroyed
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
        style:
          this.themeService.getTheme()() === 'dark-theme'
            ? `
        [data-supertokens~=container] {
          --palette-background: 40, 40, 40;
          --palette-inputBackground: 21, 21, 21;
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
          background-color: #2b4226;
        }
        [data-supertokens~="button"][data-supertokens~="providerButton"],
        [data-supertokens~="superTokensBranding"] {
          background-color: rgb(11, 11, 11);
          color: white;
        }
        `
            : '',
        recipeList: [
          (window as any).supertokensUIEmailPassword.init(),
          (window as any).supertokensUIThirdParty.init({
            signInAndUpFeature: {
              providers: [
                (window as any).supertokensUIThirdParty.Github.init(),
                (window as any).supertokensUIThirdParty.Google.init(),
              ],
            },
          }),
          (window as any).supertokensUISession.init(),
        ],
      });
    };
    this.renderer.appendChild(this.document.body, script);
  }
}
