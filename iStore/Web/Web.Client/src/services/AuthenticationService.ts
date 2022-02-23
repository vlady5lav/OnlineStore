import 'reflect-metadata';

import { injectable } from 'inversify';
import { Log, SigninRequest, SignoutRequest, SignoutResponse, User, UserManager } from 'oidc-client';

import { OidcConfig } from '../utils';

export interface AuthenticationService {
  clearStaleState: () => Promise<void>;
  createSigninRequest: () => Promise<SigninRequest>;
  createSignoutRequest: () => Promise<SignoutRequest>;
  getAuthenticationStatus: () => boolean;
  getUser: () => Promise<User | undefined>;
  parseJwt: (token: string) => unknown;
  signinPopup: () => Promise<User | undefined>;
  signinPopupCallback: () => Promise<User | undefined>;
  signinRedirect: () => Promise<void>;
  signinRedirectCallback: () => Promise<User | undefined>;
  signinSilent: () => Promise<User | undefined>;
  signinSilentCallback: () => Promise<User | undefined>;
  signoutPopup: () => Promise<void>;
  signoutPopupCallback: () => Promise<void>;
  signoutRedirect: () => Promise<void>;
  signoutRedirectCallback: () => Promise<SignoutResponse>;
  startSilentRenew: () => void;
  stopSilentRenew: () => void;
}

@injectable()
export default class DefaultAuthenticationService implements AuthenticationService {
  private readonly userManager: UserManager;

  constructor() {
    this.userManager = new UserManager(OidcConfig);
    Log.logger = console;
    Log.level = Log.WARN;
  }

  public clearStaleState = async (): Promise<void> => {
    await this.userManager.clearStaleState().catch((error) => {
      console.log(error);
    });
  };

  public createSigninRequest = (): Promise<SigninRequest> => {
    return this.userManager.createSigninRequest();
  };

  public createSignoutRequest = (): Promise<SignoutRequest> => {
    return this.userManager.createSignoutRequest();
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

  public getUser = async (): Promise<User | undefined> => {
    return (await this.userManager.getUser()) ?? undefined;
  };

  public parseJwt = (token: string): unknown => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');

    return JSON.parse(window.atob(base64));
  };

  public signinPopup = async (): Promise<User | undefined> => {
    return (await this.userManager.signinPopup()) ?? undefined;
  };

  public signinPopupCallback = async (): Promise<User | undefined> => {
    return (await this.userManager.signinPopupCallback()) ?? undefined;
  };

  public signinRedirect = async (): Promise<void> => {
    await this.userManager.signinRedirect().catch((error) => {
      console.log(error);
    });
  };

  public signinRedirectCallback = async (): Promise<User | undefined> => {
    return (await this.userManager.signinRedirectCallback()) ?? undefined;
  };

  public signinSilent = async (): Promise<User | undefined> => {
    return (await this.userManager.signinSilent()) ?? undefined;
  };

  public signinSilentCallback = async (): Promise<User | undefined> => {
    return (await this.userManager.signinSilentCallback()) ?? undefined;
  };

  public signoutPopup = async (): Promise<void> => {
    await this.userManager.signoutPopup().catch((error) => {
      console.log(error);
    });
  };

  public signoutPopupCallback = async (): Promise<void> => {
    await this.userManager.signoutPopupCallback().catch((error) => {
      console.log(error);
    });
  };

  public signoutRedirect = async (): Promise<void> => {
    await this.userManager
      .signoutRedirect({
        id_token_hint: localStorage.getItem('id_token'),
      })
      .catch((error) => {
        console.log(error);
      });
  };

  public signoutRedirectCallback = async (): Promise<SignoutResponse> => {
    return await this.userManager.signoutRedirectCallback();
  };

  public startSilentRenew = (): void => {
    this.userManager.startSilentRenew();
  };

  public stopSilentRenew = (): void => {
    this.userManager.stopSilentRenew();
  };
}
