import 'reflect-metadata';
import '../../locales/config';

import React, { ChangeEvent, useEffect } from 'react';

import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { Box, Grid } from '@mui/material';

import { LoadingSpinner } from '../../components/LoadingSpinner';
import { Pagination } from '../../components/Pagination';
import { ProductCard } from '../../components/ProductCard';
import { IoCTypes, useInjection } from '../../ioc';
import { ProductsStore } from '../../stores';

const Products = observer(() => {
  const store = useInjection<ProductsStore>(IoCTypes.productsStore);
  const { t } = useTranslation(['products']);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getProducts = async (): Promise<void> => {
      await store.getItems();
    };
    getProducts().catch((error) => console.log(error));
  }, [store, store.currentPage, location]);

  return (
    <Grid container justifyContent="center">
      {store.isLoading ? (
        <Box className="absoluteCentered">
          <LoadingSpinner />
        </Box>
      ) : (
        <>
          <Grid key={Math.random() * 12_345} container justifyContent="center" margin={2} mt={6}>
            <h1>{t('title')}</h1>
          </Grid>
          <Grid key={Math.random() * 12_345} container justifyContent="center" margin={2}>
            {store.products?.map((product) => (
              <Grid key={Math.random() * 12_345} item margin={2}>
                <ProductCard product={{ ...product }} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
      <Grid container justifyContent="center" mt={4}>
        <Pagination
          totalCount={store.totalPages}
          currentPage={store.currentPage}
          onChange={(event: ChangeEvent<unknown>, value: number): void => {
            store.changePage(value);
            value !== 1
              ? navigate(`/products?_page=${value}`, { replace: true })
              : navigate('/products', { replace: true });
          }}
        />
      </Grid>
    </Grid>
  );
});

export default Products;
