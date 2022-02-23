import 'reflect-metadata';
import '../locales/config';

import React, { useEffect } from 'react';

import { LoadingSpinner } from 'components/LoadingSpinner';
import { observer } from 'mobx-react';
import { Outlet } from 'react-router-dom';

import { Box } from '@mui/material';

import { IoCTypes, useInjection } from '../ioc';
import { AuthStore } from '../stores';

const AuthorizedOutlet = observer(() => {
  const authStore = useInjection<AuthStore>(IoCTypes.authStore);

  useEffect(() => {
    const getAuthentication = async (): Promise<void> => {
      await authStore.getUser();

      if (!authStore.user) {
        await authStore.signinRedirect();
      }
    };

    getAuthentication().catch((error) => console.log(error));
  }, [authStore]);

  return authStore.user ? (
    <Outlet />
  ) : (
    <>
      <Box className="absoluteCentered">
        <LoadingSpinner />
      </Box>
    </>
  );
});

export default AuthorizedOutlet;
