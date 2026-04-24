import type { Notification } from '../types/models';

interface NotificationItemProps {
  notification: Notification;
}

function NotificationItem({ notification }: NotificationItemProps) {
  return (
    <article className={`card notification-item ${notification.read ? '' : 'unread'}`}>
      <h4>{notification.title}</h4>
      <p>{notification.body}</p>
      <p className="muted">
        {notification.type.replace('_', ' ')} · {notification.created_at}
      </p>
    </article>
  );
}

export default NotificationItem;
