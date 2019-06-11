/*
Import extenal libraries
*/
import React, { Component } from 'react';
import 'whatwg-fetch';
import ConversationList from '../../components/chat/conversationList';
import Chat from '../../components/chat/chat'
import Api from '../../services/';
import ChatMessage from "../../components/chat/chatMessage";

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

    render() {

        return (
            <div className="messaging-container">
            <div className="top-bar"><h3>User Name</h3></div>
            {/*<div>*/}
            {/*    <button onClick={this.sendSocketIO}>Send Socket.io</button>*/}
            {/*</div>*/}

            <ConversationList />

        </div>
        )
    }
}

export default (MessagingPage);