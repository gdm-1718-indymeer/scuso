import React, {Component} from 'react'
import ChatInput from './chatInput'
import ChatMessage from './chatMessage'
import Api from "../../services";

const URL = 'ws://localhost:3030';

class Chat extends Component {
    state = {
        otherPerson: 'Bob',
        messages: [],
        dbMessages: [],
    };

    // ws = new WebSocket(URL)

    loadMessages() {
        Api.loadMessages()
            .then((data) => {
                console.log('RUN')
                this.setState({
                    dbMessages: data
                });
                console.log(data)
                this.messagesEnd.scrollIntoView({behavior: "smooth"})
            })
            .catch((error) => {
                console.log(error)
                this.messagesEnd.scrollIntoView({behavior: "smooth"})
            });
    }

    componentDidMount() {
        this.loadMessages()
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
            from: 'Jonas',
            to: this.state.otherPerson,
            content: messageString,
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
                {/*<label htmlFor="name">*/}
                {/*  Name:&nbsp;*/}
                {/*  <input*/}
                {/*    type="text"*/}
                {/*    id={'name'}*/}
                {/*    placeholder={'Enter your name...'}*/}
                {/*    value={this.state.name}*/}
                {/*    onChange={e => this.setState({ name: e.target.value })}*/}
                {/*  />*/}
                {/*</label>*/}
                <ChatInput
                    ws={this.ws}
                    onSubmitMessage={messageString => this.submitMessage(messageString)}
                />
                {this.state.dbMessages.map((message, index) =>
                    <ChatMessage
                        key={index}
                        message={message.content}
                        from={message.from}
                    />,
                )}
                <div ref={(el) => {
                    this.messagesEnd = el;
                }}/>
            </div>
        )
    }
}

export default Chat