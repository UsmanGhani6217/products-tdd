import axios, { AxiosResponse } from 'axios';
import { ApiDataType } from '../interface/api/products';

const baseUrl = 'https://my-json-server.typicode.com/benirvingplt/products/products';

export const getProducts = async (): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const products: AxiosResponse<ApiDataType> = await axios.get(
      `${baseUrl}`,
    );
    return products;
  } catch (error:unknown) {
    throw new Error();
  }
};
