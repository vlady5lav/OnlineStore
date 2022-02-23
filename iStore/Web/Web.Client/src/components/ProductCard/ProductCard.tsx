/* eslint-disable unicorn/no-null */

import 'reflect-metadata';
import '../../locales/config';

import React, { useState } from 'react';

import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { Product } from '../../models';
import { BuyButtonProduct } from '../BuyButton';

interface Properties {
  product: Product | undefined;
}

const ProductCard = observer((properties: Properties) => {
  const navigate = useNavigate();
  const { t } = useTranslation(['products']);
  const [expanded, setExpanded] = useState<boolean>(false);

  if (!properties.product) {
    return null;
  }

  const handleExpandClick = (): void => {
    setExpanded(!expanded);
  };

  const { id, name, price, description, pictureUrl, catalogBrand, catalogType } = properties.product;

  return (
    <>
      <Card className="productCard" sx={{ width: 350, maxWidth: 350 }}>
        <CardContent
          sx={{
            maxHeight: 80,
            padding: 1,
            margin: 1,
            marginTop: 0,
            marginBottom: 2,
            textAlign: 'center',
            alignContent: 'center',
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignContent="center">
            <Stack justifyContent="center" alignContent="center">
              <Avatar className="avatar" src={`${process.env.PUBLIC_URL}/logo512.png`} />
            </Stack>
            <Stack direction="column" justifyContent="center" alignContent="center" height={80}>
              <Typography>{catalogBrand.brand}</Typography>
              <Typography>{name}</Typography>
            </Stack>
            <Stack justifyContent="center" alignContent="center">
              <IconButton
                className="detailsButton"
                onClick={(): void => navigate(`/products/${id}`, { replace: false })}
              >
                <InfoIcon />
              </IconButton>
            </Stack>
          </Stack>
        </CardContent>
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
            objectFit: 'scale-down',
          }}
        />
        <CardContent sx={{ padding: 0.5, margin: 0.5, textAlign: 'left' }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography>{t('properties.brand')}:</Typography>
            <Typography>{catalogBrand.brand}</Typography>
          </Stack>
        </CardContent>
        <CardContent sx={{ padding: 0.5, margin: 0.5, textAlign: 'left' }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography>{t('properties.type')}:</Typography>
            <Typography>{catalogType.type}</Typography>
          </Stack>
        </CardContent>
        <CardContent sx={{ padding: 0.5, margin: 0.5 }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography>{t('properties.price')}:</Typography>
            <Typography>
              {price} {t('properties.currency')}
            </Typography>
          </Stack>
        </CardContent>
        <CardActions sx={{ justifyContent: 'space-between', height: 50, maxHeight: 50, padding: 1 }}>
          <BuyButtonProduct productId={id} />
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
              rows={5}
              value={description}
            />
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
});

export default ProductCard;
