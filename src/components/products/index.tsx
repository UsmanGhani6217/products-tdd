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
      fetch(`https://my-json-server.typicode.com/benirvingplt/products/products`)
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
    let payload;
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      const quantity = element["quantity"] ? element.quantity : 0;
      const itemPrice = quantity * element.price;
      sum = sum + itemPrice;
    }
    if (isFilter) {
      payload = { ...state, filterItems: data, isFilter: true, sum };
    } else {
      payload = { ...state, data, isFilter, sum };
    }
    setState(payload);
  };
  const countHandler = (type: string, id: number) => {
    const cloneData = [...state.data];
    cloneData.forEach((item) => {
      if (item.id === id && type === "increment") {
        item.quantity = item.quantity ? item.quantity + 1 : 1;
      } else if (item.id === id && type === "decrement") {
        item.quantity =
          item.quantity && item.quantity > 0 ? item.quantity - 1 : 0;
      }
    });
    const payload = state.isFilter ? state.filterItems : cloneData;
    getTotal(payload, state.isFilter);
  };
  const changeHandler = (e: any) => {
    if (e.currentTarget.value) {
      const data = state.data;
      const result = data.filter((x) => x.colour === e.currentTarget.value);
      getTotal(result, true);
    } else {
      getTotal(state.data, false);
    }
  };
  const renderProducts: () => JSX.Element[] | JSX.Element = () => {
    const data = state.isFilter ? state.filterItems : state.data;
    if (data.length === 0) return <div>No Product Available</div>;
    return data.map((product: Product) => (
      <div
        data-testid="product-item"
        key={product.id}
        className=" mx-auto Cart-Items"
      >
        <div className="image-box">
          <img src={product.img} style={{ width: "120px", height: "120px" }} />
        </div>
        <div className="about">
          <p className="title">{product.name}</p>
          <p className="subtitle">{product.price}</p>
        </div>
        <div className="counter">
          <div
            onClick={() => {
              countHandler("decrement", product.id);
            }}
            className="btn btn-danger"
          >
            -
          </div>
          <div className="count">{product.quantity}</div>
          <div
            onClick={() => {
              countHandler("increment", product.id);
            }}
            className="btn btn-success"
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
          <h1 className="text-center">Shopping Cart</h1>
          <div className="custom-select">
          <select
            onChange={changeHandler}
            className="form-select mb-10"
            aria-label="Default select example"
          >
            <option value="">Select one color</option>
            <option value="Red">Red</option>
            <option value="Black">Black</option>
            <option value="Stone">Stone</option>
          </select>
          </div>
        </div>

        {renderProducts()}
        <div className="checkout">
          <div className="total">
            <div>
              <div className="Subtotal">Total</div>
            </div>
            <div className="total-amount">
              ${state.sum ? state.sum.toFixed(2) : 0}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductsList;
