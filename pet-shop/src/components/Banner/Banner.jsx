import Button from "../Button/Button";
import styles from "../Banner/Banner.module.css";
import { Link } from "react-router-dom";
export default function Banner() {
  return (
    <section className={`${styles.bannerSection} hidden`}>
      <div className={styles.bannerContainer}>
        <h1 className={styles.bannerDescription}>
          Amazing Discounts on Pets Products!
        </h1>
        <Link to="/allsales">
          <Button
            style={{ padding: "16px 56px" }}
            initialText="Check out"
            clickedText="Redirecting..."
            className={styles.bannerButton}
          />
        </Link>
      </div>
    </section>
  );
}
