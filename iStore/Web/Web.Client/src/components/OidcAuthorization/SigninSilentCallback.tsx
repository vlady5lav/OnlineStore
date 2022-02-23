import React, { useEffect } from 'react';

import { Box } from '@mui/material';

import { IoCTypes, useInjection } from '../../ioc';
import { AuthStore } from '../../stores';
import { LoadingSpinner } from '../LoadingSpinner';

const SigninSilentCallback = (): JSX.Element => {
  const authStore = useInjection<AuthStore>(IoCTypes.authStore);

  useEffect(() => {
    const signinSilentCallback = async (): Promise<void> => {
      await authStore.signinSilentCallback();
    };

    signinSilentCallback().catch((error) => console.log(error));
  }, [authStore]);

  return (
    <>
      <Box className="absoluteCentered">
        <LoadingSpinner />
      </Box>
    </>
  );
};

export default SigninSilentCallback;
