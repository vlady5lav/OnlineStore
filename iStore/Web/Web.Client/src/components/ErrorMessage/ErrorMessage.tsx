import React, { ReactElement } from 'react';

import { Typography } from '@mui/material';

interface Properties {
  error?: string | undefined;
}

const ErrorMessage = (properties: Properties): ReactElement => {
  return (
    <Typography maxWidth={620} style={{ color: 'red', fontSize: 14, fontWeight: 700, overflowWrap: 'break-word' }}>
      {properties.error ?? undefined}
    </Typography>
  );
};

export default ErrorMessage;
