/*
Import extenal libraries
*/
import React, {Component} from 'react';
import 'whatwg-fetch';
import ConversationList from '../../components/chat/conversationList';
import NewMessage from '../../components/chat/newMessage';
import Chat from '../../components/chat/chat'
import Api from '../../services/';
import ChatMessage from "../../components/chat/chatMessage";

class MessagingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: 'conversation',
            userIdForConv: '',
            users: [],
            response: [],
        }
    }

    goToConversation(userId){
        this.setState()
    }

    render() {
        switch (this.state.view) {
            case 'conversation':
                return <ConversationList/>;
            case 'newmessage':
                return <NewMessage />;
            case 'chat':
                return <Chat/>;
            default:
                return <h1>MessagingRouter: Error: No views selected</h1>
        }
    }
}

export default (MessagingPage);