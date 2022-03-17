/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
import axios, { AxiosResponse } from "axios";
import { ApiDataType } from "../interface/api/products";

const baseUrl: string = "https://my-json-server.typicode.com/benirvingplt/products/products";

export const getProducts = async (): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const products: AxiosResponse<ApiDataType> = await axios.get(
      `${baseUrl}`,
    );
    return products;
  } catch (error:any) {
    throw new Error(error);
  }
};
