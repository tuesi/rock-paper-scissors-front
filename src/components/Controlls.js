import React, {useState, useEffect} from "react";

function Conrolls(props) {

    const [reset, setReset] = useState(false);
    const [choice, setChoice] = useState("---");
    const [rockClass, setRockClass] = useState("imgNormal");
    const [paperClass, setPaperClass] = useState("imgNormal");
    const [scissorsClass, setScissorsClass] = useState("imgNormal");
    const emoji = ["🪨","📃","✂️"];

    var send = () => {
        switch(choice){
            case "rock":
                props.choice(0);
                break;
            case "paper":
                props.choice(1);
                break;
            case "scissors":
                props.choice(2)
                break;
        }
    }

    var restart = () => {
        setRockClass("imgNormal");
        setPaperClass("imgNormal");
        setScissorsClass("imgNormal");
        props.restart(true);
    }

    useEffect(() => {
        setReset(props.reset);
    },[props.reset]);

    var changeBackground = (index) => {
        switch(index){
            case 1:
                setRockClass("imgDarken");
                setPaperClass("imgNormal");
                setScissorsClass("imgNormal");
                break;
            case 2:
                setPaperClass("imgDarken");
                setRockClass("imgNormal");
                setScissorsClass("imgNormal");
                break;
            case 3:
                setScissorsClass("imgDarken");
                setRockClass("imgNormal");
                setPaperClass("imgNormal");
                break;
        }
    }

    return(
        <div className="choices">
                <button className={rockClass} onClick={() => {setChoice("rock"); changeBackground(1);}}>{emoji[0]}</button>
                <button className={paperClass} onClick={() => {setChoice("paper"); changeBackground(2);}}>{emoji[1]}</button>
                <button className={scissorsClass} onClick={() => {setChoice("scissors"); changeBackground(3);}}>{emoji[2]}</button>
                <div>
                    <button onClick={send}>CONFIRM</button>
                </div>
                {reset ? <button onClick={restart}>RESET</button> : null}
        </div>
    );
}

export default Conrolls;