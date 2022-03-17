/* eslint-disable no-debugger */
/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from "react";
import { IProduct } from "../../interface/api/products";
import ProductItem from "./ProductItem";
import Filter from "./Filter";
import Footer from "./Footer";
import { IState } from "../../interface/component/product";
import { getProducts } from "../../api/product";
import "../../styles.css";

const initialState = {
  data: [],
  filterItems: [],
  isFilter: false,
  loading: true,
  error: false,
  sum: 0,
};
export function Products() {
  const [state, setState] = useState<IState>(initialState);
  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    fetchProducts();
  }, []);

  const fetchProducts = (): void => {
    getProducts()
      .then((response) => {
        // eslint-disable-next-line no-debugger
        const { data }: IProduct[] | any = response;
        data.forEach((element: IProduct) => {
          element.quantity = 0;
        });
        setState({ ...state, data, loading: false });
      })
      .catch(() => setState({ ...state, error: true, loading: false }));
  };
  const getTotal = (data: Array<IProduct>, isFilter: boolean): void => {
    let sum = 0;
    let payload;
    for (let index: number = 0; index < data.length; index += 1) {
      const element = data[index];
      const quantity = element.quantity ? element.quantity : 0;
      const itemPrice = quantity * element.price;
      sum += itemPrice;
    }
    if (isFilter) {
      payload = {
        ...state,
        filterItems: data,
        isFilter: true,
        sum,
      };
    } else {
      payload = {
        ...state,
        data,
        isFilter,
        sum,
      };
    }
    debugger;
    setState(payload);
  };
  const countHandler = (type: string, id: number): void => {
    const cloneData = [...state.data];
    cloneData.forEach((item) => {
      if (item.id === id && type === "increment") {
        item.quantity = item.quantity ? item.quantity + 1 : 1;
      } else if (item.id === id && type === "decrement") {
        item.quantity = item.quantity && item.quantity > 0 ? item.quantity - 1 : 0;
      }
    });
    const payload = state.isFilter ? state.filterItems : cloneData;
    getTotal(payload, state.isFilter);
  };
  const changeHandler = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    if (e.target.value) {
      const { data } = state;
      const result = data.filter((x) => x.colour === e.target.value);
      getTotal(result, true);
    } else {
      getTotal(state.data, false);
    }
  };
  const renderProducts = (): JSX.Element[] | JSX.Element => {
    const data = state.isFilter ? state.filterItems : state.data;
    if (data.length === 0) return <div> No Product Available</div>;
    return data.map((product: IProduct) => (
      <ProductItem
        key={product.id}
        countHandler={countHandler}
        product={product}
      />
    ));
  };
  if (state.loading) {
    return (
      <div className="loader-wrapper">
        <div className="loader">Loading...</div>
      </div>
    );
  }
  if (state.error) {
    return <div>Something went wrong</div>;
  }
  return (
    <main className="wrapper">
      <div className="CartContainer">
        <div className="Header">
          <h1 className="text-center">Shopping Cart</h1>
          <Filter changeHandler={changeHandler} />
        </div>
        {renderProducts()}
        <Footer sum={state.sum} />
      </div>
    </main>
  );
}

export default Products;
