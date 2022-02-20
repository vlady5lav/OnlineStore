/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import 'reflect-metadata';

import { injectable } from 'inversify';
import { Log, SigninRequest, UserManager } from 'oidc-client';

import { OidcConfig } from '../utils';

export interface AuthenticationService {
  createSigninRequest: () => {};
  signinRedirect: () => void;
  signinRedirectCallback: () => void;
  signinSilentCallback: () => void;
  isAuthenticated: () => {};
  getUser: () => any;
  signoutRedirect: () => void;
  signoutRedirectCallback: () => void;
}

@injectable()
export default class DefaultAuthenticationService implements AuthenticationService {
  private readonly _userManager;

  constructor() {
    this._userManager = new UserManager(OidcConfig);
    Log.logger = console;
    Log.level = Log.DEBUG;
  }

  createSigninRequest = (): Promise<SigninRequest> => {
    return this._userManager.createSigninRequest();
  };

  signinRedirectCallback = async (): Promise<void> => {
    await this._userManager.signinRedirectCallback().then(() => {
      window.location.replace(localStorage.getItem('redirectUri') || '/');
    });
  };

  getUser = async (): Promise<Oidc.User | null> => {
    return await this._userManager.getUser();
  };

  parseJwt = (token: string): unknown => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  };

  signinRedirect = async (): Promise<void> => {
    localStorage.setItem('redirectUri', window.location.pathname);
    await this._userManager.signinRedirect();
  };

  isAuthenticated = (): boolean => {
    const oidcUser = JSON.parse(
      String(
        sessionStorage.getItem(`oidc.user:${process.env.REACT_APP_IDENTITY_URL}:${process.env.REACT_APP_CLIENT_ID}`)
      )
    );

    return !!oidcUser && !!oidcUser.id_token;
  };

  signinSilent = (): void => {
    this._userManager
      .signinSilent()
      .then((user) => {
        console.log('Signed in', user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  signinSilentCallback = async (): Promise<void> => {
    await this._userManager.signinSilentCallback();
  };

  signoutRedirect = async (): Promise<void> => {
    await this._userManager.signoutRedirect({
      id_token_hint: localStorage.getItem('id_token'),
    });
    await this._userManager.clearStaleState();
  };

  signoutRedirectCallback = async (): Promise<void> => {
    await this._userManager.signoutRedirectCallback().then(async () => {
      localStorage.clear();
      await this._userManager.clearStaleState();
      window.location.replace('/');
    });
  };
}
