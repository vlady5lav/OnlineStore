import React, { ReactElement } from 'react';

import { Typography } from '@mui/material';

interface Properties {
  error?: string | null;
}

const ErrorMessage = (properties: Properties): ReactElement => {
  return (
    <Typography maxWidth={620} style={{ color: 'red', fontSize: 14, fontWeight: 700, overflowWrap: 'break-word' }}>
      {properties.error ?? null}
    </Typography>
  );
};

export default ErrorMessage;
