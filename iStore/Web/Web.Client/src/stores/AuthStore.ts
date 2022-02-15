import 'reflect-metadata';

import { inject, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';

import { IoCTypes } from '../ioc';
import { User } from '../models';
import type { AuthenticationService } from '../services/AuthenticationService';
import LocalStorageService, { KeyType } from '../services/LocalStorageService';

@injectable()
export default class AuthStore {
  @inject(IoCTypes.localStorageService)
  private readonly localStorageService!: LocalStorageService;

  @inject(IoCTypes.authenticationService)
  private readonly authenticationService!: AuthenticationService;

  isAuthorized = false;

  user: User | null = null;

  userId = Number(-1);

  constructor() {
    makeAutoObservable(this);
  }

  public updateAuthorizedState = (): void => {
    this.isAuthorized = !!this.localStorageService.getText(KeyType.Token);
    this.user = this.localStorageService.getJson<User>(KeyType.User);
    this.userId = this.user?.id ?? Number(-1);
  };

  public signOut = (): void => {
    this.authenticationService.signOut();
    this.updateAuthorizedState();
  };
}
