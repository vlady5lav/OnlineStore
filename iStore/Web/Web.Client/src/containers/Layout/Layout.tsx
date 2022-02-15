import 'reflect-metadata';
import '../../locales/config';

import React from 'react';

import { observer } from 'mobx-react';
import { Outlet } from 'react-router-dom';

import { Box } from '@mui/material';

import { Header } from '../../components/Header';

const Layout = observer(() => {
  return (
    <>
      <Header />
      <Box>
        <Outlet />
      </Box>
    </>
  );
});

export default Layout;
