import React, { useEffect, useState } from 'react'
import './opponent.scss'
import Rock from "../assets/rock.png"
import Paper from "../assets/paper.png"
import Scissors from "../assets/scissors.png"
import Out from "../assets/out.png";
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
    const [isOnline, setIsOnline] = useState(false);
    const [royal, setRoyal] = useState(false);
    const dispatch = useDispatch();
    const { userSelect } = useSelector((state) => state.userSelect);
    const { status } = useSelector((state) => state.status);
    const { mode } = useSelector((state) => state.mode);
    const { playerCount } = useSelector((state) => state.playerCount);
    const { opponentSelect } = useSelector((state) => state.opponentSelect);
    const { usernames } = useSelector((state) => state.usernames);
    const { eliminations } = useSelector((state) => state.eliminations);
    //LOOP POS, END POS, LOOP STATE, SELECTION
    //[0,0,"active","rock","playing"]
    const [playerLoop, setPlayerLoop] = useState([]);

    //TIMER
    useEffect(() => {
        let timer = null;
        if(isActive){
            timer = setInterval(() => {
                move();
            }, 5)
        } else if (!isActive){
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    },[isActive, playerLoop])

    //LOOP STATE ONE OPPONENT
    useEffect(() => {
        if(pos <= -75 && !changeSate){
            setPos(0);
        }
        else if(pos <= -75 && changeSate){
            setPos(0);
            setEndLoop(true);
            switch(selected){
                case "rock":
                    setLocation(0);
                    break;
                case "paper":
                    setLocation(-25);
                    break;
                case "scissors":
                    setLocation(-50);
                    break;
            }
        }
        else if(pos <= location && changeSate && endLoop){
            dispatch(gameStatus("game"));
            setActive(false);
        }
    }, [pos])

    //Update royal player count
    useEffect(() => {
        if(playerCount > 0 && playerLoop.length < playerCount){
            console.log(playerCount);
            var newPlayerLoop = [...playerLoop];
            for(var i = 0; i < playerCount - playerLoop.length; i++){
                newPlayerLoop = [...newPlayerLoop, [0,0,"active","","playing"]];
            }
            setPlayerLoop(newPlayerLoop);
        }
        else if(playerLoop.length > playerCount) {
            var newPlayerLoop = [...playerLoop];
            console.log(newPlayerLoop.length);
            console.log(playerCount);
            for(var i = 0; i < (newPlayerLoop.length > playerCount); i++) {
                newPlayerLoop.pop();
            }
            setPlayerLoop(newPlayerLoop);
        }
    },[playerCount]);

    //LOOP FOR ROYAL
    useEffect(() => {
        if(playerLoop.length > 0){
            if(playerLoop[0][0] <= -75 && !changeSate){
                playerLoop.forEach(index => {
                    let newArr = [...playerLoop];
                    let posIndex = newArr.indexOf(index);
                    let newVal = newArr[posIndex];
                    newVal[0] = 0;
                    newArr[posIndex] = newVal;
                    setPlayerLoop(newArr);
                });
                //setPlayerLoop(new Array(playerLoop.length).fill(0));
            }
            else if(playerLoop[0][0] <= -75 && changeSate){
                playerLoop.forEach(index => {
                    let newArr = [...playerLoop];
                    let posIndex = newArr.indexOf(index);
                    let newVal = newArr[posIndex];
                    newVal[0] = 0;
                    newArr[posIndex] = newVal;
                    setPlayerLoop(newArr);
                });
                setEndLoop(true);
                playerLoop.forEach(choice => {
                    let newArr = [...playerLoop];
                    let posIndex = newArr.indexOf(choice);
                    let newVal = newArr[posIndex];
                    switch(choice[3]){
                        case "rock":
                            newVal[1] = 0;
                            newArr[posIndex] = newVal;
                            setPlayerLoop(newArr);
                            break;
                        case "paper":
                            newVal[1] = -25;
                            newArr[posIndex] = newVal;
                            setPlayerLoop(newArr);
                            break;
                        case "scissors":
                            newVal[1] = -50;
                            newArr[posIndex] = newVal;
                            setPlayerLoop(newArr);
                            break;
                    }
                });
            }
            else if(changeSate && endLoop){
                let newArr = [...playerLoop];
                playerLoop.forEach(pos => {
                    if(pos[0] <= pos[1] && pos[2] !== "stop" && pos[2] !== "end"){
                        let posIndex = newArr.indexOf(pos);
                        let newVal = newArr[posIndex];
                        newVal[2] = "stop";
                        newArr[posIndex] = newVal;
                        setPlayerLoop(newArr);
                    }
                })
            }
            var statusCount = 0;
            playerLoop.forEach(status => {
                if(status[2] === "stop"){
                    let newArr = [...playerLoop];
                    let posIndex = newArr.indexOf(status);
                    let newVal = newArr[posIndex];
                    newVal[2] = "end";
                    newArr[posIndex] = newVal;
                    setPlayerLoop(newArr);
                }
                else if(status[2] === "end"){
                    statusCount++;
                }
            });
    
            if(statusCount >= playerLoop.length && status !== "game"){
                dispatch(gameStatus("game"));
                for(let i = 0; i < playerLoop.length; i++) {
                    let newArr = [...playerLoop];
                    let newVal = newArr[i];
                    newVal[4] = eliminations[i];
                    console.log(eliminations[i]);
                    newArr[i] = newVal;
                    setPlayerLoop(newArr);
                }
                setActive(false);
            }
        }
    }, [playerLoop])

    //ROYAL OPPONENT CHOICE
    useEffect(() => {
        if(royal){
            var newPlayerLoop = [...playerLoop];
            var count = 0;
            opponentSelect.forEach(select => {
                var playerStatus = newPlayerLoop[count];
                console.log(royalOpponentChoice(select));
                playerStatus[3] = royalOpponentChoice(select);
                console.log(playerStatus);
                console.log(count);
                newPlayerLoop[count] = playerStatus;
                count++;
            });
            setPlayerLoop(newPlayerLoop);
            setChangeSate(true);
            console.log(playerLoop);
        }
    },[opponentSelect])

    useEffect(() => {
        if(mode !== "single" && mode !== ""){
            setIsOnline(true);
            if(mode == "royal"){
                setRoyal(true);
            }
        }
    },[mode])

    //SINGLEPLAYER
    useEffect(() => {
        if(!isOnline){
            if(userSelect !== -1){
                getRandomSelect();
            }
            reset();
        }
    },[userSelect, status])

    useEffect(() => {
        if(isOnline){
            if(opponentSelect !== -1){
                setOpponentChoice(opponentSelect);
            }
            reset();
        }
    }, [opponentSelect, status])

    function onSelect(item){
        setChangeSate(true);
        setSelected(item);
    }

    function move(){
        if(royal){
            let newArr = [...playerLoop];
            let newVal;
            for(var i = 0; i < playerLoop.length; i++){
                newVal = newArr[i];
                if(newVal[2] !== "end"){
                    newVal[0] = newVal[0] - 0.3;
                    newArr[i] = newVal;
                }
            };
            setPlayerLoop(newArr);
        }
        else {
            setPos(pos => pos - 0.3);
        }
    }

    function reset(){
        if(status === "reset"){
            setActive(true);
            setEndLoop(false);
            setChangeSate(false);
            setSelected("");
            dispatch(opponent(-1));
        }
    }

    function getRandomSelect(){
        setOpponentChoice(getRandomInt(3));
    }

    function setOpponentChoice(choice){
        switch(choice){
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

    function royalOpponentChoice(choice){
        switch(choice){
            case 0:
                return "rock";
            case 1:
                return "paper";
            case 2:
                return "scissors";
        }
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }

    //paper -75%, rock 0, scissors -25, full rotation -50
    return (
        ((royal) ? 
            <div className='RoyalOpponent'>
                {playerLoop.map(playerPos => (
                    <div className='OpponentWrap' key={playerLoop.indexOf(playerPos)}>
                        <div className='Username'>
                            {usernames[playerLoop.indexOf(playerPos)]}
                        </div>
                        <div className='Choice' style={{width: "100px"}}>
                            {playerPos[4] === "playing" ? 
                                <ul style={{transform: `translateY(${playerPos[0]}%)`}}>
                                    <li><img className='OpponentImage' src={Rock} alt='rock'/></li>
                                    <li><img className='OpponentImage' src={Paper} alt='paper'/></li>
                                    <li><img className='OpponentImage' src={Scissors} alt='scissors'/></li>
                                    <li><img className='OpponentImage' src={Rock} alt='rock'/></li>
                                </ul>
                                :
                                <div>
                                    <img className='EliminateImage' src={Out} alt='out'></img>
                                    <ul style={{transform: `translateY(${playerPos[0]}%)`}}>
                                        <li><img className='OpponentImage eliminated' src={Rock} alt='rock'/></li>
                                    </ul>
                                </div>
                            }
                        </div>
                    </div>
                ))}
            </div>
            :
            <div className='OpponentWrap'>
                <div className='Username'>
                    {usernames}
                </div>
                <div className='Opponent'>
                    <div className='Choice'>
                        <ul style={{transform: `translateY(${pos}%)`}}>
                            <li><img className='OpponentImage' src={Rock} alt='rock'/></li>
                            <li><img className='OpponentImage' src={Paper} alt='paper'/></li>
                            <li><img className='OpponentImage' src={Scissors} alt='scissors'/></li>
                            <li><img className='OpponentImage' src={Rock} alt='rock'/></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    )
}

export default Opponent