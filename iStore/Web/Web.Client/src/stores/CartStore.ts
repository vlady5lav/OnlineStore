import { inject, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';

import { AuthStore } from '.';
import { IoCTypes } from '../ioc';
import { Cart, CartProduct, Product } from '../models';
import type { CartService, ProductsService } from '../services';

@injectable()
export default class CartStore {
  @inject(IoCTypes.authStore)
  private readonly authStore!: AuthStore;

  @inject(IoCTypes.cartService)
  private readonly cartService!: CartService;

  @inject(IoCTypes.productsService)
  private readonly productService!: ProductsService;

  cart: Cart | undefined = undefined;

  cartProducts: CartProduct[] = [];

  carts: Cart[] = [];

  cartsIndex = Number(-1);

  error = '';

  userId = Number(-1);

  isLoading = true;

  productsCart: { product: Product; count: number }[] = [];

  constructor() {
    makeAutoObservable(this);
  }
}
