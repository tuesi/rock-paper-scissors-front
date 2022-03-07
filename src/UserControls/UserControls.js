import React, { useState } from 'react'
import "./userControls.scss"
import Rock from "../assets/rock.png"
import Paper from "../assets/paper.png"
import Scissors from "../assets/scissors.png"

function UserControls() {

    const [rock, setRock] = useState("Image");
    const [paper, setPaper] = useState("Image");
    const [scissors, setScissors] = useState("Image");
    const [selected, setSelected] = useState(false);

    function select(item){
        if(!selected){
            setSelected(true);
            switch(item){
                case "rock":
                    setRock("SELECTED");
                    setPaper("NOSELECT");
                    setScissors("NOSELECT");
                    break;
                case "paper":
                    setRock("NOSELECT");
                    setPaper("SELECTED");
                    setScissors("NOSELECT");
                    break;
                case "scissors":
                    setRock("NOSELECT");
                    setPaper("NOSELECT");
                    setScissors("SELECTED");
                    break;
            }
        }
    }

    return (
        <div className='UserControls'>
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
    )
}

export default UserControls