import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CallbackComponent } from '../callback/callback.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {


  constructor(private authenticationService: AuthenticationService) {}

  _oauthToken = '';

  ngOnInit(): void {}

  authenticateOnTwitter() {
    this.authenticationService.getOAuthToken().subscribe(
      (response: any) => {
        this._oauthToken = response.oauth_token;
        this.redirectTwitterAuth();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  redirectTwitterAuth() {
    document.location.href = 'https://api.twitter.com/oauth/authenticate?oauth_token=' + this._oauthToken;
  }
}
