import React, {Component} from 'react'
import ChatInput from './chatInput'
import ChatMessage from './chatMessage'
import Api from "../../services";
import Chat from "./chat";

class NewMessage extends Component {
    state = {
        results: ['Enter a search term...'],
        query: '',
    };

    searchRecipient = () => {
        console.log(this.state.query)
        Api.searchRecipient(this.state.query).then((resp) => {
            console.log(resp)
            this.setState({
                results: resp
            })
        })
    }

    goToConv = (event, user) => {
        this.setState({
            toConv: user
        })
    }

    render() {
        if(this.state.toConv){
            return <Chat with={this.state.toConv} new={true}/>
        }else{
            return (
                <div>
                    <div className={'discover'}/>
                    <input type={'text'} placeholder={'ontvanger...'} className={'search-recipient-input'} onChange={e => this.setState({query: e.target.value})} />
                    <button className={'search-recipient-btn'} onClick={this.searchRecipient}>Search</button>
                    {this.state.results.map((res, i) =>
                        <div className={'thumb-container'} key={i}>
                            <p className={'thumb-content'} onClick={(ev) => this.goToConv(ev, res)}>{res.username}</p>
                        </div>,
                    )}
                </div>
            )
        }
    }
}

export default NewMessage