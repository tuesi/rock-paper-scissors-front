import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { result } from "../redux/result"
import { mode } from "../redux/gameMode"
import './status.scss'

export default function Status() {
    const { userSelect } = useSelector((state) => state.userSelect);
    const { opponentSelect } = useSelector((state) => state.opponentSelect);
    const { result } = useSelector((state) => state.result);
    const { mode } = useSelector((state) => state.mode);
    const { status } = useSelector((state) => state.status);
    const [winSate, setWinState] = useState("Waiting for user");

    useEffect(()=>{
        if(status === "game"){
            if(mode != "royal"){
                calculateStatus(userSelect, opponentSelect);
            }
            else{
                royalWinStatus(result);
            }
            
        }
        if(status === "reset"){
            setWinState("Waiting for user");
        }
    },[status, mode])

    function calculateStatus(p1, p2){
        if((p1+1)%3 === p2){
            //p2 won
            setWinState("Opponent won");
        } else if(p1 === p2){
            //draw
            setWinState("Draw");
        } else {
            //p1 won
            setWinState("You won!");
        }
    }

    function royalWinStatus(res){
        switch(res){
            case 0:
                setWinState("Opponent won");
                break;
            case 1:
                setWinState("You won!");
                break;
            case 2:
                setWinState("Draw");
                break;
        }
    }

  return (
    <div className='Status'>
        <p className='statusText'>{winSate}</p>
    </div>
  )
}
