import { useEffect, useState } from 'react';
import shopService from '@/services/shop';

export const useShops = () => {
  const [shops, setShop] = useState([]);

  async function fetchData() {
    const res = await shopService.getAllShop();
    setShop(res.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return shops;
};
