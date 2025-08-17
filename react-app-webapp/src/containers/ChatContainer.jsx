import { useEffect, useState } from "react";
import apiService from "../services/api";
import { getUserData } from "../utils/auth";
import ChatComponent from "../components/ChatComponent";

const Chat = () => {
  
  const [realMessages, setRealMessages] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const userData = getUserData();

  const [fakeChat] = useState([
    {
      id: 'fake-1',
      text: "Tja tja, hur mår du?",
      avatar: "https://i.pravatar.cc/100?img=14",
      username: "Johnny",
      conversationId: null,
      userId: 'fake-user-id',
      createdAt: new Date(Date.now() - 3600000).toISOString() // 1 timme sedan
    },
    {
      id: 'fake-2', 
      text: "Hallå!! Svara då!!",
      avatar: "https://i.pravatar.cc/100?img=14",
      username: "Johnny",
      conversationId: null,
      userId: 'fake-user-id',
      createdAt: new Date(Date.now() - 1800000).toISOString() // 30 min sedan
    },
    {
      id: 'fake-3',
      text: "Sover du eller?! 😴",
      avatar: "https://i.pravatar.cc/100?img=14", 
      username: "Johnny",
      conversationId: null,
      userId: 'fake-user-id',
      createdAt: new Date(Date.now() - 900000).toISOString() // 15 min sedan
    }
  ]);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      setIsLoading(true);
      const data = await apiService.getMessages();
      setRealMessages(data);
    } catch (error) {
      setError('Kunde inte ladda meddelanden.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (text) => {
    try {
      await apiService.createMessage(text);
      setError('');
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

   // Kombinera fejkade och riktiga meddelanden, sortera efter tid
  const allMessages = [...fakeChat, ...realMessages].sort((a, b) => 
    new Date(a.createdAt) - new Date(b.createdAt)
  );

  if (isLoading) {
    return (
      <div>Laddar meddelanden...</div>
    )
  };

  return (
    <ChatComponent
      handleSendMessage={handleSendMessage}
      handleDeleteMessage={handleDeleteMessage}
      allMessages={allMessages}
      userData={userData}
      error={error}
    />
  );
};

export default Chat;