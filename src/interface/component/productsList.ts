import { IProduct } from '../api/products';

export interface IProductsList {
  product: IProduct;
  countHandler: (type:string, id:number)=> void;
}
