import { getUserById } from '../data/mockData';
import type { Message } from '../types/models';

interface MessageThreadProps {
  messages: Message[];
  currentUserId: string;
}

function MessageThread({ messages, currentUserId }: MessageThreadProps) {
  return (
    <div className="message-thread">
      {messages.map((message) => {
        const sender = getUserById(message.sender_id);
        const mine = message.sender_id === currentUserId;
        return (
          <div key={message.message_id} className={`chat-bubble ${mine ? 'mine' : ''}`}>
            <p>{message.body}</p>
            <p className="muted">
              {sender?.full_name} · {message.created_at}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default MessageThread;
