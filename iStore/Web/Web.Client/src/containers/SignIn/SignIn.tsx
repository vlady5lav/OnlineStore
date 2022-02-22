import 'reflect-metadata';
import '../../locales/config';

import React from 'react';

import { Box } from '@mui/material';

import { LoadingSpinner } from '../../components/LoadingSpinner';

const Signin = (): JSX.Element => {
  return (
    <>
      <Box className="absoluteCentered">
        <LoadingSpinner />
      </Box>
    </>
  );
};

export default Signin;
