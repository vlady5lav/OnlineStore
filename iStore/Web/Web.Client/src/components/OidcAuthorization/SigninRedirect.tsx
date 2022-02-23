import React, { useEffect } from 'react';

import { Box } from '@mui/material';

import { IoCTypes, useInjection } from '../../ioc';
import { AuthStore } from '../../stores';
import { LoadingSpinner } from '../LoadingSpinner';

const SigninRedirect = (): JSX.Element => {
  const authStore = useInjection<AuthStore>(IoCTypes.authStore);

  useEffect(() => {
    const signinRedirect = async (): Promise<void> => {
      await authStore.signinRedirect();
    };

    signinRedirect().catch((error) => console.log(error));
  }, [authStore, authStore.user]);

  return (
    <>
      <Box className="absoluteCentered">
        <LoadingSpinner />
      </Box>
    </>
  );
};

export default SigninRedirect;
