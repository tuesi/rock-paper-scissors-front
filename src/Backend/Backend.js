import React, { useEffect, useState }  from 'react'
import socketClient from "socket.io-client";
import { gameResult } from '../redux/result';
import { opponent } from '../redux/opponentSelection';
import { setPlayerCount } from '../redux/playerCount';
import { playerNames } from '../redux/playerNames';
import { eliminate } from '../redux/eliminations';
import { useDispatch, useSelector } from 'react-redux';
const SERVER = "http://192.168.0.131:8080";
let socket;
let roomId;
function Backend() {

    const [getResult, setGetResult] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        socket = socketClient(SERVER);
    },[])

    useEffect(() => {
        socket.on('oponent-choice', (choice, result, eliminations) => {
            if(!getResult){
                setGetResult(true);
                //Send to redux
                console.log(choice);
                console.log(result);
                console.log(eliminations);
                dispatch(opponent(choice));
                dispatch(gameResult(result));
                dispatch(eliminate(eliminations));
            }
        });
        socket.on('player-count', (count, usernames) => {
            setGetResult(true);
            //Send to redux
            dispatch(setPlayerCount(count));
            console.log(count);
            console.log(usernames);
            dispatch(playerNames(usernames));
        });
        socket.on('player-join', (username) => {
            dispatch(playerNames(username));
        });
    },[])

    return null;
}

function Connect(username, mode, dispatch) {
    console.log(username);
    socket.emit('join', socket.id, username, mode, (response) =>{
        //roomId = id;
        console.log(response.id);
        console.log(response.names);
        dispatch(playerNames(response.names));
        roomId = response.id;
    });
}

function SendChoice(choice) {
    socket.emit('choice', socket.id, choice, roomId);
}

function reset(){
    socket.emit('reset', socket.id, roomId);
}

export { Connect, SendChoice, reset }
export default Backend