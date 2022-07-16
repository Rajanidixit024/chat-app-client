import './Chat.css';
import React, { useEffect, useState } from "react";
import ScrollToBottom from 'react-scroll-to-bottom';

function Chat({socket,username,room}) {
  const [currentmessage,setCurrentMessage] = useState("");
  const [messageList , setMessageList] = useState([]);

  const sendMessage = async () => {
    if(currentmessage !== ""){
      const messageData = {
          room : room,
          author : username,
          message : currentmessage,
          time : new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
          };
      await socket.emit("send_message",messageData);
      setMessageList((list) => [...list,messageData]);
      setCurrentMessage("");
    }
  }
  
  useEffect(() => {
    const eventListener = (data) => {
    setMessageList((list) => [...list, data]);
    };
    socket.on("receive_message", eventListener);
    return () => socket.off("receive_message", eventListener);
    }, [socket]);
    
  return(
  <div className="Chat">
    <div className="Chat_header">
        <p>Chit Chat</p>
    </div>
    <div className="Chat_body">
      <ScrollToBottom className='container'>
      {messageList.map((messageContent) => {
      return(
        <div className='message' id={username === messageContent.author ? "you" :"other"}>
          <div className='complete-message'>
            <div className='message-author'>
              <p><b>{messageContent.author}</b></p>
            </div>
            <div className='message-box'>
              <p>{messageContent.message}</p>
            </div>
            <div className='message-time'>
              <p>{messageContent.time}</p>
            </div>
          </div>
        </div>
        )
       })}
      </ScrollToBottom>
      </div>
        <div className="Chat_footer">
          <input 
            type="text" 
            value={currentmessage} 
            placeholder="Enter your Message..."
            onChange={(e) => {  setCurrentMessage(e.target.value);   }}
            onKeyPress={(event) => {  event.key === "Enter" && sendMessage();  }}/>
          <button onClick={sendMessage}>&#9658;</button>
        </div>
        
      </div>
      
      )}


export default Chat;