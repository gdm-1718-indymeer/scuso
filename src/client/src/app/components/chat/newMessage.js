import React, {Component} from 'react'
import ChatInput from './chatInput'
import ChatMessage from './chatMessage'
import Api from "../../services";

class NewMessage extends Component {
    state = {

    };

    searchRecipient = (val) => {
        console.log(val)
    }

    render() {
        return (
            <div>
                <input type={'text'} placeholder={'ontvanger...'} className={'search-recipient-input'} />
                <button className={'search-recipient-btn'} onClick={this.searchRecipient(this.value)}>Search</button>
            </div>
        )
    }
}

export default NewMessage