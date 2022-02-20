import 'reflect-metadata';
import '../../locales/config';

import React, { useEffect } from 'react';

import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { Box, Grid } from '@mui/material';

import { LoadingSpinner } from '../../components/LoadingSpinner';
import { ProductCard } from '../../components/ProductCard';
import { IoCTypes, useInjection } from '../../ioc';
import { ProductsStore } from '../../stores';

const Product = observer(() => {
  const store = useInjection<ProductsStore>(IoCTypes.productsStore);
  const navigate = useNavigate();
  const { t } = useTranslation(['products']);
  const { id } = useParams();

  useEffect(() => {
    const getProduct = async (): Promise<void> => {
      const result = await store.getById(Number(id));
      if (result === undefined) {
        navigate('/products/', { replace: true });
      }
    };
    void getProduct();
  }, [store, id, navigate]);

  return (
    <Grid container justifyContent="center">
      {store.isLoading ? (
        <Box className="absoluteCentered">
          <LoadingSpinner />
        </Box>
      ) : (
        <>
          <Grid key={Math.random() * 12_345} container justifyContent="center" margin={2} mt={6}>
            <h1>
              {t('title.product')} {id}
            </h1>
          </Grid>
          <Grid key={Math.random() * 12_345} container justifyContent="center" margin={2}>
            <Grid item margin={2}>
              <ProductCard product={store.product} />
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
});

export default Product;
