/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { IProduct } from "../api/products";

export interface IProductsList {
  product: IProduct;
  countHandler: (type:string, id:number)=> void;
}
