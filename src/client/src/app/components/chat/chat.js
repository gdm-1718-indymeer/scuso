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
        Api.checkUser(this.props.with).then((res) => {
            this.setState({
                otherPerson: res
            })
            Api.loadMessages(this.props.with)
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
        })
    }

    componentDidMount() {
        this.loadMessages(this.props.with)
    }

    submitMessage = messageString => {
        // const message = { name: this.state.name, message: messageString }
        console.log(messageString)
        Api.sendMessage({
            from: localStorage.getItem('userId'),
            to: this.state.otherPerson.id,
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
            
            <div className="messaging-container">
                <div className="discover dispno"></div>
                <div className="top-bar"><h3>{this.state.otherPerson && this.state.otherPerson.username}</h3></div>
                <div className="messages-container">
                    <div>
                        <ChatInput
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
            </div>
        )
    }
}

export default Chat