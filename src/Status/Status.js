import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './status.scss'

export default function Status() {
    const { userSelect } = useSelector((state) => state.userSelect);
    const { opponentSelect } = useSelector((state) => state.opponentSelect);
    const { status } = useSelector((state) => state.status);
    const [winSate, setWinState] = useState("Waiting for user");

    useEffect(()=>{
        if(status === "game"){
            calculateStatus(userSelect, opponentSelect);
        }
        if(status === "reset"){
            setWinState("Waiting for user");
        }
    },[status])

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

  return (
    <div className='Status'>
        <p className='statusText'>{winSate}</p>
    </div>
  )
}
