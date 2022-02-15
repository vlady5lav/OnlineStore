import 'reflect-metadata';
import '../locales/config';

import React, { Suspense } from 'react';

import { observer } from 'mobx-react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Box } from '@mui/material';

import { LoadingSpinner } from '../components/LoadingSpinner';
import { Layout } from '../containers/Layout';

const Product = React.lazy(() => import('../containers/Product/Product'));
const Products = React.lazy(() => import('../containers/Products/Products'));
const SignIn = React.lazy(() => import('../containers/SignIn/SignIn'));
const SignUp = React.lazy(() => import('../containers/SignUp/SignUp'));

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
            <Route path="/products/" element={<Products />} />
            <Route path="/products/:id" element={<Product />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
});

export default AppRoutes;
