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

type Props = {
  product: TProduct;
  onOpen: any;
};

const Product: React.FC<Props> = (props) => {
  const { product, onOpen } = props;
  const [amount, setAmount] = useState(1);
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
              onClick={() => onOpen()}
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
