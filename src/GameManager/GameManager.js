import React, { useEffect } from 'react'
import "./gameManager.scss"
import { useDispatch, useSelector } from 'react-redux'
import { gameStatus } from "../redux/gameStatus"
import { reset } from "../Backend/Backend"


function GameManager() {
    const dispatch = useDispatch();
    const {status} = useSelector((state) => state.status);
    const { userSelect } = useSelector((state) => state.userSelect);
    const { opponentSelect } = useSelector((state) => state.opponentSelect);

    function resetGame(){
        dispatch(gameStatus("reset"));
    }

    useEffect(()=>{
        if(userSelect === -1 && opponentSelect === -1 && status === "reset"){
            dispatch(gameStatus(""));
            reset();
        }
    },[userSelect, opponentSelect, status])

  return (
    <div className='GameManager'>
        {(status) && 
        <button className='RestartButton' onClick={resetGame}>
            <span>RESTART</span>
        </button>}
    </div>
  )
}

export default GameManager