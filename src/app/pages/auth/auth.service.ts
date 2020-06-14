import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {AuthService, AuthServiceConfig, GoogleLoginProvider} from "angularx-social-login";
import {AuthoriseUser} from "../../@core/data/users";
import {Observable} from "rxjs";
import {AuthorisedUserResponse, GoogleUserResponse, MicrosoftUserResponse} from "../../@core/data/auth";
import {Config} from "../../../conf";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class
LocalAuthService {

  constructor(
    private http: HttpClient,
    private socialAuth: AuthService,
    private router: Router
  ) { }

  load() {
    return this.http.get(`${Config.apiUrl}auth/`);
  }

  getToken() {
    return sessionStorage.getItem('auth_token');
  }

  promiseToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      let token = sessionStorage.getItem('auth_token');
      if(token) resolve(token);
      else {
        reject('Token not found');
      }
    })
  }

  logout() {
    if (sessionStorage.getItem('user') && sessionStorage.getItem('auth_token')) {
      sessionStorage.clear();
      localStorage.clear();
      this.router.navigate(['/auth'])
    }

    if(sessionStorage.getItem('loggedInBy') === 'social') {
      sessionStorage.clear();
      localStorage.clear();
      this.socialAuth.signOut();
    }

    return this.http.post(`${Config.apiUrl}auth/logout`, {});
  }

  googleAuth() {
      return new Promise((resolve, reject) => {
        this.socialAuth.authState.subscribe(user => {
          resolve(user);
          if (user === null) {
            reject(new Error('User not found'));
          }

        })
      })
  }

  googleOnLoginState() {
    return new Promise((resolve, reject) => {
      this.socialAuth.authState.subscribe(user => {
        resolve(user);
        if (user === null) {
          reject(new Error('User not found'));
        }

      })
    })
  }

  googleLogin(googleUser) {
        return this.http.post<GoogleUserResponse>(`${Config.apiUrl}auth/google/login`, googleUser)
  }

  microsoftLogin(token: string): Observable<AuthorisedUserResponse> {
    return this.http.post<AuthorisedUserResponse>(`${Config.apiUrl}auth/microsoft/login`, {token: token})
  }

  authorise(id: string): Observable<AuthorisedUserResponse> {
    return this.http.post<AuthorisedUserResponse>(`${Config.apiUrl}auth/authorise/${id}`, {});
  }

  deAuthorise(id: string): Observable<AuthorisedUserResponse> {
    return this.http.post<AuthorisedUserResponse>(`${Config.apiUrl}auth/deauthorise/${id}`, {});
  }

}
