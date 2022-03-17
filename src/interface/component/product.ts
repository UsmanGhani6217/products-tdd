/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { IProduct } from "../api/products";

export interface IState {
  data: Array<IProduct>;
  filterItems: Array<IProduct>;
  isFilter: boolean;
  loading: boolean;
  error:boolean;
  sum:number;
}
