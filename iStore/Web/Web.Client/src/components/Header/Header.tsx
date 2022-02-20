import 'reflect-metadata';
import '../../locales/config';

import React from 'react';

import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import DescriptionIcon from '@mui/icons-material/Description';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { AppBar, Badge, Button, Container, Stack, Toolbar } from '@mui/material';

import { IoCTypes, useInjection } from '../../ioc';
import { AuthStore, CartStore } from '../../stores';
import { LanguageChangerButton } from '../LanguageChangerButton';

const Header = observer(() => {
  const navigate = useNavigate();
  const authStore = useInjection<AuthStore>(IoCTypes.authStore);
  const cartStore = useInjection<CartStore>(IoCTypes.cartStore);
  const { t } = useTranslation(['header']);

  return (
    <AppBar position="static">
      <Container>
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={6}>
            <Badge color="secondary" badgeContent={''}>
              <Button
                className="productsButton"
                color="warning"
                onClick={() => navigate('/')}
                endIcon={<DescriptionIcon />}
                variant="contained"
              >
                {t('products')}
              </Button>
            </Badge>
            {!authStore.user && (
              <Button
                className="signInButton"
                color="error"
                onClick={() => navigate('/signin', { replace: false })}
                endIcon={<LoginIcon />}
                variant="contained"
              >
                {t('signin')}
              </Button>
            )}
            {!!authStore.user && (
              <Button
                className="signOutButton"
                color="error"
                onClick={() => {
                  navigate('/signout', { replace: false });
                }}
                endIcon={<LogoutIcon />}
                variant="contained"
              >
                {t('signout')}
              </Button>
            )}
            <LanguageChangerButton />
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
});

export default Header;
