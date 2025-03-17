import { Fragment } from "react";
import styles from "../NavRow/NavRow.module.css";
import NavigationButton from "../NavButton/NavButton";

function NavigationRow({ buttons, style }) {
  const updatedButtons = buttons.map((button, index) => ({
    ...button,
    isPrimary: index === buttons.length - 1, // without Mutation
  }));

  return (
    <div className={styles.navigationRow} style={style}>
      {updatedButtons.map((button, index) => (
        <Fragment key={button.text}>
          <NavigationButton
            text={button.text}
            route={button.route}
            isPrimary={button.isPrimary}
          />
          {index < updatedButtons.length - 1 && <hr />}
        </Fragment>
      ))}
    </div>
  );
}

export default NavigationRow;
