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

    getUnique(arr, comp) {

        const unique = arr
            .map(e => e[comp])

            // store the keys of the unique objects
            .map((e, i, final) => final.indexOf(e) === i && i)

            // eliminate the dead keys & store unique objects
            .filter(e => arr[e]).map(e => arr[e]);

        return unique;
    }

    componentDidMount() {
        Api.loadConversations().then((res) => {
            console.log('tester')
            console.log(res)
            const me = localStorage.getItem('userId')
            let meFilter = []
            let newArray = []
            res.map((mess) => {
                console.log(mess.from_name + ' / ' + mess.to_name)
            })
            this.setState({
                conversations: newArray
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