import 'reflect-metadata';
import './App.css';
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
    const getUser = async () => {
      await authStore.getUser();
      if (authStore.user) {
        console.log(authStore.user);
      }
    };
    void getUser();
  }, [authStore, authStore.user, cartStore]);

  return (
    <>
      <AppRoutes />
    </>
  );
});

export default App;
