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
        let other = ''
        let me_name = ''
        if(this.props.new){
            Api.checkUser(localStorage.getItem('userId')).then((resp) => {
                me_name = resp.username
                console.log('LMA?NOR: ' + me_name)
                other = this.props.with.id
                let other_name = this.props.with.username
                console.log(other)
                this.setState({
                    from: localStorage.getItem('userId'),
                    from_name: me_name,
                    to: other,
                    to_name: other_name
                })
            })
        }else{
            if(this.props.with.to == localStorage.getItem('userId')){
                other = this.props.with.from
                this.setState({
                    me: {
                        id: this.props.with.to,
                        name: this.props.with.to_name
                    },
                    other: {
                        id: this.props.with.from,
                        name: this.props.with.from_name
                    }
                })
            }else{
                other = this.props.with.to
                this.setState({
                    me: {
                        id: this.props.with.from,
                        name: this.props.with.from_name
                    },
                    other: {
                        id: this.props.with.to,
                        name: this.props.with.to_name
                    }
                })
            }
        }
        Api.checkUser(other).then((res) => {
            console.log('CONVERSATION USER: ' + res.username)
            this.setState({
                otherPerson: res
            })
            Api.loadMessages(other)
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
        let messageParams = {}
        if(this.props.new){
            console.log("FROMNAME: " + this.state.from_name)
            messageParams = {
                from: localStorage.getItem('userId'),
                from_name: this.state.from_name,
                to: this.state.to,
                to_name: this.state.to_name,
                content: messageString,
            }
        }else{
            messageParams = {
                from: localStorage.getItem('userId'),
                from_name: this.state.me.name,
                to: this.state.other.id,
                to_name: this.state.other.name,
                content: messageString,
            }
        }
        console.log(messageParams)
        Api.sendMessage(messageParams).then((resp) => {
            setTimeout(() => {
                this.loadMessages()
            }, 200)
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