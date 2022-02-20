import 'reflect-metadata';

import { inject, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';

import { IoCTypes } from '../ioc';
import type { AuthenticationService } from '../services/AuthenticationService';

@injectable()
export default class AuthStore {
  @inject(IoCTypes.authenticationService)
  private readonly authenticationService!: AuthenticationService;

  user: unknown | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  public getUser = async (): Promise<void> => {
    const userResponse = await this.authenticationService.getUser();

    this.setUser(userResponse);
  };

  public setUser = (user: unknown): void => {
    this.user = user;
  };
}
