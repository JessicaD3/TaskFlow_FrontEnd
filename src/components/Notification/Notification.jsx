import { useNotifications } from '../../contexts/NotificationContext';
import styles from './Notification.module.css';

function Notification() {
  const { notifications, removeNotification } = useNotifications();

  if (notifications.length === 0) return null;

  return (
    <div className={styles.container}>
      {notifications.map((n) => (
        <div key={n.id} className={`${styles.notification} ${styles[n.type]}`}>
          <span>{n.message}</span>
          <button type="button" onClick={() => removeNotification(n.id)}>x</button>
        </div>
      ))}
    </div>
  );
}

export default Notification;