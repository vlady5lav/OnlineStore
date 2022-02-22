import { use } from 'i18next';
import { initReactI18next } from 'react-i18next';

import appEn from './en/app.json';
import cartEn from './en/cart.json';
import headerEn from './en/header.json';
import productEn from './en/product.json';
import productsEn from './en/products.json';
import profileEn from './en/profile.json';
import appRu from './ru/app.json';
import cartRu from './ru/cart.json';
import headerRu from './ru/header.json';
import productRu from './ru/product.json';
import productsRu from './ru/products.json';
import profileRu from './ru/profile.json';

const resources = {
  en: {
    app: appEn,
    cart: cartEn,
    header: headerEn,
    product: productEn,
    products: productsEn,
    profile: profileEn,
  },
  ru: {
    app: appRu,
    cart: cartRu,
    header: headerRu,
    product: productRu,
    products: productsRu,
    profile: profileRu,
  },
} as const;

use(initReactI18next)
  .init({
    fallbackLng: 'en',
    ns: ['app', 'cart', 'header', 'product', 'products', 'profile'],
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources,
  })
  .catch((error) => console.log(error));

export { default } from 'i18next';
