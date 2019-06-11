import React, {Component} from 'react'
import ChatInput from './chatInput'
import ChatMessage from './chatMessage'
import Api from "../../services";

class Chat extends Component {
    state = {
        otherPerson: 'Bob',
        messages: [],
        dbMessages: [],
    };

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

    submitMessage = messageString => {
        // const message = { name: this.state.name, message: messageString }
        console.log(messageString)
        Api.sendMessage({
            from: localStorage.getItem('userToken'),
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
            <div className="messages-container">
                <div>
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
            </div>
        )
    }
}

export default Chat