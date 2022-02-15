import React, { ReactElement } from 'react';

import { CircularProgress, Container } from '@mui/material';

const LoadingSpinner = (): ReactElement => (
  <Container className="centered">
    <span>Loading... </span>
    <CircularProgress role="status" className="centered" />
  </Container>
);

export default LoadingSpinner;
