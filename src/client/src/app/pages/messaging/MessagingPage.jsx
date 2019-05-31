/*
Import extenal libraries
*/
import React, { Component } from 'react';
// import ReactDOM from 'react-dom'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import 'whatwg-fetch';
import Chat from '../../components/chat/chat'
import openSocket from 'socket.io-client';
import Api from '../../services/';
import ChatMessage from "../../components/chat/chatMessage";

// const socket = openSocket('http://localhost:8000');



class MessagingPage extends Component {
   constructor(props) {
        super(props);
        this.state = {
            users: [],
            timestamp: 'no timestamp yet',
            response: [],
            endpoint: 'http://127.0.0.1:8000',
        }
      }

    // componentDidMount() {
    //     const { endpoint } = this.state;
    //     const socket = openSocket(endpoint);
    //     socket.on("FromAPI", data => this.setState({ response: data }));
    // }
    //
    // sendSocketIO() {
    //
    //     socket.emit('example_message', 'demo');
    // }

    render() {

        return (
            <div className="messaging-container">
            <div className="top-bar"><h3>User Name</h3></div>
            <div>
                <button onClick={this.sendSocketIO}>Send Socket.io</button>
            </div>
            <div className="messages-container">

            <Chat />

            </div>

        </div>
        )
    }
}

export default (MessagingPage);