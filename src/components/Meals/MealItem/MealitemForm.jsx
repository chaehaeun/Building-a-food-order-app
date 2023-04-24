import React, { useRef, useState } from "react";
import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";

const MealitemForm = ({ id, onAddToCart }) => {
  const amountInputRef = useRef();
  const [amountIsValid, setAmountIsValid] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    onAddToCart(enteredAmountNumber);
  };

  const input = {
    id: "amount_" + id,
    type: "number",
    min: "1",
    max: "5",
    step: "1",
    defaultValue: "1",
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input label="Amount" ref={amountInputRef} input={input} />
      <button>+ Add</button>
      {amountIsValid ? null : <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealitemForm;
