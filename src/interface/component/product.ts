import {Product} from '../api/products';
export interface IState {
  data: Array<Product>;
  filterItems: Array<Product>;
  isFilter: boolean;
  loading: boolean;
  error:boolean;
  sum:number;
}