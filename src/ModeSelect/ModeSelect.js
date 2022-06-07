import React from 'react'
import "./modeSelect.scss"
import { useDispatch } from 'react-redux'
import { gameMode } from "../redux/gameMode"

function ModeSelect() {
    const dispatch = useDispatch();

    function selectMode(mode){
        dispatch(gameMode(mode));
    }
  return (
    <div className='ModeSelect'>
        <button className='ModeButton' onClick={()=>{selectMode("single")}}><span>SINGLEPLAYER</span></button>
        <button className='ModeButton' onClick={()=>{selectMode("vs")}}><span>1 VS 1</span></button>
        <button className='ModeButton' onClick={()=>{selectMode("royal")}}><span>ROYAL</span></button>
    </div>
  )
}

export default ModeSelect