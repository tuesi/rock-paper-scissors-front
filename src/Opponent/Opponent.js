import React, { useEffect, useState } from 'react'
import './opponent.scss'
import Rock from "../assets/rock.png"
import Paper from "../assets/paper.png"
import Scissors from "../assets/scissors.png"
import { useDispatch, useSelector } from 'react-redux'
import { opponent } from "../redux/opponentSelection"
import { gameStatus } from "../redux/gameStatus"

function Opponent() {

    const [pos, setPos] = useState(0);
    const [selected, setSelected] = useState("");
    const [changeSate, setChangeSate] = useState(false);
    const [isActive, setActive] = useState(true);
    const [location, setLocation] = useState(0);
    const [endLoop, setEndLoop] = useState(false);
    const dispatch = useDispatch();
    const { userSelect } = useSelector((state) => state.userSelect);
    const { status } = useSelector((state) => state.status);

    //TIMER
    useEffect(() => {
        let timer = null;
        if(isActive){
            timer = setInterval(() => {
                move();
            }, 1)
        } else if (!isActive){
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    },[isActive])

    //LOOP STATE
    useEffect(() => {
        if(pos <= -300 && !changeSate){
            setPos(0);
        }
        else if(pos <= -300 && changeSate){
            setPos(0);
            setEndLoop(true);
            switch(selected){
                case "rock":
                    setLocation(0);
                    break;
                case "paper":
                    setLocation(-100);
                    break;
                case "scissors":
                    setLocation(-200);
                    break;
            }
        }
        else if(pos <= location && changeSate && endLoop){
            dispatch(gameStatus("game"));
            setActive(false);
        }
    }, [pos])

    useEffect(() => {
        if(userSelect !== -1){
            getRandomSelect();
        }
        if(status === "reset"){
            setActive(true);
            setEndLoop(false);
            setChangeSate(false);
            setSelected("");
            dispatch(opponent(-1));
        }
    },[userSelect, status])

    function onSelect(item){
        setChangeSate(true);
        setSelected(item);
    }

    function move(){
        setPos(pos => pos - 1);
    }

    function getRandomSelect(){
        switch(getRandomInt(3)){
            case 0:
                dispatch(opponent(0));
                onSelect("rock");
                break;
            case 1:
                dispatch(opponent(1));
                onSelect("paper");
                break;
            case 2:
                dispatch(opponent(2));
                onSelect("scissors");
                break;
        }
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }

    //paper -100%, rock 0, scissors -200, full rotation -300
    return (
        <div className='Opponent'>
                <div className='Choice'>
                    <ul style={{top: pos+'%'}}>
                        <li><img className='OpponentImage' src={Rock} alt='rock'/></li>
                        <li><img className='OpponentImage' src={Paper} alt='paper'/></li>
                        <li><img className='OpponentImage' src={Scissors} alt='scissors'/></li>
                        <li><img className='OpponentImage' src={Rock} alt='rock'/></li>
                    </ul>
                </div>
        </div>
    )
}

export default Opponent