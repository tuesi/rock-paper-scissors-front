import React, { useEffect } from "react";
import "./app.scss"
import UserControls from "../UserControls/UserControls"
import Opponent from "../Opponent/Opponent";
import Status from "../Status/Status";
import socketClient from "socket.io-client";
import GameManager from "../GameManager/GameManager";
const SERVER = "http://192.168.0.131:8080";
function App() {

  // const socket = socketClient(SERVER);

  // useEffect(() => {
  //   socket.on('connection', () => {
  //     socket.emit('join', socket.id);
  //   });
  // },[])

  // function sendChoice(choice) {
  //   socket.emit('choice', socket.id, choice);
  // }

  return (
    <div className="App">
      <UserControls />
      <Status />
      <Opponent />
      <GameManager />
    </div>
  );
}

export default App;
