import 'reflect-metadata';

import { injectable } from 'inversify';
import { Log, SigninRequest, User, UserManager } from 'oidc-client';

import { OidcConfig } from '../utils';

export interface AuthenticationService {
  createSigninRequest: () => Promise<SigninRequest>;
  getUser: () => Promise<User | undefined>;
  parseJwt: (token: string) => unknown;
  signinRedirect: () => void;
  signinRedirectCallback: () => void;
  signinSilent: () => void;
  signinSilentCallback: () => void;
  signoutRedirect: () => void;
  signoutRedirectCallback: () => void;
}

@injectable()
export default class DefaultAuthenticationService implements AuthenticationService {
  private readonly userManager: UserManager;

  constructor() {
    this.userManager = new UserManager(OidcConfig);
    Log.logger = console;
    Log.level = Log.WARN;
  }

  createSigninRequest = (): Promise<SigninRequest> => {
    return this.userManager.createSigninRequest();
  };

  getUser = async (): Promise<User | undefined> => {
    return (await this.userManager.getUser()) ?? undefined;
  };

  parseJwt = (token: string): unknown => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');

    return JSON.parse(window.atob(base64));
  };

  signinRedirect = async (): Promise<void> => {
    await this.userManager.signinRedirect();
  };

  signinRedirectCallback = async (): Promise<void> => {
    await this.userManager.signinRedirectCallback().then(() => {
      window.location.replace(localStorage.getItem('redirectUri') || '/');
    });
  };

  signinSilent = (): void => {
    this.userManager
      .signinSilent()
      .then((user) => {
        console.log(`User with ID: ${user.id_token} successfully silently signed in `);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  signinSilentCallback = async (): Promise<void> => {
    await this.userManager.signinSilentCallback();
  };

  signoutRedirect = async (): Promise<void> => {
    await this.userManager.signoutRedirect({
      id_token_hint: localStorage.getItem('id_token'),
    });
    await this.userManager.clearStaleState();
  };

  signoutRedirectCallback = async (): Promise<void> => {
    await this.userManager.signoutRedirectCallback().then(async (): Promise<void> => {
      localStorage.clear();
      await this.userManager.clearStaleState();
      window.location.replace(localStorage.getItem('redirectUri') || '/');
    });
  };
}
