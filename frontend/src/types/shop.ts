export type TProduct = {
  id: number;
  name: string;
  description: string;
  img: string;
  price: number;
  stock: number;
};

export type TShop = {
  id: number;
  name: string;
  description: string;
  img: string;
  products: TProduct[];
};
