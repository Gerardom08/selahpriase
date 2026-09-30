import { Tokens } from './../models/tokens';
import { tap, catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

import Swal from 'sweetalert2';
import { Usuario } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private readonly BTOA = 'client-app:Cli3@pp#Jwt';

  private baseUrl: string = `${environment.apiUrl}/oauth2/token`;
  private _logoutUrl: string = `${environment.apiUrl}/logout`;
  private _redirectUri: string = environment.redirect_uri;

  private loggedUser: string | null = null;

  private _user?: Usuario | null;
  private _token: any;

  constructor(private http: HttpClient) { }

  public get logoutUrl(): string {
    return this._logoutUrl;
  }

  public get user(): Usuario {
    if (this._user != null) {
      return this._user;
    } else if (this._user == null && localStorage.getItem('usuario') != null) {
      const item = localStorage.getItem('usuario');
      if (item) {
        this._user = JSON.parse(item) as Usuario;
        return this._user;
      }
    }
    return new Usuario();
  }

  public get token(): string | null {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && localStorage.getItem(this.JWT_TOKEN) != null) {
      this._token = localStorage.getItem(this.JWT_TOKEN);
      return this._token;
    }
    return null;
  }

  sendAuthCode(code: string): Observable<any> {
    console.log('request session');

    const params = this.getUrlSearchParamsAuthCode(code);
    const headers = this.getHttpHeaders();

    return this.http.post<any>(this.baseUrl, params, headers)
      .pipe(
        tap(tokens => this.doLoginUser(tokens)),
        map(() => true),
        catchError(error => {
          console.log(error);
          if (error.status === 400) {
            Swal.fire(
              'Error inicio de sesion',
              'Codigo de autorizacion invalido.',
              'error'
            );
          }

          if (error.status === 401) {
            if (error.error.error) {
              Swal.fire(
                'Error inicio de sesion',
                error.error.error,
                'error'
              );
            }
          }

          return of(false);
        })
      );
  }

  login(user: Usuario): Observable<any> {
    const params = this.getUrlSearchParamsToken(user.username as string, user.password as string);
    const headers = this.getHttpHeaders();

    return this.http.post<any>(this.baseUrl, params, headers)
      .pipe(
        tap(tokens => this.doLoginUser(tokens)),
        map(() => true),
        catchError(error => {
          // console.log(error);
          if (error.status === 400) {
            Swal.fire(
              'Error inicio de sesion',
              'Usuario y/o Contraseña incorrectos.',
              'error'
            );
          }

          if (error.status === 401) {
            if (error.error.error_description) {
              Swal.fire(
                'Error inicio de sesion',
                error.error.error_description,
                'error'
              );
            }
          }

          return of(false);
        })
      );
  }

  hasRole(role: string): boolean {
    if (this.user.authorities.includes(role)) {
      return true;
    }
    return false;
  }

  hasRoles(roles: string[]): boolean {
    for (const role of roles) {
      if (this.user.authorities.includes(role)) {
        return true;
      }
    }
    return false;
  }

  hasActivityRole(role: string): boolean {
    if (this.user.authorities.includes('ROLE_ADMIN')) {
      return true;
    }

    if (this.user.authorities.includes(role)) {
      console.log(role);
      return true;
    }
    return false;
  }

  logout(): boolean {
    this.doLogoutUser();
    return true;
  }

  isLoggedIn(): boolean {
    return !!this.getJwtToken();
  }

  isAuthenticated(): boolean {
    const payload = this.getTokenData(this.token as string);
    if (payload != null && payload.sub && payload.sub.length > 0) {
      return true;
    }
    return false;
  }

  refreshToken(): Observable<any> {
    const params = this.getUrlSearchParamsRefreshToken();
    const headers = this.getHttpHeaders();

    return this.http.post<any>(this.baseUrl, params, headers).pipe(
      tap((tokens: any) => {
        this.storeUser(tokens);
        this.storeJwtToken(tokens.access_token);
      })
    );
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  getTokenData(accessToken: string): any {
    if (accessToken != null) {
      const jwtArray = accessToken.split('.', 3);
      return JSON.parse(atob(jwtArray[1]));
    }
    return null;
  }

  isRefreshTokenExpired(): boolean {
    const refreshToken = this.getRefreshToken();
    const payload = this.getTokenData(refreshToken as string);
    const now = new Date().getTime() / 1000;

    if (payload.exp < now) {
      return true;
    }
    return false;
  }

  private doLoginUser(tokens: any): void {
    this.storeUser(tokens);
    this.storeTokens(tokens);
  }

  private doLogoutUser(): void {
    this.loggedUser = null;
    this._user = null;
    this._token = null;
    this.removeUser();
    this.removeTokens();
  }

  private getHttpHeaders(): { headers: HttpHeaders; } {
    const code = btoa(this.BTOA);
    const httpHeaders = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      Authorization: 'Basic ' + code
    });
    const headers = { headers: httpHeaders };
    return headers;
  }

  private getUrlSearchParamsRefreshToken(): string {
    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', this.getRefreshToken());
    return params.toString();
  }

  private getUrlSearchParamsToken(username: string, password: string): string {
    const params = new URLSearchParams();
    params.append('grant_type', 'password');
    params.append('username', username);
    params.append('password', password);
    return params.toString();
  }

  private getUrlSearchParamsAuthCode(code: string): string {
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', this._redirectUri);
    return params.toString();
  }

  private getRefreshToken(): string {
    return localStorage.getItem(this.REFRESH_TOKEN) as string;
  }

  private removeUser(): void {
    localStorage.removeItem('usuario');
  }

  private removeTokens(): void {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }

  private storeJwtToken(jwt: string): void {
    this._token = jwt;
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private storeUser(tokens: Tokens): void {
    const payload = this.getTokenData(tokens.access_token as string);
    this._user = new Usuario();
    this._user.idUser = payload.id_user;
    this._user.username = payload.sub;
    this._user.fullName = payload.full_name;
    this._user.authorities = payload.authorities;
    this._user.isSuperUser = payload.super_user;
    this._user.domain.id = payload.domain.current;
    this._user.domain.name = payload.domain.name;
    this._user.domain.principalId = payload.domain.principalId;
    this._user.domain.principalName = payload.domain.principalName;
    // this._user.domain.parent = payload.domain.parent;
    // this._user.domain.code = payload.domain.code;
    this._user.domain.principalId = payload.domain.principalId;
    this._user.daysRemaining = payload.days_remaining;
    this.loggedUser = this.user.username!;

    localStorage.setItem('usuario', JSON.stringify(this._user));
  }

  private storeTokens(tokens: Tokens) {
    this._token = tokens.access_token;
    localStorage.setItem(this.JWT_TOKEN, tokens.access_token as string);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refresh_token as string);
  }
}
