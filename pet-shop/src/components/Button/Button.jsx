import { useState } from "react";

import styles from "./Button.module.css";

function Button({ initialText, clickedText, onClick, dependencies, style }) {
  const [text, setText] = useState(initialText);
  const [isButtonDisabled, setButtonState] = useState(false);

  const handleClick = () => {
    setText(clickedText);
    onClick(dependencies);

    setButtonState(true);

    setTimeout(() => {
      setText(initialText);
      setButtonState(false);
    }, 1000);
  };

  return (
    <button
      className={styles.button}
      onClick={handleClick}
      disabled={isButtonDisabled}
      style={style}
    >
      {text}
    </button>
  );
}

export default Button;
