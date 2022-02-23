import 'reflect-metadata';
import '../../locales/config';

import React from 'react';

import { CartCard } from 'components/CartCard';
import { LoadingSpinner } from 'components/LoadingSpinner';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';

import { Box, Grid, Stack } from '@mui/material';

import { IoCTypes, useInjection } from '../../ioc';
import { CartStore } from '../../stores';

const Cart = observer(() => {
  const cartStore = useInjection<CartStore>(IoCTypes.cartStore);
  const { t } = useTranslation(['cart']);

  return (
    <Grid container justifyContent="center">
      {cartStore.isLoading ? (
        <Box className="absoluteCentered">
          <LoadingSpinner />
        </Box>
      ) : (
        <>
          <Grid key={Math.random() * 12_345} container justifyContent="center" margin={2} mt={6}>
            <h1>{t('title')}</h1>
          </Grid>
          <Grid key={Math.random() * 12_345} container justifyContent="center" margin={2}>
            <Stack direction="column">
              {cartStore.cart.items.map((cartItem) => (
                <Grid key={Math.random() * 12_345} item margin={2}>
                  <CartCard cartItem={cartItem} />
                </Grid>
              ))}
            </Stack>
          </Grid>
        </>
      )}
    </Grid>
  );
});

export default Cart;
