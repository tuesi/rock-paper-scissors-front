import React, { useEffect, useState } from "react";
import "./app.scss"
import UserControls from "../UserControls/UserControls"
import Opponent from "../Opponent/Opponent";
import Status from "../Status/Status";
import GameManager from "../GameManager/GameManager";
import User from "../User/User";
import ModeSelect from "../ModeSelect/ModeSelect";
import { useSelector } from 'react-redux';
import Backend from '../Backend/Backend';

function App() {

  const { usernameSelect } = useSelector((state) => state.usernameSelect);
  const { mode } = useSelector((state) => state.mode);
  const [showGame, setShowGame] = useState(false);
  const [showModeSelect, setShowModeSelect] = useState(true);

  useEffect(()=>{
    if(usernameSelect !== "" && mode !== ""){
      setShowGame(true);
    }
    if(mode === "single"){ setShowModeSelect(false); setShowGame(true); return};
    if(mode === "vs") { setShowModeSelect(false); return};
    if(mode === "royal"){ setShowModeSelect(false); return};
  },[usernameSelect, mode])

  return (
    <div className="App">
      <Backend />
      {(showModeSelect) ? 
      <ModeSelect /> :
      <>
        {(showGame) ?
        <>
          <UserControls />
          <Status />
          <Opponent />
          <GameManager />
        </>
          :
        <>
          <User />
        </>
        }
      </>
      }
    </div>
  );
}

export default App;
