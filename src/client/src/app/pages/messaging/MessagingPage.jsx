/*
Import extenal libraries
*/
import React, {Component} from 'react';
import 'whatwg-fetch';
import ConversationList from '../../components/chat/conversationList';
import NewMessage from "../../components/chat/newMessage";

class MessagingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            response: [],
        }
    }

    render() {
        return <div className={'main-mess-cont'}><ConversationList /></div>
    }
}

export default (MessagingPage);