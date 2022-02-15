import { Container } from 'inversify';

import { IoCTypes } from '.';
import type { AuthenticationHttpService } from '../services/AuthenticationHttpService';
import DefaultAuthenticationHttpService from '../services/AuthenticationHttpService';
import type { AuthenticationService } from '../services/AuthenticationService';
import DefaultAuthenticationService from '../services/AuthenticationService';
import type { CartService } from '../services/CartService';
import DefaultCartService from '../services/CartService';
import type { HttpService } from '../services/HttpService';
import DefaultHttpService from '../services/HttpService';
import type { LocalStorageService } from '../services/LocalStorageService';
import DefaultLocalStorageService from '../services/LocalStorageService';
import type { ProductsService } from '../services/ProductsService';
import DefaultProductsService from '../services/ProductsService';
import { AuthStore, CartStore, ProductsStore, SignInStore, SignUpStore } from '../stores';

const IoCContainer = new Container();

IoCContainer.bind<AuthenticationHttpService>(IoCTypes.authenticationHttpService)
  .to(DefaultAuthenticationHttpService)
  .inSingletonScope();

IoCContainer.bind<AuthenticationService>(IoCTypes.authenticationService)
  .to(DefaultAuthenticationService)
  .inSingletonScope();

IoCContainer.bind<HttpService>(IoCTypes.httpService).to(DefaultHttpService).inSingletonScope();

IoCContainer.bind<LocalStorageService>(IoCTypes.localStorageService).to(DefaultLocalStorageService).inSingletonScope();

IoCContainer.bind<CartService>(IoCTypes.cartService).to(DefaultCartService).inSingletonScope();

IoCContainer.bind<ProductsService>(IoCTypes.productsService).to(DefaultProductsService).inSingletonScope();

IoCContainer.bind<AuthStore>(IoCTypes.authStore).to(AuthStore).inSingletonScope();
IoCContainer.bind<CartStore>(IoCTypes.cartStore).to(CartStore).inSingletonScope();

IoCContainer.bind<ProductsStore>(IoCTypes.productsStore).to(ProductsStore).inTransientScope();
IoCContainer.bind<SignInStore>(IoCTypes.signInStore).to(SignInStore).inTransientScope();
IoCContainer.bind<SignUpStore>(IoCTypes.signUpStore).to(SignUpStore).inTransientScope();

export default IoCContainer;
