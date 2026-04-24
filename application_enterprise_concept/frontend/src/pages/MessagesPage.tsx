import MessageThread from '../components/MessageThread';
import { currentUserId, getListingById, getUserById, messages } from '../data/mockData';

function MessagesPage() {
  const threads = Array.from(new Set(messages.map((message) => message.thread_id)));
  const selectedThreadId = threads[0];
  const selectedMessages = messages.filter((message) => message.thread_id === selectedThreadId);
  const contextListing = getListingById(selectedMessages[0].listing_id);
  const peerId =
    selectedMessages[0].sender_id === currentUserId
      ? selectedMessages[0].receiver_id
      : selectedMessages[0].sender_id;

  return (
    <section className="messages-layout">
      <aside className="card inbox-pane">
        <h3>Inbox</h3>
        {threads.map((threadId) => {
          const threadMessage = messages.find((message) => message.thread_id === threadId);
          const participantId =
            threadMessage?.sender_id === currentUserId
              ? threadMessage.receiver_id
              : threadMessage?.sender_id;
          return (
            <div className={`thread-item ${threadId === selectedThreadId ? 'active' : ''}`} key={threadId}>
              <strong>{getUserById(participantId ?? '')?.full_name}</strong>
              <p className="muted">{threadMessage?.body}</p>
            </div>
          );
        })}
      </aside>
      <div className="card chat-pane">
        <h3>Conversation with {getUserById(peerId)?.full_name}</h3>
        <MessageThread messages={selectedMessages} currentUserId={currentUserId} />
      </div>
      <aside className="card context-pane">
        <h4>Listing Context</h4>
        <p>{contextListing?.title}</p>
        <p className="muted">${contextListing?.price.toFixed(2)}</p>
        <button type="button" className="button button-secondary">
          View Listing
        </button>
      </aside>
    </section>
  );
}

export default MessagesPage;
