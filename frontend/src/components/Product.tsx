import React, { useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { TProduct } from '@/types/shop';
import { Add, Remove } from '@mui/icons-material';
import { useRouter } from 'next/router';
import axios from 'axios';

type Props = {
  product: TProduct;
  setSelectedAmount: any;
  onOpen: any;
};

const Product: React.FC<Props> = (props) => {
  const router = useRouter();
  const { product, setSelectedAmount, onOpen } = props;
  const [amount, setAmount] = useState(1);

  async function onClick() {
    const res = await axios.post(
      `https://apis.finnwork.co/crypto/wallet/newrequestdeposit`,
      {
        merchantcode: 'mc00000003',
        cusid: 'txlineasgd',
        asset: 'USDC',
        network: 59140,
        amount: amount,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'depay-x-key': `${process.env.NEXT_PUBLIC_API_KEY_SUPERADMIN}`,
        },
      }
    );
    console.log('res', res);
    router.push({
      pathname: `/payment/${res.data.id}`,
    });
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 200 }}
        image={product.img}
        title={product.name}
      />
      <CardContent>
        <Typography variant="h5">{product.name}</Typography>
        <Typography variant="subtitle1" color="text.secondary">
          ${product.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={1}
            >
              <IconButton
                onClick={() => setAmount(amount - 1)}
                disabled={amount === 1}
              >
                <Remove />
              </IconButton>
              <Typography>{amount}</Typography>
              <IconButton onClick={() => setAmount(amount + 1)}>
                <Add />
              </IconButton>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Button
              size="small"
              fullWidth
              variant="contained"
              onClick={() => onClick()}
            >
              Buy
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default Product;
