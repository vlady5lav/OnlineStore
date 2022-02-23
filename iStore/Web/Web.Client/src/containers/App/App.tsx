import 'reflect-metadata';
import '../../locales/config';

import React, { useEffect } from 'react';

import { observer } from 'mobx-react';

import { IoCTypes, useInjection } from '../../ioc';
import { AppRoutes } from '../../routes';
import { AuthStore, CartStore } from '../../stores';

const App = observer(() => {
  const authStore = useInjection<AuthStore>(IoCTypes.authStore);
  const cartStore = useInjection<CartStore>(IoCTypes.cartStore);

  useEffect(() => {
    const getAuthenticationStatus = async (): Promise<void> => {
      await authStore.signinSilent();

      if (!authStore.user) {
        await authStore.getUser();
      }
    };

    getAuthenticationStatus().catch((error) => console.log(error));
  }, [authStore]);

  useEffect(() => {
    const getCart = async (): Promise<void> => {
      await cartStore.getCart();
    };

    getCart().catch((error) => console.log(error));
  }, [authStore.user, cartStore]);

  return (
    <>
      <AppRoutes />
    </>
  );
});

export default App;
