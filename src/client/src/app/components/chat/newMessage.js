import React, {Component} from 'react'
import ChatInput from './chatInput'
import ChatMessage from './chatMessage'
import Api from "../../services";

class NewMessage extends Component {
    state = {

    };


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
        )
    }
}

export default NewMessage