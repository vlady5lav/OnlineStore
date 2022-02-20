import 'reflect-metadata';
import '../locales/config';

import React from 'react';

import { observer } from 'mobx-react';
import { Outlet } from 'react-router-dom';

import { Box } from '@mui/material';

import { LoadingSpinner } from '../components/LoadingSpinner';
import { IoCTypes, useInjection } from '../ioc';
import { AuthenticationService } from '../services';

const AuthorizedOutlet = observer(() => {
  const authenticationService = useInjection<AuthenticationService>(IoCTypes.authenticationService);

  if (!authenticationService.isAuthenticated()) {
    void authenticationService.signinRedirect();
    return (
      <>
        <Box className="absoluteCentered">
          <LoadingSpinner />
        </Box>
      </>
    );
  }

  return <Outlet />;
});

export default AuthorizedOutlet;
