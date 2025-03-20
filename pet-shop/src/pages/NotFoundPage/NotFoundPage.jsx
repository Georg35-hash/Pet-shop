import i404 from "../../assets/404.png";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import styles from "../NotFoundPage/NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <div className={styles.notFoundPage}>
      <div className={styles.notFoundPageTop}>
        <img src={i404} alt="issue 404" />
      </div>
      <div className={styles.notFoundPageBottom}>
        <h2>Page Not Found</h2>
        <p>
          We’re sorry, the page you requested could not be found. Please go back
          to the homepage.
        </p>
        <Link to="/">
          <Button initialText="Go to home" clickedText="Redirecting..." />
        </Link>
      </div>
    </div>
  );
}
