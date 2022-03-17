export interface IProduct {
  product: any;
  id: number;
  colour: string;
  name: string;
  price: number;
  img: string;
  quantity?: number;
}

export type ProductProps = {
  product: IProduct;
};

export type ApiDataType = {
  message: string;
  status: string;
  products: IProduct[];
  product?: IProduct;
};
