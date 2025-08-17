import SideNav from "./SideNav";
import MessageForm from "./MessageForm";
import MessageItem from "./MessageItem";

const ChatComponent = ({handleSendMessage, handleDeleteMessage, allMessages, userData, error}) => {

  const openNav = () => {
    document.getElementById("mySideNav").style.width = "300px";
  };

  const closeNav = () => {
    document.getElementById("mySideNav").style.width = "0";
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chat med Johnny</h2>
        <div className="user-info" onClick={openNav}>
          <img src={userData?.userInfo?.avatar} alt="Avatar" width="40" height="40" />
          <p>{userData?.userInfo?.user}</p>
        </div>
      </div>

      <SideNav onClose={closeNav} userData={userData} />

      <div className="chat-main">
        {error && <div className="error">{error}</div>}

        <div className="messages-container">
          {allMessages.map((message) => (
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
  )
};

export default ChatComponent