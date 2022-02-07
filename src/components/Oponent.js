import React, {useState, useEffect, useRef} from "react";

function Oponent(props){

    const [choice, setChoice] = useState(null);
    const item = useRef(null);
    const i = useRef(0);
    const emoji = ["🪨","📃","✂️"];
    const [active, setActive] = useState(false);

    useEffect(() => {
        setActive(props.oponent);
    }, [props.oponent])

    useEffect(() =>{
        if(props.reset === false){
            item.current = null;
            let interval = setInterval(() =>{
                if(i.current == item.current){
                    props.status(true);
                    clearInterval(interval);
                }
                setChoice(emoji[i.current]);
                i.current++;
                if(i.current >= emoji.length){
                    i.current = 0;
                } 
            }, 500);
        }
    },[props.reset]);

    useEffect(() => {
        switch(props.choice){
            case 0:
                item.current = 0;
                break;
            case 1:
                item.current = 1;
                break;
            case 2:
                item.current = 2;
                break;
            default:
                item.current = null;
        }
    }, [props.choice]);

    if(active == true) {
        return(
            <div className="oponent">
                <p>Your opponent chose:</p>
                <p>{choice}</p>
            </div>
        );
    }
    else {
        return(
            <div className="oponent">
                <p>Waiting for oponent</p>
            </div>
        );
    }
    
}

export default Oponent;