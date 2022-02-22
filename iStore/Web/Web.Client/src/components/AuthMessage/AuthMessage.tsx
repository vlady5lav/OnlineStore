import React, { ReactElement } from 'react';

import { Typography } from '@mui/material';

interface Properties {
  message?: string | undefined;
}

const AuthMessage = (properties: Properties): ReactElement => {
  return (
    <Typography maxWidth={620} style={{ color: 'green', fontSize: 14, fontWeight: 700, overflowWrap: 'break-word' }}>
      {properties.message ?? undefined}
    </Typography>
  );
};

export default AuthMessage;
