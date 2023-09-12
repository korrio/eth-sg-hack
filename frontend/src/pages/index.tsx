import React, { ReactElement } from 'react';
import MainLayout from '@/layouts/MainLayout';
import ShopList from '@/components/ShopList';
import { Box } from '@mui/material';
import Head from 'next/head';

const Index = () => {
  return (
    <div>
      <Head>
        <title>Shops</title>
      </Head>
      <Box>
        <ShopList />
      </Box>
    </div>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Index;
