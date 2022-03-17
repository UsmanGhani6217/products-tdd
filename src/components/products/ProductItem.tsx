/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
import React from "react";
import { ProductProps } from "../../interface/api/products";

type IProps = ProductProps & {
  countHandler: (type: string, id:number) => void
}
function ProductItem(props: IProps): JSX.Element {
  return (
    <div
      data-testid="product-item"
      key={props.product.id}
      className=" mx-auto Cart-Items"
    >
      <div className="image-box">
        <img
          src={props.product.img}
          alt=""
          style={{ width: "120px", height: "120px" }}
        />
      </div>
      <div className="about">
        <p className="title">{props.product.name}</p>
        <p className="subtitle">{props.product.price}</p>
      </div>
      <div className="counter">
        <div
          onClick={() => {
            props.countHandler("decrement", props.product.id);
          }}
          aria-hidden="true"
          className="btn btn-danger"
        >
          -
        </div>
        <div className="count">{props.product.quantity}</div>
        <div
          onClick={() => {
            props.countHandler("increment", props.product.id);
          }}
          aria-hidden="true"
          className="btn btn-success"
        >
          +
        </div>
      </div>
      <div className="prices">
        <div className="amount">
          $
          {props.product.price}
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
