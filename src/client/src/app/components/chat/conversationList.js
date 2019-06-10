import React, {Component} from 'react'
import ChatInput from './chatInput'
import ChatMessage from './chatMessage'
import Api from "../../services";

const URL = 'ws://localhost:3030';

class ConversationList extends Component {
    state = {
        conversations: []
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
        this.loadConversations()
    }

    // componentDidMount() {
    // this.ws.onopen = () => {
    //   // on connecting, do nothing but log it to the console
    //   console.log('connected')
    //   // this.setState(mess)
    // }

    //   this.ws.onmessage = evt => {
    //     // on receiving a message, add it to the list of messages
    //     const message = JSON.parse(evt.data)
    //     this.addMessage(message)
    //   }
    //
    //   this.ws.onclose = () => {
    //     console.log('disconnected')
    //     // automatically try to reconnect on connection loss
    //     this.setState({
    //       ws: new WebSocket(URL),
    //     })
    //   }
    // }
    //
    // addMessage = message => {
    //   this.setState(state => {
    //     const messages = state.messages.concat(message);
    //     localStorage.setItem('conversation_id', messages)
    //     return {
    //       messages,
    //     };
    //   });
    // }

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

    render() {
        return (
            <div>
                {this.state.conversations.map((message, index) =>
                    <ConversationThumb />,
                )}
            </div>
        )
    }
}

export default Chat