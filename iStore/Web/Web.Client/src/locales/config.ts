import { use } from 'i18next';
import { initReactI18next } from 'react-i18next';

import appEn from './en/app.json';
import cartEn from './en/cart.json';
import headerEn from './en/header.json';
import orderEn from './en/order.json';
import productEn from './en/product.json';
import productsEn from './en/products.json';
import profileEn from './en/profile.json';
import signInEn from './en/signIn.json';
import signUpEn from './en/signUp.json';
import appRu from './ru/app.json';
import cartRu from './ru/cart.json';
import headerRu from './ru/header.json';
import orderRu from './ru/order.json';
import productRu from './ru/product.json';
import productsRu from './ru/products.json';
import profileRu from './ru/profile.json';
import signInRu from './ru/signIn.json';
import signUpRu from './ru/signUp.json';

const resources = {
  en: {
    app: appEn,
    cart: cartEn,
    header: headerEn,
    order: orderEn,
    product: productEn,
    products: productsEn,
    profile: profileEn,
    signIn: signInEn,
    signUp: signUpEn,
  },
  ru: {
    app: appRu,
    cart: cartRu,
    header: headerRu,
    order: orderRu,
    product: productRu,
    products: productsRu,
    profile: profileRu,
    signIn: signInRu,
    signUp: signUpRu,
  },
} as const;

void use(initReactI18next).init({
  fallbackLng: 'en',
  ns: ['app', 'cart', 'header', 'order', 'product', 'products', 'profile', 'signIn', 'signUp'],
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  resources,
});

export { default } from 'i18next';
