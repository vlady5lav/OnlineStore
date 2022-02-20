import { inject, injectable } from 'inversify';
import { HttpService } from 'services';

import { IoCTypes } from '../ioc';
import { ApiResponse, MethodType } from './HttpService';

export interface CartService {
  getCart(): Promise<unknown>;
  updateCart(data: string): void;
}

@injectable()
export default class DefaultCartService implements CartService {
  @inject(IoCTypes.httpService)
  private readonly httpService!: HttpService;

  private readonly basketUrl = `${process.env.REACT_APP_BASKET_URL}`;

  public async getCart(): Promise<ApiResponse<unknown>> {
    return await this.httpService.sendAsync<unknown>(`${this.basketUrl}/get`, MethodType.POST);
  }

  public async updateCart(data: string): Promise<void> {
    await this.httpService.sendAsync<unknown>(`${this.basketUrl}/update`, MethodType.POST, undefined, data);
  }
}
