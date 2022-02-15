import React, { ReactElement } from 'react';

import { Button, CircularProgress } from '@mui/material';

interface Properties {
  isLoading: boolean;
  text?: string;
  disabled?: string | boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick: () => void;
  onChange: () => void;
  variant?: 'text' | 'outlined' | 'contained' | undefined;
}

const ButtonSpinner = ({ isLoading, text, disabled, type, onClick, onChange, variant }: Properties): ReactElement => {
  return (
    <Button
      variant={variant ? variant : 'outlined'}
      disabled={!!disabled}
      onClick={() => onClick()}
      onChange={() => onChange()}
      type={type}
    >
      {isLoading ? <CircularProgress /> : `${text}`}
    </Button>
  );
};

export default ButtonSpinner;
