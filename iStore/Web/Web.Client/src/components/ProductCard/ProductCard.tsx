/* eslint-disable unicorn/no-null */

import 'reflect-metadata';
import '../../locales/config';

import React, { useState } from 'react';

import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Avatar,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { IoCTypes, useInjection } from '../../ioc';
import { Product } from '../../models';
import { AuthStore, CartStore } from '../../stores';

interface Properties {
  product: Product | undefined;
}

const ProductCard = observer((properties: Properties) => {
  const navigate = useNavigate();
  const authStore = useInjection<AuthStore>(IoCTypes.authStore);
  const cartStore = useInjection<CartStore>(IoCTypes.cartStore);
  const { t } = useTranslation(['products']);
  const [expanded, setExpanded] = useState<boolean>(false);

  if (!properties.product) {
    return null;
  }

  const handleExpandClick = (): void => {
    setExpanded(!expanded);
  };

  const { id, name, price, availableStock, description, pictureUrl, catalogBrand, catalogType } = properties.product;
  const count = cartStore.getCount(properties.product);

  return (
    <Card className="productCard" sx={{ width: 350, maxWidth: 350, padding: 1.5 }}>
      <CardHeader
        sx={{ height: 200, maxHeight: 200, padding: 1.5, textAlign: 'justify' }}
        avatar={<Avatar className="avatar" src={`${process.env.PUBLIC_URL}/logo512.png`} />}
        action={
          <IconButton
            className="goToProductButton"
            onClick={(): void => navigate(`/products/${id}`, { replace: false })}
          >
            <MoreVertIcon />
          </IconButton>
        }
        title={name}
        subheader={catalogBrand.brand}
      />
      <CardMedia
        component="img"
        image={pictureUrl}
        alt={`${catalogBrand.brand} ${name}`}
        onClick={(): void => navigate(`/products/${id}`, { replace: false })}
        sx={{
          display: 'grid',
          justifyContent: 'center',
          height: 200,
          maxHeight: 200,
          maxWidth: 350,
          padding: 1.5,
          border: 'dotted',
          borderWidth: 1,
        }}
      />
      <CardContent sx={{ padding: 0, margin: 1, textAlign: 'left' }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography>{t('properties.brand')}:</Typography>
          <Typography>{catalogBrand.brand}</Typography>
        </Stack>
      </CardContent>
      <CardContent sx={{ padding: 0, margin: 1, textAlign: 'left' }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography>{t('properties.type')}:</Typography>
          <Typography>{catalogType.type}</Typography>
        </Stack>
      </CardContent>
      <CardContent sx={{ padding: 0, margin: 1 }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography>{t('properties.price')}:</Typography>
          <Typography>
            {price}
            {t('properties.currency')}
          </Typography>
        </Stack>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', height: 50, maxHeight: 50, padding: 1.5 }}>
        {count <= 0 && (
          <IconButton
            onClick={async (): Promise<void> => {
              await cartStore.addItem(properties.product!);
            }}
          >
            <AddShoppingCartIcon />
          </IconButton>
        )}
        {count > 0 && (
          <ButtonGroup>
            <Button
              onClick={async (): Promise<void> => {
                await cartStore.removeItem(properties.product!);
              }}
            >
              -
            </Button>
            <Button disabled>{count}</Button>
            <Button
              onClick={async (): Promise<void> => {
                await cartStore.addItem(properties.product!);
              }}
            >
              +
            </Button>
          </ButtonGroup>
        )}
        <Button
          className="expandProductButton"
          sx={{ transform: !expanded ? 'rotate(0deg)' : 'rotate(180deg)' }}
          onClick={handleExpandClick}
        >
          <ExpandMoreIcon />
        </Button>
      </CardActions>
      <Collapse in={expanded} unmountOnExit>
        <CardContent>
          <TextField
            InputProps={{
              readOnly: true,
            }}
            fullWidth
            id="outlined-multiline-static"
            label={t('properties.description')}
            multiline
            rows={10}
            value={description}
          />
        </CardContent>
      </Collapse>
    </Card>
  );
});

export default ProductCard;
