import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaulteCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      const updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.amount; // 총합을 계산

      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      ); //배열에서 항목의 인덱스를 찾아줌

      const existingCartItem = state.items[existingCartItemIndex]; //찾은 인덱스의 항목을 변수에 저장

      let updatedItems;

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.item.amount, // 기존의 항목의 수량에 새로운 항목의 수량을 더해줌
        };
        updatedItems = [...state.items]; // 기존의 항목을 복사해서 저장
        updatedItems[existingCartItemIndex] = updatedItem; // 기존의 항목을 새로운 항목으로 교체
      } else {
        updatedItems = state.items.concat(action.item); //
      }

      return { items: updatedItems, totalAmount: updatedTotalAmount }; //새로운 항목을 추가한 배열과 총합을 리턴
    }
    case "REMOVE": {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.id
      ); //배열에서 항목의 인덱스를 찾아줌

      const existingCartItem = state.items[existingCartItemIndex];

      const updatedTotalAmount = state.totalAmount - existingCartItem.price;

      let updatedItems;

      if (existingCartItem.amount === 1) {
        updatedItems = state.items.filter(
          (item) => item.id !== action.id // id가 일치하지 않는 항목만 필터링해서 새로운 배열을 만듦
        );
      } else {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount - 1, // 기존의 항목의 수량에 새로운 항목의 수량을 빼줌
        };

        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      }
      return { items: updatedItems, totalAmount: updatedTotalAmount };
    }

    default:
      return defaulteCartState;
  }
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaulteCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
