import 'reflect-metadata';
import '../../locales/config';

import React, { ChangeEvent, useEffect } from 'react';

import { observer } from 'mobx-react';

import { Pagination as MPagination } from '@mui/material';

interface Properties {
  totalCount: number;
  currentPage: number;
  onChange: (event: ChangeEvent<unknown>, value: number) => void;
}

const Pagination = observer(({ totalCount, currentPage, onChange }: Properties) => {
  const [page, setPage] = React.useState(currentPage);

  const handleChange = (event: ChangeEvent<unknown>, value: number): void => {
    setPage(value);
    onChange(event, value);
  };

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  return (
    <>
      <MPagination count={totalCount} page={page} onChange={handleChange} />
    </>
  );
});

export default Pagination;
