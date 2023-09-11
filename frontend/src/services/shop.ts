import setError from '@/utils/errorResponse';
import Http from '@/api/Http';

const PATH = '/shop';

const shopService = {
  getAllShop: async () => {
    try {
      const url = `${PATH}`;
      const res = await Http.get(url);
      return res.data;
    } catch (err) {
      console.log('err', err);
      return setError(err);
    }
  },
  getShopById: async (id: any) => {
    try {
      const url = `${PATH}/${id}`;
      const res = await Http.get(url);
      return res.data;
    } catch (err) {
      console.log('err', err);
      return setError(err);
    }
  },
};

export default shopService;
