import React from 'react';

type IProps= {
     sum : number
}
export default function Footer(props:IProps):JSX.Element {
  return (
    <div className="checkout">
      <div className="total">
        <div>
          <div className="Subtotal">Total</div>
        </div>
        <div className="total-amount">
          $
          {props.sum ? props.sum.toFixed(2) : 0}
        </div>
      </div>
    </div>
  );
}
