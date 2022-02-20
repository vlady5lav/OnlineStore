import { Container } from 'inversify';

import { IoCTypes } from '.';
import type { AuthenticationService } from '../services/AuthenticationService';
import DefaultAuthenticationService from '../services/AuthenticationService';
import type { CartService } from '../services/CartService';
import DefaultCartService from '../services/CartService';
import type { HttpService } from '../services/HttpService';
import DefaultHttpService from '../services/HttpService';
import type { ProductsService } from '../services/ProductsService';
import DefaultProductsService from '../services/ProductsService';
import { AuthStore, CartStore, ProductsStore } from '../stores';

const IoCContainer = new Container();

IoCContainer.bind<AuthenticationService>(IoCTypes.authenticationService)
  .to(DefaultAuthenticationService)
  .inSingletonScope();

IoCContainer.bind<HttpService>(IoCTypes.httpService).to(DefaultHttpService).inSingletonScope();

IoCContainer.bind<CartService>(IoCTypes.cartService).to(DefaultCartService).inSingletonScope();

IoCContainer.bind<ProductsService>(IoCTypes.productsService).to(DefaultProductsService).inSingletonScope();

IoCContainer.bind<AuthStore>(IoCTypes.authStore).to(AuthStore).inSingletonScope();
IoCContainer.bind<CartStore>(IoCTypes.cartStore).to(CartStore).inSingletonScope();

IoCContainer.bind<ProductsStore>(IoCTypes.productsStore).to(ProductsStore).inTransientScope();

export default IoCContainer;
