import React, { useContext } from "react";
import classes from "./MealItem.module.css";
import MealitemForm from "./MealitemForm";
import CartContext from "./../../../store/cart-context";

const MealItem = ({ name, description, price, id }) => {
  const mealPrice = `$${price.toFixed(2)}`;

  const cartCtx = useContext(CartContext);

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: id,
      name: name,
      amount: amount,
      price: price,
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <div className={classes.description}>{description}</div>
        <div className={classes.price}>{mealPrice}</div>
      </div>
      <div>
        <MealitemForm id={id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
