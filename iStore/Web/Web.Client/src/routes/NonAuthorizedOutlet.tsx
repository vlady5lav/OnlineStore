import 'reflect-metadata';
import '../locales/config';

import React from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { IoCTypes, useInjection } from '../ioc';
import AuthStore from '../stores/AuthStore';

const NonAuthorizedOutlet = () => {
  const store = useInjection<AuthStore>(IoCTypes.authStore);
  return !store.isAuthorized ? <Outlet /> : <Navigate replace to="/" />;
};

export default NonAuthorizedOutlet;
