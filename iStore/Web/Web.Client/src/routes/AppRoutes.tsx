import 'reflect-metadata';
import '../locales/config';

import React, { Suspense } from 'react';

import { observer } from 'mobx-react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthorizedOutlet } from 'routes';

import { Box } from '@mui/material';

import { LoadingSpinner } from '../components/LoadingSpinner';
import {
  SigninRedirect,
  SigninRedirectCallback,
  SigninSilentCallback,
  SignoutRedirect,
  SignoutRedirectCallback,
} from '../components/OidcAuthorization';
import { Layout } from '../containers/Layout';

const Cart = React.lazy(() => import('../containers/Cart/Cart'));
const Product = React.lazy(() => import('../containers/Product/Product'));
const Products = React.lazy(() => import('../containers/Products/Products'));

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
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<Product />} />
            <Route path="/signin" element={<SigninRedirect />} />
            <Route path="/signin-oidc" element={<SigninRedirectCallback />} />
            <Route path="/signin/callback" element={<SigninRedirectCallback />} />
            <Route path="/signout-oidc" element={<SignoutRedirectCallback />} />
            <Route path="/signout/callback" element={<SignoutRedirectCallback />} />
            <Route path="/signout" element={<SignoutRedirect />} />
            <Route path="/silentrenew" element={<SigninSilentCallback />} />
            <Route element={<AuthorizedOutlet />}>
              <Route path="/cart" element={<Cart />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
});

export default AppRoutes;
