import { useState } from "react";
import DOMPurify from 'dompurify';

const MessageForm = ({onSendMessage}) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text.trim()) {
      const sanitizedText = DOMPurify.sanitize(text.trim());
      onSendMessage(sanitizedText);
      setText('');
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="message-form">
        <input 
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Skriv meddelande här"
          required
        />
        <button type="submit">Skicka</button>
      </form>
    </>
  )
};

export default MessageForm;