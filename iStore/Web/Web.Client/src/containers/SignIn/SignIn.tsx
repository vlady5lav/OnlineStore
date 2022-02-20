/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */

import 'reflect-metadata';
import '../../locales/config';

import React from 'react';

import { Box } from '@mui/material';

import { LoadingSpinner } from '../../components/LoadingSpinner';

const Signin = () => {
  return (
    <>
      <Box className="absoluteCentered">
        <LoadingSpinner />
      </Box>
    </>
  );
};

export default Signin;
