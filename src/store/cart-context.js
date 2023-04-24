import React from "react";

const CartContext = React.createContext({
  // 자동완성 편하게 하려고 기본값 초기화
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
});

export default CartContext;
