import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { TShop } from '@/types/shop';
import { useRouter } from 'next/router';

type Props = {
  shop: TShop;
};

const ShopItem: React.FC<Props> = (props) => {
  const { shop } = props;
  const router = useRouter();
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 200 }} image={shop.img} title={shop.name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {shop.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {shop.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => router.push(`/shop/${shop.id}`)}>
          See more
        </Button>
      </CardActions>
    </Card>
  );
};

export default ShopItem;
