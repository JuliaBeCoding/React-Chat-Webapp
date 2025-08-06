import { useEffect, useState } from "react";
import apiService from "../services/api";
import { getUserData } from "../utils/auth";
import MessageItem from '../components/MessageItem';
import MessageForm from '../components/MessageForm';

const Chat = () => {
  
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const userData = getUserData();

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      setIsLoading(true);
      const data = await apiService.getMessages();
      setMessages(data);
    } catch (error) {
      setError('Kunde inte ladda meddelanden.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (text) => {
    try {
      await apiService.createMessage(text);
      loadMessages();
    } catch (error) {
      setError('Kunde inte skicka meddelande.')
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      await apiService.deleteMessage(messageId);
      loadMessages();
    } catch (error) {
      setError('Kunde inte radera meddelande.');
    }
  };

  if (isLoading) {
    return (
      <div>Laddar meddelanden...</div>
    )
  };

  return (
    <div className="chat-container">
      <SideNav userData={userData} />
      
      <div className="chat-main">
        <div className="chat-header">
          <h2>Chat</h2>
          <div className="user-info">
            <img src={userData?.userInfo?.avatar} alt="Avatar" width="40" height="40" />
            <span>{userData?.userInfo?.user}</span>
          </div>
        </div>

        {error && <div className="error">{error}</div>}

        <div className="messages-container">
          {messages.map((message) => (
            <MessageItem
              key={message.id}
              message={message}
              isOwn={message.userId === userData?.userInfo?.id}
              onDelete={handleDeleteMessage}
            />
          ))}
        </div>

        <MessageForm onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default Chat;