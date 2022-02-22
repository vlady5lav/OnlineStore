import 'reflect-metadata';
import '../locales/config';

import React from 'react';

import { observer } from 'mobx-react';
import { Outlet } from 'react-router-dom';

import { Box } from '@mui/material';

import { LoadingSpinner } from '../components/LoadingSpinner';
import { IoCTypes, useInjection } from '../ioc';
import { AuthStore } from '../stores';

const AuthorizedOutlet = observer(() => {
  const authStore = useInjection<AuthStore>(IoCTypes.authStore);

  if (!authStore.user) {
    authStore.signinRedirect();

    return (
      <>
        <Box className="absoluteCentered">
          <LoadingSpinner />
        </Box>
      </>
    );
  } else {
    return <Outlet />;
  }
});

export default AuthorizedOutlet;
