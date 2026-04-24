import NotificationItem from '../components/NotificationItem';
import { notifications } from '../data/mockData';

function NotificationsPage() {
  return (
    <section>
      <div className="page-header">
        <h1>Notifications</h1>
        <p>Outbid alerts, message alerts, listing activity, and trust/safety updates.</p>
      </div>
      <div className="stack">
        {notifications.map((notification) => (
          <NotificationItem key={notification.notification_id} notification={notification} />
        ))}
      </div>
    </section>
  );
}

export default NotificationsPage;
