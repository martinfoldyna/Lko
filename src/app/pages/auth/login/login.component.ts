import { Component, OnInit } from '@angular/core';
import {LocalAuthService} from '../auth.service';
import {Router} from "@angular/router";
import {NbToastrService} from "@nebular/theme";
import {MsalService} from "@azure/msal-angular";
import {AuthService, AuthServiceConfig, GoogleLoginProvider} from "angularx-social-login";
import {GeneralService} from "../../../@core/utils/general.service";
import {AuthoriseUser, GoogleUser} from "../../../@core/data/users";
import {Config} from "../../../../conf";

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: any;
  errors: string[];
  messages: string[];
  submitted: boolean;
  authenticated: boolean = false;
  fetchingData = false;
  serverRunning = true;

  constructor(
    private toaster: NbToastrService,
    private authService: LocalAuthService,
    private generalService: GeneralService,
    private router: Router,
    private msalService: MsalService,
    private toastr: NbToastrService,
    private socialAuth: AuthService,
  ) {
    this.user = {
      rememberMe: false
    }
  }

  ngOnInit(): void {
    if (localStorage.getItem('rememberUser')) {
      const rememberedUser = localStorage.getItem('rememberUser');
      this.user = rememberedUser;
    }
  }

  rememberUser(user) {
    localStorage.setItem('rememberUser', JSON.stringify(user));
  }

  private storeUser(data, loggedInBy, provider) {
    let user = loggedInBy === "social" ? data : data["user"];

    sessionStorage.setItem('auth_token', provider + ' ' + data["token"]);
    sessionStorage.setItem('user', JSON.stringify(user))
    sessionStorage.setItem('loggedInBy', loggedInBy);
  }
    googleLogin() {
      this.authService.googleLogin().then(user => {
        console.log(user);
        this.toaster.success(user.code.message, 'Vítejte');
        this.storeUser(user.user, 'social', 'google');
        this.router.navigateByUrl('/pages/dashboard');
        this.user = user;
      }).catch(err => {
        // this.toastr.warning(err.error.code.message, 'Upozornění!');
        this.toastr.warning('Během přihlášení došlo k chybě. Zkuste se přihlásit znovu.', 'Upozornění!');
      })
    }

    async microsoftLogin() {
      let result = await this.msalService.loginPopup(Config.microsoft.scopes)
        .catch(reason => {
          this.toaster.danger(JSON.stringify(reason, null, 2), 'Nepodařilo se přihlásit')
        })

      if(result) {

        this.authService.microsoftLogin(result).subscribe((user) => {
          if(user.user) {
            this.user = {
              name: user.user.name,
              email: user.user.email,
              role: user.user.role
            }
            this.toaster.success(user.code.message, 'Vítejte');
            sessionStorage.setItem('auth_token', 'microsoft ' + result);
            sessionStorage.setItem('user', JSON.stringify(this.user));
            sessionStorage.setItem('loggedInBy', 'msal');
            this.router.navigateByUrl('/pages/dashboard');
          } else {
            this.toastr.danger('Během ověřování uživatele se vyskytla chyba, zkuste se prosím přihlásit později.', 'Chyba během ověřování')
          }
        }, err => {
          this.toastr.warning(err.error.code.message, 'Upozornění!');
        })

      }
    }

    load() {
      this.authService.load().subscribe(data => {
        console.log(data);
      })
    }
}
