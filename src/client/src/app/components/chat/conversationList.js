import React, {Component} from 'react'
import Chat from './chat'
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

    componentDidMount() {
        Api.loadConversations().then((res) => {
            console.log('tester')
            console.log(res)
            this.setState({
                conversations: res
            })
            console.log(this.state)
        }).catch((err) => {
            console.log(err)
        })
    }

    openConversation = async (event, from) => {
        console.log(from)
        this.setState({
            uid: from
        })
    }

    render() {
        if(this.state.uid){
            return <Chat with={this.state.uid} />
        }else {
            return (
                <div className={'conversation-list-container'}>
                    <div className={'discover'}/>
                    {this.state.conversations.map((state, index) =>
                        <div className={'thumb-container'} key={index}
                             onClick={(ev) => this.openConversation(ev, state.from)}>
                            <p className={'thumb-from'}>{state.from_name}</p>
                            <p className={'thumb-content'}>{state.content}</p>
                        </div>,
                    )}
                </div>
            )
        }
    }
}

export default ConversationList