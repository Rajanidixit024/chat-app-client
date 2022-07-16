import './App.css';
import io from 'socket.io-client';
import { useState } from "react";
import Chat from './Chat';

const socket = io.connect("http://localhost:8000");

function App(){
const [username, setUsername] = useState("");
const [room, setRoom] = useState("");
const [showChat, setShowChat] = useState("");

const joinRoom = () => {
  if(username !== "" && room !== ""){
    socket.emit("join_room" ,room);
    setShowChat(true);
  }
};

return (
  <div className="App">
    {!showChat ? (
    <div className='Join-chat'>
    <h3>Join Chat</h3>
    <input
      type="text"
      placeholder="Enter Name..."
      onChange={(e) =>{setUsername(e.target.value);}} />
    <input 
      type="text" 
      placeholder="Room id..."
      onChange={(e) => {setRoom(e.target.value);}} />
      <button onClick={joinRoom}>Join To Chat</button>
    </div> )
      :
    (<Chat socket={socket} username={ username } room={room} />)}
  </div>
  );
}
export default App;
