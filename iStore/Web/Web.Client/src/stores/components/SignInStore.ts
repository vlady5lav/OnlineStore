import { inject, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';

import { CartStore } from '..';
import { IoCTypes } from '../../ioc';
import type AuthenticationService from '../../services/AuthenticationService';
import AuthStore from '../AuthStore';

@injectable()
export default class SignInStore {
  @inject(IoCTypes.authenticationService)
  private readonly authenticationService!: AuthenticationService;

  @inject(IoCTypes.authStore)
  private readonly authStore!: AuthStore;

  @inject(IoCTypes.cartStore)
  private readonly cartStore!: CartStore;

  email = '';

  password = '';

  isLoading = false;

  error = '';

  token = '';

  constructor() {
    makeAutoObservable(this);
  }

  public signIn = async () => {
    this.token = '';
    this.error = '';

    try {
      this.isLoading = true;
      const result = await this.authenticationService.signIn({ email: this.email, password: this.password });
      this.token = result.accessToken;
      this.authStore.updateAuthorizedState();
      this.cartStore.updateCartState();
      this.cartStore.moveItemsToUser();
    } catch (error) {
      if (error instanceof Error) {
        this.error = error.message;
      }
    }
    this.isLoading = false;
  };

  public changeEmail = (text: string): void => {
    this.email = text;
  };

  public changePassword = (text: string): void => {
    this.password = text;
  };
}
