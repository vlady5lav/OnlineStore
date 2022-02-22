import React, { useEffect } from 'react';

import { Box } from '@mui/material';

import { IoCTypes, useInjection } from '../../ioc';
import { AuthStore } from '../../stores';
import { LoadingSpinner } from '../LoadingSpinner';

export const SigninCallback = (): JSX.Element => {
  const authStore = useInjection<AuthStore>(IoCTypes.authStore);

  useEffect(() => {
    authStore.signinRedirectCallback();
  }, [authStore]);

  return (
    <>
      <Box className="absoluteCentered">
        <LoadingSpinner />
      </Box>
    </>
  );
};

export default SigninCallback;
