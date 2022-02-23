import React, { useEffect } from 'react';

import { Box } from '@mui/material';

import { IoCTypes, useInjection } from '../../ioc';
import { AuthStore } from '../../stores';
import { LoadingSpinner } from '../LoadingSpinner';

const SignoutRedirectCallback = (): JSX.Element => {
  const authStore = useInjection<AuthStore>(IoCTypes.authStore);

  useEffect(() => {
    const signoutRedirectCallback = async (): Promise<void> => {
      await authStore.signoutRedirectCallback();
    };

    signoutRedirectCallback().catch((error) => console.log(error));
  }, [authStore]);

  return (
    <>
      <Box className="absoluteCentered">
        <LoadingSpinner />
      </Box>
    </>
  );
};

export default SignoutRedirectCallback;
