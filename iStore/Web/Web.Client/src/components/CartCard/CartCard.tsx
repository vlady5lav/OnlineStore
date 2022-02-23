import 'reflect-metadata';
import '../../locales/config';

import React, { useEffect } from 'react';

import { BuyButtonCart } from 'components/BuyButton';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';

import { Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';

import { IoCTypes, useInjection } from '../../ioc';
import { CartItem } from '../../models';
import { CartStore } from '../../stores';

interface Properties {
  cartItem: CartItem;
}

const CartCard = observer((properties: Properties) => {
  const cartStore = useInjection<CartStore>(IoCTypes.cartStore);
  const navigate = useNavigate();

  const { id, brand, type, name, picture, count, price, totalPrice } = properties.cartItem;

  useEffect(() => {}, [cartStore]);

  return (
    <Card className="productCard" sx={{ width: 1000, maxWidth: 1000, padding: 1.5 }}>
      <Stack direction="row">
        <CardMedia
          component="img"
          image={picture}
          alt={`${name}`}
          onClick={(): void => navigate(`/products/${id}`, { replace: false })}
          sx={{
            display: 'grid',
            justifyContent: 'center',
            height: 75,
            maxHeight: 75,
            maxWidth: 100,
            padding: 1.5,
            border: 'dotted',
            borderWidth: 1,
          }}
        />
        <CardContent sx={{ padding: 1, margin: 1, textAlign: 'center' }}>
          <Stack direction="column" justifyContent="center">
            <Typography>{brand}</Typography>
            <Typography>{name}</Typography>
            <Typography>{type}</Typography>
          </Stack>
        </CardContent>
        <CardContent sx={{ padding: 1, margin: 1, textAlign: 'center' }}>
          <Stack direction="column" justifyContent="center">
            <Typography>{price}</Typography>
          </Stack>
        </CardContent>
        <CardContent sx={{ padding: 1, margin: 1, textAlign: 'center' }}>
          <Stack direction="column" justifyContent="center">
            <Typography>{count}</Typography>
          </Stack>
        </CardContent>
        <CardContent sx={{ padding: 1, margin: 1, textAlign: 'center' }}>
          <Stack direction="column" justifyContent="center">
            <Typography>{totalPrice}</Typography>
          </Stack>
        </CardContent>
        <BuyButtonCart count={count} productId={id} />
      </Stack>
    </Card>
  );
});

export default CartCard;
