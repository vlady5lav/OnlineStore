import 'reflect-metadata';
import '../../locales/config';

import React from 'react';

import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import DescriptionIcon from '@mui/icons-material/Description';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { AppBar, Badge, Button, Container, Stack, Toolbar } from '@mui/material';

import { IoCTypes, useInjection } from '../../ioc';
import { AuthStore, ProductsStore } from '../../stores';
import { LanguageChangerButton } from '../LanguageChangerButton';

const Header = observer(() => {
  const navigate = useNavigate();
  const authStore = useInjection<AuthStore>(IoCTypes.authStore);
  const store = useInjection<ProductsStore>(IoCTypes.productsStore);
  const { t } = useTranslation(['header']);

  return (
    <AppBar position="static">
      <Container>
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={6}>
            <Badge color="secondary" badgeContent={store.count}>
              <Button
                className="allProductsButton"
                color="warning"
                onClick={() => navigate('/')}
                endIcon={<DescriptionIcon />}
                variant="contained"
              >
                {t('products')}
              </Button>
            </Badge>
            <Button
              className="signInButton"
              color="error"
              onClick={() => navigate('/signin', { replace: true })}
              endIcon={<LoginIcon />}
              variant="contained"
            >
              {t('signIn')}
            </Button>
            <Button
              className="signUpButton"
              color="secondary"
              onClick={() => navigate('/signup', { replace: true })}
              endIcon={<HowToRegIcon />}
              variant="contained"
            >
              {t('signUp')}
            </Button>
            {authStore.isAuthorized && (
              <Button
                className="signOutButton"
                color="error"
                onClick={() => {
                  authStore.signOut();
                  navigate('/', { replace: true });
                }}
                endIcon={<LogoutIcon />}
                variant="contained"
              >
                {t('signOut')}
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
