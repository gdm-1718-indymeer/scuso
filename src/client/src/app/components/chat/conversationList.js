import React, {Component} from 'react'
import ChatInput from './chatInput'
import ChatMessage from './chatMessage'
import ConversationThumb from './conversationThumb'
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

    openConversation (e) {
        console.log(e.target)
    }

    render() {
        return (
            <div className={'conversation-list-container'} onClick={((e) => this.openConversation(e))}>
                {this.state.conversations.map((state, index) =>
                    <ConversationThumb
                        className={'conv-thumb'}
                        onClick={this.openConversation.bind(this)}
                        fromWho={state.from}
                        preview={state.preview}
                        key={index}
                    />,
                )}
            </div>
        )
    }
}

export default ConversationList