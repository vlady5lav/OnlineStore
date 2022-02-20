import React, { ReactElement } from 'react';

import { t } from 'i18next';

import { CircularProgress, Container } from '@mui/material';

const LoadingSpinner = (): ReactElement => (
  <Container className="centered">
    <span>{t('app:loading')}</span>
    <CircularProgress role="status" className="centered" />
  </Container>
);

export default LoadingSpinner;
