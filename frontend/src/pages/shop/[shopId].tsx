import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { useRouter } from 'next/router';
import shopService from '@/services/shop';
import { TProduct, TShop } from '@/types/shop';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Product from '@/components/Product';
import { Grid } from '@mui/material';
import { useDebounce } from 'usehooks-ts';
import Head from 'next/head';
import QRCode from '@/components/QRCode';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const ShopDetail = () => {
  const router = useRouter();
  const { shopId } = router.query;
  const [open, setOpen] = useState(false);
  const [shop, setShop] = useState<TShop>({
    description: '',
    id: 0,
    img: '',
    name: '',
    products: [],
  });

  const [value, setValue] = useState<string>('');
  const debouncedValue = useDebounce<string>(value, 500);
  console.log('debouncedValue', debouncedValue);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  async function fetchData() {
    const res = await shopService.getShopById(shopId);
    setShop(res.data);
  }

  useEffect(() => {
    if (shopId) {
      fetchData();
    }
  }, [shopId]);

  function onClose() {
    setOpen(false);
  }

  function onOpen() {
    setOpen(true);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <QRCode open={open} onClose={onClose} />
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
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                handleChange(e);
              }}
            />
          </Search>
        </Toolbar>
      </AppBar>
      <Box sx={{ padding: '1rem 0' }}>
        <Grid container spacing={1}>
          {shop.products.map((product: TProduct, index: React.Key) => {
            return (
              <Grid key={index} item xs={3}>
                <Product product={product} onOpen={onOpen} />
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
