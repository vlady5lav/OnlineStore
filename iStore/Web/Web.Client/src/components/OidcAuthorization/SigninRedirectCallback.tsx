import React, { useEffect } from 'react';

import { Box } from '@mui/material';

import { IoCTypes, useInjection } from '../../ioc';
import { AuthStore } from '../../stores';
import { LoadingSpinner } from '../LoadingSpinner';

const SigninRedirectCallback = (): JSX.Element => {
  const authStore = useInjection<AuthStore>(IoCTypes.authStore);

  useEffect(() => {
    const signinRedirectCallback = async (): Promise<void> => {
      await authStore.signinRedirectCallback();
    };

    signinRedirectCallback().catch((error) => console.log(error));
  }, [authStore]);

  return (
    <>
      <Box className="absoluteCentered">
        <LoadingSpinner />
      </Box>
    </>
  );
};

export default SigninRedirectCallback;
