import 'reflect-metadata';
import '../../locales/config';

import React from 'react';

import { observer } from 'mobx-react';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Button, ButtonGroup, IconButton } from '@mui/material';

import { IoCTypes, useInjection } from '../../ioc';
import { CartStore } from '../../stores';

interface Properties {
  productId: number;
}

const BuyButtonProduct = observer((properties: Properties) => {
  const cartStore = useInjection<CartStore>(IoCTypes.cartStore);
  const count = cartStore.getCount(properties.productId);

  return (
    <>
      {count <= 0 && (
        <IconButton
          onClick={async (): Promise<void> => {
            await cartStore.addItem(properties.productId);
          }}
        >
          <AddShoppingCartIcon />
        </IconButton>
      )}
      {count > 0 && (
        <ButtonGroup>
          <Button
            variant="outlined"
            onClick={async (): Promise<void> => {
              await cartStore.removeItem(properties.productId);
            }}
          >
            -
          </Button>
          <Button disabled variant="outlined">
            {count}
          </Button>
          <Button
            variant="outlined"
            onClick={async (): Promise<void> => {
              await cartStore.addItem(properties.productId);
            }}
          >
            +
          </Button>
        </ButtonGroup>
      )}
    </>
  );
});

export default BuyButtonProduct;
