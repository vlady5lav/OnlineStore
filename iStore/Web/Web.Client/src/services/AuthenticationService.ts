import 'reflect-metadata';

import { inject, injectable } from 'inversify';

import type { SignInRequest, SignInResponse, SignUpRequest, SignUpResponse } from '../dtos';
import { IoCTypes } from '../ioc';
import type { HttpService } from './HttpService';
import { ContentType, MethodType } from './HttpService';
import type { LocalStorageService } from './LocalStorageService';
import { KeyType } from './LocalStorageService';

export interface AuthenticationService {
  signIn(request: SignInRequest): Promise<SignInResponse>;
  signUp(request: SignUpRequest): Promise<SignUpResponse>;
  signOut(): void;
}

@injectable()
export default class DefaultAuthenticationService implements AuthenticationService {
  @inject(IoCTypes.httpService)
  private readonly httpService!: HttpService;

  @inject(IoCTypes.localStorageService)
  private readonly localStorageService!: LocalStorageService;

  public async signIn(request: SignInRequest): Promise<SignInResponse> {
    const headers = { contentType: ContentType.Json };
    const data = { ...request };
    const result = await this.httpService.send<SignInResponse>('signin', MethodType.POST, headers, data);
    this.localStorageService.setText(KeyType.Token, result.data.accessToken);
    this.localStorageService.setJson(KeyType.User, result.data.user);
    return result.data;
  }

  public async signUp(request: SignUpRequest): Promise<SignUpResponse> {
    const headers = { contentType: ContentType.Json };
    const data = { ...request };
    const result = await this.httpService.send<SignUpResponse>('signup', MethodType.POST, headers, data);
    this.localStorageService.setText(KeyType.Token, result.data.accessToken);
    this.localStorageService.setJson(KeyType.User, result.data.user);
    return result.data;
  }

  public signOut(): void {
    this.localStorageService.remove(KeyType.Token);
    this.localStorageService.remove(KeyType.User);
  }
}
