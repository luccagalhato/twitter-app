import { UserRequest } from './../../models/userRequest.model';
import { AuthenticationService } from './../../services/authentication.service';
import { AccessTokenRequest } from './../../models/acessTokenRequest.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss'],
})
export class CallbackComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) {}

  accessTokenRequest = {} as AccessTokenRequest;
  userRequest = {} as UserRequest;
  user = {} as User;

  ngOnInit(): void {
    this.getRouterParameters();
  }

  getRouterParameters() {
    this.activatedRoute.queryParams.subscribe((params) => {
      let oauthToken = params['oauth_token'];
      let oauthVerifier = params['oauth_verifier'];
      this.accessTokenRequest = {
        oauth_token: oauthToken,
        oauth_verifier: oauthVerifier,
      } as AccessTokenRequest;
      this.getAccessToken();
    });
  }

  getAccessToken() {
    this.authenticationService.getAccessToken(this.accessTokenRequest).subscribe(
      (response: any) => {
        this.userRequest = {
          access_token: response.oauth_token,
          access_token_secret: response.oauth_token_secret,
        };
        this.getUser();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getUser() {
    console.log(this.userRequest);
    this.authenticationService.getUser(this.userRequest).subscribe(
      (response: any) => {
        this.user = response;
        console.log(this.user)
        this.router.navigateByUrl('/home');
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
