import { Fragment } from "react";
import styles from "../NavRow/NavRow.module.css";
import NavigationButton from "../NavButton/NavButton";

export default function NavigationRow({ buttons, style }) {
  const updatedButtons = buttons.map((button, index) => ({
    ...button,
    isPrimary: index === buttons.length - 1, // without Mutation
  }));

  const truncateText = (text, maxLength = 10) =>
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  return (
    <div className={styles.navigationRow} style={style}>
      {updatedButtons.map((button, index) => (
        <Fragment key={button.route || `${button.text}-${index}`}>
          <NavigationButton
            style={{ maxWidth: "100%" }}
            text={truncateText(button.text)}
            route={button.route}
            isPrimary={button.isPrimary}
          />

          {index < updatedButtons.length - 1 && <hr />}
        </Fragment>
      ))}
    </div>
  );
}
