import 'reflect-metadata';
import '../../locales/config';

import React from 'react';

import { observer } from 'mobx-react';

import { Button, Stack } from '@mui/material';

import { IoCTypes, useInjection } from '../../ioc';
import { CartStore } from '../../stores';

interface Properties {
  productId: number;
  count: number;
}

const BuyButtonCart = observer((properties: Properties) => {
  const cartStore = useInjection<CartStore>(IoCTypes.cartStore);

  return (
    <>
      <Stack direction="column" justifyContent="center">
        <Button
          variant="outlined"
          onClick={async (): Promise<void> => {
            await cartStore.addItem(properties.productId);
          }}
        >
          +
        </Button>
        <Button disabled variant="outlined">
          {properties.count}
        </Button>
        <Button
          variant="outlined"
          onClick={async (): Promise<void> => {
            await cartStore.removeItem(properties.productId);
          }}
        >
          -
        </Button>
      </Stack>
    </>
  );
});

export default BuyButtonCart;
