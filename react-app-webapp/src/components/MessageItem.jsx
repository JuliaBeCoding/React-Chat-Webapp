const MessageItem = ({message, isOwn, onDelete}) => {
  // Endast egna meddelanden går att radera.
  const canDelete = isOwn;

  return (
    <div className={`message ${isOwn ? 'message-own' : 'message-other'}`}>
      <div className="message-content">
        <div className="message-header">
          <span className="message-user">{message.username}</span>
          <span className="message-time">
            {new Date(message.createdAt).toLocaleTimeString()}
          </span>
        </div>
        <div className="message-text">{message.text}</div>
        
        {canDelete && (
          <button 
            onClick={() => onDelete(message.id)}
            className="delete-btn"
          >
            Radera
          </button>
        )}
      </div>
    </div>
  )
};

export default MessageItem;