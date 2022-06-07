import React, { useEffect, useState } from 'react'
import "./userControls.scss"
import Rock from "../assets/rock.png"
import Paper from "../assets/paper.png"
import Scissors from "../assets/scissors.png"
import { user } from "../redux/userSelection";
import { useDispatch, useSelector } from 'react-redux'
import {SendChoice} from '../Backend/Backend';

function UserControls() {

    const [rock, setRock] = useState("Image");
    const [paper, setPaper] = useState("Image");
    const [scissors, setScissors] = useState("Image");
    const [selected, setSelected] = useState(false);
    const dispatch = useDispatch();
    const { status } = useSelector((state) => state.status);
    const { usernameSelect } = useSelector((state) => state.usernameSelect);
    const { mode } = useSelector((state) => state.mode);

    function select(item){
        if(!selected){
            setSelected(true);
            if(mode === "single"){
                singlePlayer(item);
            }
            else {
                console.log("MULTI");
                multyplayer(item);
            }
        }
    }

    function singlePlayer(item){
        switch(item){
            case "rock":
                dispatch(user(0));
                setRock("SELECTED");
                setPaper("NOSELECT");
                setScissors("NOSELECT");
                break;
            case "paper":
                dispatch(user(1));
                setRock("NOSELECT");
                setPaper("SELECTED");
                setScissors("NOSELECT");
                break;
            case "scissors":
                dispatch(user(2));
                setRock("NOSELECT");
                setPaper("NOSELECT");
                setScissors("SELECTED");
                break;
        }
    }

    function multyplayer(item){
        switch(item){
            case "rock":
                //back
                dispatch(user(0));
                SendChoice(0);
                setRock("SELECTED");
                setPaper("NOSELECT");
                setScissors("NOSELECT");
                break;
            case "paper":
                //back
                dispatch(user(1));
                SendChoice(1);
                setRock("NOSELECT");
                setPaper("SELECTED");
                setScissors("NOSELECT");
                break;
            case "scissors":
                //back
                dispatch(user(2));
                SendChoice(2);
                setRock("NOSELECT");
                setPaper("NOSELECT");
                setScissors("SELECTED");
                break;
        }
    }

    useEffect(()=>{
        if(status === "reset"){
            resetGame();
        }
    },[status])

    function resetGame(){
        setRock("Image");
        setPaper("Image");
        setScissors("Image");
        setSelected(false);
        dispatch(user(-1));
    }

    return (
        <div className='UserControls'>
            <div className='PlayerUsername'>
                {usernameSelect}
            </div>
            <div className='UserInput'>
                <div className='Button'>
                    <img onClick={() => select("rock")} src={Rock} alt='rock' className={rock}/>
                </div>
                <div className='Button'>
                    <img onClick={() => select("paper")} src={Paper} alt='paper' className={paper}/>
                </div>
                <div className='Button'>
                    <img onClick={() => select("scissors")} src={Scissors} alt='scissors' className={scissors}/>
                </div>
            </div>
        </div>
    )
}

export default UserControls