import React, { useEffect, useState } from "react";
import { Product } from "../../interface/api/products";
import { IState } from "../../interface/component/product";
import "../../styles.css";

export const ProductsList = () => {
  const [state, setState] = useState<IState>({
    data: [],
    filterItems: [],
    isFilter: false,
    loading: true,
    error: false,
    sum: 0,
  });
  useEffect(() => {
    const fetchProducts = () => {
      fetch(
        `https://my-json-server.typicode.com/benirvingplt/products/products`
      )
        .then((response) => response.json())
        .then((data) => {
          data.forEach(function (element: Product) {
            element.quantity = 0;
          });
          setState({ ...state, data, loading: false });
        })
        .catch(() => setState({ ...state, error: true, loading: false }));
    };
    fetchProducts();
  }, []);
  const getTotal = (data: Array<Product>, isFilter: boolean) => {
    let sum = 0;
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      const quantity = element["quantity"] ? element.quantity : 0;
      const itemPrice = quantity * element.price;
      sum = sum + itemPrice;
    }

    setState({ ...state, data, isFilter, sum });
  };
  const getTotalByFilter = (data: Array<Product>) => {
    let sum = 0;
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      const quantity = element["quantity"] ? element.quantity : 0;
      const itemPrice = quantity * element.price;
      sum = sum + itemPrice;
    }

    setState({ ...state, filterItems: data, isFilter: true, sum });
  };

  const incrementHandler = (id: number) => {
    const cloneData = state.data;
    const newArr = cloneData.map((obj: any) => {
      if (obj["id"] === id) {
        return { ...obj, quantity: obj.quantity ? obj.quantity + 1 : 1 };
      }
      return obj;
    });
    getTotal(newArr, state.isFilter);
  };
  const decrementHandler = (id: number) => {
    const cloneData = [...state.data];
    const newArr = cloneData.map((obj: any) => {
      if (obj["id"] === id) {
        return {
          ...obj,
          quantity: obj.quantity && obj.quantity > 0 ? obj.quantity - 1 : 0,
        };
      }
      return obj;
    });
    getTotal(newArr, state.isFilter);
  };
  const changeHandler = (e: any) => {
    if (e.currentTarget.value) {
      const data = state.data;
      const result = data.filter((x) => x.colour === e.currentTarget.value);
      getTotalByFilter(result);
    } else {
      getTotal(state.data, false);
    }
  };
  const renderProducts: () => JSX.Element[] | JSX.Element = () => {
    const data = state.isFilter ? state.filterItems : state.data;
    if (data.length === 0) return <div>No Product Available</div>;
    return data.map((product: Product) => (
      <div data-testid="product-item" key={product.id} className="Cart-Items">
        <div className="image-box">
          <img src={product.img} style={{ height: "120px" }} />
        </div>
        <div className="about">
          <p className="title">{product.name}</p>
          <p className="subtitle">{product.price}</p>
        </div>
        <div className="counter">
          <div
            onClick={() => {
              decrementHandler(product.id);
            }}
            className="btn"
          >
            -
          </div>
          <div className="count">{product.quantity}</div>
          <div
            onClick={() => {
              incrementHandler(product.id);
            }}
            className="btn"
          >
            +
          </div>
        </div>
        <div className="prices">
          <div className="amount">${product.price}</div>
        </div>
      </div>
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
    return <div>Something wen't wrong</div>;
  }
  return (
    <main className="wrapper">
      <div className="CartContainer">
        <div className="Header">
          <h3 className="Heading">Shopping Cart</h3>
        </div>
        <select
          onChange={changeHandler}
          className="form-select"
          aria-label="Default select example"
        >
          <option value="">Select one color</option>
          <option value="Red">Red</option>
          <option value="Black">Black</option>
          <option value="Stone">Stone</option>
        </select>
        {renderProducts()}
        <div className="checkout">
          <div className="total">
            <div>
              <div className="Subtotal">Total</div>
            </div>
            <div className="total-amount">${state.sum}</div>
          </div>
          <button className="button">Checkout</button>
        </div>
      </div>
    </main>
  );
};

export default ProductsList;
