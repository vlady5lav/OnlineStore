import React, { useEffect } from 'react';

import { Box } from '@mui/material';

import { IoCTypes, useInjection } from '../../ioc';
import { AuthenticationService } from '../../services';
import { LoadingSpinner } from '../LoadingSpinner';

export const SigninCallback = () => {
  const authenticationService = useInjection<AuthenticationService>(IoCTypes.authenticationService);

  useEffect(() => {
    void authenticationService.signinRedirectCallback();
  }, [authenticationService]);

  return (
    <>
      <Box className="absoluteCentered">
        <LoadingSpinner />
      </Box>
    </>
  );
};

export default SigninCallback;
