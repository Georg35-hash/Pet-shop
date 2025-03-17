import styles from "../Notif/Notif.module.css";
import CloseIcon from "@mui/icons-material/Close";

export default function Notifi({
  notification,
  setNotification,
  onClose = () => {},
}) {
  const handleClose = () => {
    setNotification({ ...notification, isShown: false });
    onClose();
  };

  return (
    notification.isShown && (
      <div className={styles.overlay} onDoubleClick={handleClose}>
        <div
          className={styles.notification}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.message}>
            <div className={styles.text}>
              <span>{notification.title}</span>
              <p>{notification.message}</p>
            </div>
            <button className={styles.closeButton} onClick={handleClose}>
              <CloseIcon />
            </button>
          </div>
        </div>
      </div>
    )
  );
}
