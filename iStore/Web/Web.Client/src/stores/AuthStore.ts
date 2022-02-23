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

  public getAuthenticationStatus = (): boolean => {
    return this.authenticationService.getAuthenticationStatus();
  };

  public getUser = async (): Promise<void> => {
    const userResponse = await this.authenticationService.getUser();
    this.setUser(userResponse);
  };

  public removeRedirectLocation = (): void => {
    localStorage.removeItem('redirectUri');
  };

  public replaceLocation = (): void => {
    window.location.replace(localStorage.getItem('redirectUri') || '/');
  };

  public saveLocation = (location?: string): void => {
    if (location) {
      localStorage.setItem('redirectUri', location);
    } else if (window.location.pathname !== '/signin' && window.location.pathname !== '/signout') {
      localStorage.setItem('redirectUri', window.location.pathname);
    } else {
      localStorage.setItem('redirectUri', '/');
    }
  };

  public setUser = (user: User | undefined): void => {
    this.user = user;
  };

  public signinRedirect = async (location?: string): Promise<void> => {
    this.saveLocation(location);
    this.authenticationService.stopSilentRenew();
    await this.authenticationService.clearStaleState();
    await this.authenticationService.signinRedirect();
    this.authenticationService.startSilentRenew();
  };

  public signinRedirectCallback = async (): Promise<void> => {
    await this.authenticationService.signinRedirectCallback();
    this.replaceLocation();
    this.removeRedirectLocation();
  };

  public signinSilent = async (): Promise<void> => {
    this.user = await this.authenticationService.signinSilent();
    console.log(`User with ID: ${this.user?.profile.sub} successfully signed in silently!`);
  };

  public signinSilentCallback = async (): Promise<void> => {
    await this.authenticationService.signinSilentCallback();
  };

  public signoutRedirect = async (location?: string): Promise<void> => {
    this.saveLocation(location);
    await this.authenticationService.signoutRedirect();
    await this.authenticationService.clearStaleState();
  };

  public signoutRedirectCallback = async (): Promise<void> => {
    await this.authenticationService.signoutRedirectCallback();
    localStorage.clear();
    this.replaceLocation();
    this.removeRedirectLocation();
  };
}
