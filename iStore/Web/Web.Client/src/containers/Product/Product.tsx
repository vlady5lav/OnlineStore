import 'reflect-metadata';
import '../../locales/config';

import React, { useEffect } from 'react';

import { observer } from 'mobx-react';
import { useNavigate, useParams } from 'react-router-dom';

import { Box, Grid } from '@mui/material';

import { LoadingSpinner } from '../../components/LoadingSpinner';
import { ProductDetails } from '../../components/ProductDetails';
import { IoCTypes, useInjection } from '../../ioc';
import { ProductsStore } from '../../stores';

const Product = observer(() => {
  const store = useInjection<ProductsStore>(IoCTypes.productsStore);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getProduct = async (): Promise<void> => {
      const result = await store.getById(Number(id));

      if (result === undefined) {
        navigate('/products/', { replace: true });
      }
    };

    getProduct().catch((error) => console.log(error));
  }, [store, id, navigate]);

  return (
    <Grid container justifyContent="center">
      {store.isLoading ? (
        <Box className="absoluteCentered">
          <LoadingSpinner />
        </Box>
      ) : (
        <>
          <Grid key={Math.random() * 12_345} container justifyContent="center" margin={2}>
            <Grid item margin={2}>
              <ProductDetails product={store.product} />
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
});

export default Product;
