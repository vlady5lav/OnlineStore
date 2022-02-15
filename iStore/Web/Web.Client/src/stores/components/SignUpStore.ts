import { inject, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';

import { CartStore } from '..';
import { IoCTypes } from '../../ioc';
import type AuthenticationService from '../../services/AuthenticationService';
import AuthStore from '../AuthStore';

export enum Gender {
  Undefined,
  Male,
  Female,
}

@injectable()
export default class SignUpStore {
  @inject(IoCTypes.authenticationService)
  private readonly signUpService!: AuthenticationService;

  @inject(IoCTypes.authStore)
  private readonly authStore!: AuthStore;

  @inject(IoCTypes.cartStore)
  private readonly cartStore!: CartStore;

  email = '';

  password = '';

  passwordConfirmation = '';

  firstName = '';

  lastName = '';

  username = '';

  mobile = '';

  age = 18;

  gender = 0;

  isLoading = false;

  error = '';

  token = '';

  id = -1;

  constructor() {
    makeAutoObservable(this);
  }

  public signUp = async () => {
    this.email = '';
    this.password = '';
    this.passwordConfirmation = '';
    this.firstName = '';
    this.lastName = '';
    this.username = '';
    this.mobile = '';
    this.age = 18;
    this.gender = 0;
    this.isLoading = false;
    this.error = '';
    this.token = '';
    this.id = -1;

    try {
      this.isLoading = true;

      if (!this.stringsComparer(this.password, this.passwordConfirmation)) {
        this.error = 'Passwords are not equal!';
        this.isLoading = false;
        return;
      }

      const result = await this.signUpService.signUp({
        email: this.email,
        password: this.password,
        first_name: this.firstName,
        last_name: this.lastName,
        username: this.username,
        mobile: this.mobile,
        age: this.age,
        gender: this.gender,
      });
      this.token = result.accessToken;
      this.id = result.user.id;
      this.authStore.updateAuthorizedState();
      this.cartStore.updateCartState();
    } catch (error) {
      if (error instanceof Error) {
        this.error = error.message;
      }
    }
    this.isLoading = false;
  };

  public changeFirstName = (firstName: string): void => {
    this.firstName = firstName;
  };

  public changeLastName = (lastName: string): void => {
    this.lastName = lastName;
  };

  public changeUsername = (username: string) => {
    this.username = username;
  };

  public changeMobile = (mobile: string) => {
    this.mobile = mobile;
  };

  public changeAge = (age: number) => {
    this.age = age;
  };

  public changeGender = (gender: Gender) => {
    this.gender = gender;
  };

  public changeEmail = (text: string): void => {
    this.email = text;
  };

  public changePassword = (text: string): void => {
    this.password = text;
  };

  public changePasswordConfirmation = (text: string): void => {
    this.passwordConfirmation = text;
  };

  private stringsComparer(first: string, second: string): boolean {
    return first === second ? true : false;
  }
}
