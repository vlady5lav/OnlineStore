import 'reflect-metadata';
import '../locales/config';

import React, { Suspense } from 'react';

import { observer } from 'mobx-react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthorizedOutlet } from 'routes';

import { Box } from '@mui/material';

import { LoadingSpinner } from '../components/LoadingSpinner';
import { SigninCallback, Signout, SignoutCallback, SilentRenew } from '../components/OidcAuthorization';
import { Layout } from '../containers/Layout';

const Product = React.lazy(() => import('../containers/Product/Product'));
const Products = React.lazy(() => import('../containers/Products/Products'));
const Signin = React.lazy(() => import('../containers/Signin/Signin'));

const AppRoutes = observer(() => {
  return (
    <Suspense
      fallback={
        <Box className="absoluteCentered">
          <LoadingSpinner />
        </Box>
      }
    >
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Navigate replace to="/" />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Products />} />
            <Route path="/signin-oidc" element={<SigninCallback />} />
            <Route path="/signout-oidc" element={<Navigate replace to="/" />} />
            <Route path="/signout/callback" element={<SignoutCallback />} />
            <Route path="/silentrenew" element={<SilentRenew />} />
            <Route path="/products/" element={<Products />} />
            <Route path="/products/:id" element={<Product />} />
            <Route element={<AuthorizedOutlet />}>
              <Route path="/signin" element={<Signin />} />
              <Route path="/signout" element={<Signout />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
});

export default AppRoutes;
