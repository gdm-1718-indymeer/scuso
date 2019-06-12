import React, {Component} from 'react'
import ChatInput from './chatInput'
import ChatMessage from './chatMessage'
import Api from "../../services";

const URL = 'ws://localhost:3030';

class ConversationList extends Component {
    state = {
        conversations: [
            {
                from: 'Carmen',
                preview: 'Komde vanavond buite?',
            },
            {
                from: 'Pascale',
                preview: 'Wa doe je momenteel?',
            },
            {
                from: 'Marc',
                preview: 'Komde vanavond buite?',
            }
        ]
    };

    // ws = new WebSocket(URL)

    loadConversations() {
        Api.loadConversations('Jonas')
            .then((data) => {
                console.log('RUN')
                this.setState({
                    conversations: data
                });
                console.log(data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    componentDidMount() {
        // this.loadConversations()
    }

    submitMessage = messageString => {
        // const message = { name: this.state.name, message: messageString }
        console.log('Fired')
        console.log(messageString)
        Api.sendMessage({
            conversation_id: 'me_u',
            content: messageString,
            sent_by: 'Jonas'
        }).then((resp) => {
            this.loadMessages()
            console.log(resp)
        }).catch((err) => {
            console.log(err)
        })
    }


    openConversation = (event, from) => {
        console.log('test')
        console.log(from)
    }

    render() {
        return (
            <div className={'conversation-list-container'}>
                {this.state.conversations.map((state, index) =>
                    <div className={'thumb-container'} key={index} onClick={(ev) => this.readMoreHandler(ev, state.from)}>
                        <p className={'thumb-from'}>{state.from}</p>
                        <p className={'thumb-content'}>{state.preview}</p>
                    </div>,
                )}
            </div>
        )
    }
}

export default ConversationList