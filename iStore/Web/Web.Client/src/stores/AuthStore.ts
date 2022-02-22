import 'reflect-metadata';

import { inject, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';
import { User } from 'oidc-client';

import { IoCTypes } from '../ioc';
import type { AuthenticationService } from '../services/AuthenticationService';

@injectable()
export default class AuthStore {
  @inject(IoCTypes.authenticationService)
  private readonly authenticationService!: AuthenticationService;

  user: User | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  public getUser = async (): Promise<void> => {
    const userResponse = await this.authenticationService.getUser();
    this.setUser(userResponse);
  };

  public saveCurrentLocation = (): void => {
    localStorage.setItem('redirectUri', window.location.pathname);
  };

  public setUser = (user: User | undefined): void => {
    this.user = user;
  };

  public signinRedirect = async (): Promise<void> => {
    await this.authenticationService.signinRedirect();
  };

  public signinRedirectCallback = (): void => {
    this.authenticationService.signinRedirectCallback();
  };

  public signinSilent = (): void => {
    this.authenticationService.signinSilent();
  };

  public signinSilentCallback = (): void => {
    this.authenticationService.signinSilentCallback();
  };

  public signoutRedirect = (): void => {
    this.authenticationService.signoutRedirect();
  };

  public signoutRedirectCallback = (): void => {
    this.authenticationService.signoutRedirectCallback();
  };

  public getAuthenticationStatus = (): boolean => {
    const oidcUser = JSON.parse(
      String(
        sessionStorage.getItem(
          `oidc.user:${process.env.REACT_APP_AUTH_URL}:${process.env.REACT_APP_IDENTITY_CLIENT_ID}`
        )
      )
    );

    return !!oidcUser && !!oidcUser.id_token;
  };
}
