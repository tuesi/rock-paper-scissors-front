import React, {useState, useEffect} from "react";

function Results (props){

    const [result, setResult] = useState("🆚");
    const states = ["🆚","🏆","🚫","🏳"];

    useEffect(() => {
        switch(props.result){
            case 0:
                setResult(states[2]);
                props.restart(true);
                break;
            case 1:
                setResult(states[1]);
                props.restart(true);
                break;
            case 2:
                setResult(states[3]);
                props.restart(true);
                break;
        }
    }, [props.status]);

    useEffect(() => {
        if(props.reset == false) {
            setResult(states[0]);
        }
    }, [props.reset])

    return(
        <div className="result">
            <p>{result}</p>
        </div>
    );
}

export default Results;