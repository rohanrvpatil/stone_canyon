// main
import { useState, useRef } from "react";

//styles
import styles from "../styles/CategoryIdInput.module.css";

// components
import Chatbot from "../Chatbot/Chatbot";

function CategoryIdInput() {
  const [categoryId, setCategoryId] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (inputRef.current) {
      const number_categoryId = Number(inputRef.current.value);
      setCategoryId(number_categoryId);
      // console.log("Submitted Category ID:", inputRef.current.value);
    }
  };

  return (
    <>
      <form className={styles.form}>
        <label style={{ color: "black" }}>Category ID:</label>
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
      <Chatbot categoryId={categoryId} />
    </>
  );
}

export default CategoryIdInput;
