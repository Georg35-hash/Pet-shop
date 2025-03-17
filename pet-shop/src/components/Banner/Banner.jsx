import Button from "../Button/Button";
import styles from "../Banner/Banner.module.css";
export default function Banner() {
  return (
    <section className={styles.bannerSection}>
      <div className={styles.bannerContainer}>
        <h1 className={styles.bannerDescription}>
          Amazing Discounts on Pets Products!
        </h1>
        <Button
          style={{ padding: "16px 56px" }}
          initialText="Check out"
          clickedText="Redirecting..."
          className={styles.bannerButton}
        />
      </div>
    </section>
  );
}
