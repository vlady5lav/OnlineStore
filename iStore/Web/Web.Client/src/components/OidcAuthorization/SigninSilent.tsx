import React, { useEffect } from 'react';

import { Box } from '@mui/material';

import { IoCTypes, useInjection } from '../../ioc';
import { AuthStore } from '../../stores';
import { LoadingSpinner } from '../LoadingSpinner';

const SigninSilent = (): JSX.Element => {
  const authStore = useInjection<AuthStore>(IoCTypes.authStore);

  useEffect(() => {
    const signinSilent = async (): Promise<void> => {
      await authStore.signinSilent();
    };

    signinSilent().catch((error) => console.log(error));
  }, [authStore]);

  return (
    <>
      <Box className="absoluteCentered">
        <LoadingSpinner />
      </Box>
    </>
  );
};

export default SigninSilent;
