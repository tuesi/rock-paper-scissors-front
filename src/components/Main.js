import React from "react";
import Controlls from "./Controlls"
import Oponent from "./Oponent";
import "./main.css";
import socketClient from "socket.io-client";
import Results from "./Results";
const SERVER = "http://192.168.0.131:8080";

export class Main extends React.Component {

    state = {
        oponent_choice: null,
        result: null,
        status: false,
        oponent: false,
        restart: false
    }

    socket;
    

    componentDidMount(){
        this.configureSocket();
    }

    configureSocket = () => {
        var socket = socketClient(SERVER);
        socket.on('connection', () => {
            
            this.socket.emit('join', socket.id);
        });

        socket.on('oponent-choice', (choice, result) => {
            this.setState({oponent_choice: choice});
            this.setState({result: result});
        });

        socket.on('oponent', () => {
            this.setState({oponent: true});
        });

        socket.on('reset', () => {
            this.setState({restart: false});
        });

        this.socket = socket;
    }

    sendChoice = (choice) => {
        this.socket.emit('choice', this.socket.id, choice);
    }

    setStatus = (status) => {
        this.setState({status: status});
    }

    sendReset = () => {
        this.socket.emit('reset', this.socket.id);
    }

    restart = (status) => {
        this.setState({restart: status});
        this.setState({status:false});
        this.setState({result: null});
    }

    render(){
        return (
            <div className="main">
                <div className="row">
                    <Controlls choice={this.sendChoice} restart={this.sendReset} reset={this.state.restart}></Controlls>
                    <Results result={this.state.result} status={this.state.status} restart={this.restart} reset={this.state.restart}></Results>
                    <Oponent choice={this.state.oponent_choice} status={this.setStatus} oponent={this.state.oponent} reset={this.state.restart}></Oponent>
                </div>
            </div>
        );
    }
}

export default Main;