import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpRequest: HttpClient) {}

  apiHost = 'http://ec2-18-221-54-33.us-east-2.compute.amazonaws.com';

  getOAuthToken() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpRequest.post(
      this.apiHost + '/auth/request_token',
      httpOptions
    );
  }

  getAccessToken(request: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpRequest.post(
      this.apiHost + '/auth/access_token',
      request,
      httpOptions
    );
  }

  getUser(request: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpRequest.post(
      this.apiHost + '/auth/signin',
      request,
      httpOptions
    );
  }
}
