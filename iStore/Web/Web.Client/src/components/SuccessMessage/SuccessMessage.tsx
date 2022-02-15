import React, { ReactElement } from 'react';

import { Typography } from '@mui/material';

interface Properties {
  message?: string | null;
}

const SuccessMessage = (properties: Properties): ReactElement => {
  return (
    <Typography maxWidth={620} style={{ color: 'green', fontSize: 14, fontWeight: 700, overflowWrap: 'break-word' }}>
      {properties.message ?? null}
    </Typography>
  );
};

export default SuccessMessage;
