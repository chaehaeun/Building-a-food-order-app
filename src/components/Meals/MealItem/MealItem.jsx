import React from "react";
import classes from "./MealItem.module.css";
import MealitemForm from "./MealitemForm";

const MealItem = ({ name, description, price, id }) => {
  const mealPrice = `$${price.toFixed(2)}`;

  return (
    <li className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <div className={classes.description}>{description}</div>
        <div className={classes.price}>{mealPrice}</div>
      </div>
      <div>
        <MealitemForm id={id} />
      </div>
    </li>
  );
};

export default MealItem;
