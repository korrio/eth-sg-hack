import React from 'react';
import { useShops } from '@/hooks/useShops';
import ShopItem from '@/components/ShopItem';
import { Grid } from '@mui/material';

const ShopList = () => {
  const shops = useShops();
  console.log('shops', shops);
  return (
    <div>
      <Grid container spacing={1}>
        {shops.map((shop: any, index: any) => {
          return (
            <Grid key={index} item xs={3}>
              <ShopItem shop={shop} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default ShopList;
