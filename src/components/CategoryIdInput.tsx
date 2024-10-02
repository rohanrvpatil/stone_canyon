// main
import { useState, useRef } from "react";

//styles
import styles from "../styles/CategoryIdInput.module.css";

// components

function CategoryIdInput() {
  const [categoryId, setCategoryId] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (inputRef.current) {
      setCategoryId(inputRef.current.value);
      console.log("Submitted Category ID:", inputRef.current.value);
    }
  };

  return (
    <>
      <form className={styles.form}>
        <label>Category ID:</label>
        <input
          className={styles.input}
          type="text"
          placeholder="Category ID"
          ref={inputRef}
        />
        <button className={styles.button} onClick={handleButtonClick}>
          Submit
        </button>
      </form>
    </>
  );
}

export default CategoryIdInput;
