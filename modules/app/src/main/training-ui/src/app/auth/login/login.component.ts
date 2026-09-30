import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { environment } from '../../../environments/environment';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false
})
export class LoginComponent implements OnInit {

  private readonly authorizedUrl = `${environment.apiUrl}/oauth2/authorize?`;

  spinner: boolean = false;
  params: any = {
    client_id: environment.client_id,
    redirect_uri: environment.redirect_uri,
    scope: environment.scope,
    response_type: environment.response_type,
    response_mode: environment.response_mode,
  };

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.logout();
  }

  login(): void {
    this.spinner = true;
    const httpParams = new HttpParams({ fromObject: this.params });
    const codeUrl = this.authorizedUrl + httpParams.toString();
    window.location.href = codeUrl;
  }

}
