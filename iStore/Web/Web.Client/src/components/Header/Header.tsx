import 'reflect-metadata';
import '../../locales/config';

import React, { useEffect } from 'react';

import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import DescriptionIcon from '@mui/icons-material/Description';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppBar, Badge, Button, Stack, Toolbar } from '@mui/material';

import { IoCTypes, useInjection } from '../../ioc';
import { AuthStore, CartStore } from '../../stores';
import { LanguageChangerButton } from '../LanguageChangerButton';

const Header = observer(() => {
  const navigate = useNavigate();
  const authStore = useInjection<AuthStore>(IoCTypes.authStore);
  const cartStore = useInjection<CartStore>(IoCTypes.cartStore);
  const { t } = useTranslation(['header']);

  useEffect(() => {
    const getAuthenticationStatus = async (): Promise<void> => {
      await authStore.signinSilent();

      if (!authStore.user) {
        await authStore.getUser();
      }
    };

    getAuthenticationStatus().catch((error) => console.log(error));
  }, [authStore]);

  useEffect(() => {
    const getCart = async (): Promise<void> => {
      await cartStore.getCart();
    };

    getCart().catch((error) => console.log(error));
  }, [authStore.user, cartStore]);

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={6}>
          <LanguageChangerButton />
          <Button
            className="productsButton"
            color="warning"
            onClick={(): void => {
              navigate('/products', { replace: false });
            }}
            endIcon={<DescriptionIcon />}
            variant="contained"
          >
            {t('products')}
          </Button>
          <Badge color="secondary" badgeContent={cartStore.cart?.totalCount ?? undefined}>
            <Button
              className="cartButton"
              color="warning"
              onClick={(): void => navigate('/cart')}
              endIcon={<ShoppingCartIcon />}
              variant="contained"
            >
              {t('cart')}
            </Button>
          </Badge>
          {!authStore.user && (
            <Button
              className="signinButton"
              color="error"
              onClick={(): void => navigate('/signin')}
              endIcon={<LoginIcon />}
              variant="contained"
            >
              {t('signin')}
            </Button>
          )}
          {!!authStore.user && (
            <Button
              className="signoutButton"
              color="error"
              onClick={(): void => navigate('/signout')}
              endIcon={<LogoutIcon />}
              variant="contained"
            >
              {`${t('signout')} [${authStore.user?.profile.name}]`}
            </Button>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
});

export default Header;
