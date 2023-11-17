import React, { ReactElement, useEffect, useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { useRouter } from 'next/router';
import shopService from '@/services/shop';
import { TProduct, TShop } from '@/types/shop';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Product from '@/components/Product';
import { Grid } from '@mui/material';
import Head from 'next/head';

const ShopDetail = () => {
  const router = useRouter();
  const { shopId } = router.query;

  const [shop, setShop] = useState<TShop>({
    description: '',
    id: 0,
    img: '',
    name: '',
    products: [],
  });

  async function fetchData() {
    const res = await shopService.getShopById(shopId);
    setShop(res.data);
  }

  useEffect(() => {
    if (shopId) {
      fetchData();
    }
  }, [shopId]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Head>
        <title>{shop.name}</title>
      </Head>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            {shop.name}
          </Typography>
          {/* <Search> */}
          {/*  <SearchIconWrapper> */}
          {/*    <SearchIcon /> */}
          {/*  </SearchIconWrapper> */}
          {/*  <StyledInputBase */}
          {/*    placeholder="Search…" */}
          {/*    inputProps={{ 'aria-label': 'search' }} */}
          {/*    onChange={(e: ChangeEvent<HTMLInputElement>) => { */}
          {/*      handleChange(e); */}
          {/*    }} */}
          {/*  /> */}
          {/* </Search> */}
        </Toolbar>
      </AppBar>
      <Box sx={{ padding: '1rem 0' }}>
        <Grid container spacing={1}>
          {shop.products.map((product: TProduct, index: React.Key) => {
            return (
              <Grid key={index} item xs={3}>
                <Product product={product} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};

ShopDetail.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default ShopDetail;
