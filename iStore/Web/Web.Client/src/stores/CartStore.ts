import { inject, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';

import { AuthStore } from '.';
import { CartDto } from '../dtos';
import { IoCTypes } from '../ioc';
import { Cart, CartItem, Product } from '../models';
import type { CartService } from '../services';

@injectable()
export default class CartStore {
  @inject(IoCTypes.authStore)
  private readonly authStore!: AuthStore;

  @inject(IoCTypes.cartService)
  private readonly cartService!: CartService;

  cartDto: CartDto = { data: '' };
  cart: Cart = { items: [], totalCount: 0, totalPrice: 0 };
  cartItems: CartItem[] = [];
  error: string = '';
  isLoading: boolean = true;

  constructor() {
    this.cartDto = { data: '' };
    this.cart = { items: [], totalCount: 0, totalPrice: 0 };
    this.cartItems = this.cart.items;
    makeAutoObservable(this);
  }

  public getCount = (product: Product): number => {
    try {
      if (this.authStore.user) {
        const index = this.cartItems.findIndex((ci) => ci.id === product.id);
        return index >= 0 ? this.cartItems[index].count : 0;
      }
    } catch (error) {
      console.error(error);
    }

    return 0;
  };

  public addItem = async (product: Product): Promise<void> => {
    if (!this.authStore.user) {
      await this.authStore.signinRedirect();
      return;
    }
    try {
      const index = this.cartItems.findIndex((ci) => ci.id === product.id);
      if (index >= 0) {
        this.cartItems[index].count += 1;
      } else {
        this.cartItems.push({
          count: 1,
          id: product.id,
          picture: product.pictureUrl,
          price: product.price,
          name: product.name,
          totalPrice: product.price,
        });
      }
      this.cart.items = this.cartItems;
      this.cart.totalCount += 1;
      this.cart.totalPrice += product.price;
      await this.updateCart();
    } catch (error) {
      console.error(error);
    }
  };

  public removeItem = async (product: Product): Promise<void> => {
    try {
      const index = this.cartItems.findIndex((ci) => ci.id === product.id);
      if (index >= 0) {
        if (this.cartItems[index].count > 1) {
          this.cartItems[index].count -= 1;
        } else {
          this.cartItems.splice(index, 1);
        }
        this.cart.items = this.cartItems;
        this.cart.totalCount -= 1;
        this.cart.totalPrice -= product.price;
        await this.updateCart();
      } else {
        console.log('There is no such item in your cart to remove!');
      }
    } catch (error) {
      console.error(error);
    }
  };

  public getCart = async (): Promise<void> => {
    if (!this.authStore.user) {
      await this.authStore.getUser();
    }
    try {
      if (this.authStore.user) {
        this.cartService.getAuthorizationHeaders();
        const response = await this.cartService.getCart();
        this.cartDto = response.data;
        if (this.cartDto.data) {
          this.cart = JSON.parse(this.cartDto.data);
          this.cartItems = this.cart.items;
        }
      } else {
        this.cart = { items: [], totalCount: 0, totalPrice: 0 };
        this.cartItems = this.cart.items;
      }
    } catch (error) {
      console.error(error);
    }
    this.cartDto = { data: '' };
  };

  public updateCart = async (): Promise<void> => {
    if (!this.authStore.user) {
      await this.authStore.getUser();
    }
    try {
      this.cart.items = this.cartItems;
      const cartString = JSON.stringify(this.cart);
      this.cartDto.data = cartString;
      await this.cartService.updateCart(this.cartDto);
    } catch (error) {
      console.error(error);
    }
    this.cartDto = { data: '' };
  };

  public deleteCart = async (): Promise<void> => {
    if (!this.authStore.user) {
      await this.authStore.getUser();
    }
    try {
      await this.cartService.deleteCart();
      this.cart = { items: [], totalCount: 0, totalPrice: 0 };
      this.cartItems = [];
      this.cartDto = { data: '' };
    } catch (error) {
      console.error(error);
    }
  };
}
