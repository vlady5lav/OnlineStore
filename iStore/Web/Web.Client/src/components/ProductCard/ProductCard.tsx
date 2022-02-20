/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */

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
  TextField,
  Typography,
} from '@mui/material';

import { IoCTypes, useInjection } from '../../ioc';
import { Product } from '../../models';
import { CartStore, ProductsStore } from '../../stores';

interface Properties {
  product: Product | null;
}

const ProductCard = observer((properties: Properties) => {
  const navigate = useNavigate();
  const store = useInjection<ProductsStore>(IoCTypes.productsStore);
  const cartStore = useInjection<CartStore>(IoCTypes.cartStore);
  const { t } = useTranslation(['products']);
  const [expanded, setExpanded] = useState<boolean>(false);

  if (!properties.product) {
    return null;
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const { id, name, price, availableStock, description, pictureUrl, catalogBrand, catalogType } = properties.product;
  const count = 0;

  return (
    <Card className="productCard" sx={{ width: 350, maxWidth: 350, padding: 1.5 }}>
      <CardHeader
        sx={{ height: 200, maxHeight: 200, padding: 1.5, textAlign: 'justify' }}
        avatar={<Avatar className="avatar" src={`${process.env.PUBLIC_URL}/logo512.png`} />}
        action={
          <IconButton className="goToProductButton" onClick={() => navigate(`/products/${id}`, { replace: false })}>
            <MoreVertIcon />
          </IconButton>
        }
        title={name}
        subheader={catalogBrand.brand}
      />
      <CardContent
        sx={{ display: 'grid', justifyContent: 'center', height: 205, maxHeight: 205, maxWidth: 350, padding: 1.5 }}
      >
        <CardMedia
          component="img"
          image={pictureUrl}
          alt={`${catalogBrand.brand} ${name}`}
          onClick={() => navigate(`/products/${id}`, { replace: false })}
          sx={{ height: 200, maxWidth: 350, objectFit: 'contain' }}
        />
      </CardContent>
      <CardContent sx={{ textAlign: 'left' }}>
        <Typography>Brand: {catalogBrand.brand}</Typography>
      </CardContent>
      <CardContent sx={{ textAlign: 'left' }}>
        <Typography>Type: {catalogType.type}</Typography>
      </CardContent>
      <CardContent sx={{ textAlign: 'left' }}>
        <Typography>In Stock: {availableStock} pcs</Typography>
      </CardContent>
      <CardContent sx={{ textAlign: 'right' }}>
        <Typography>{price} UAH</Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', height: 50, maxHeight: 50, padding: 1.5 }}>
        {count <= 0 && (
          <IconButton onClick={() => {}}>
            <AddShoppingCartIcon />
          </IconButton>
        )}
        {count > 0 && (
          <ButtonGroup>
            <Button onClick={() => {}}>-</Button>
            <Button disabled>{count}</Button>
            <Button onClick={() => {}}>+</Button>
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
