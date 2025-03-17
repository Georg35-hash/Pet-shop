import { useState } from "react";

import styles from "./Button.module.css";

function Button({ initialText, clickedText, onClick, dependencies, style }) {
  const [text, setText] = useState(initialText);
  const [isButtonDisabled, setButtonState] = useState(false);

  return (
    <button
      className={styles.button}
      onClick={() => {
        setText(clickedText);
        onClick(dependencies);

        setButtonState(true);
      }}
      disabled={isButtonDisabled}
      style={style}
    >
      {text}
    </button>
  );
}

export default Button;
