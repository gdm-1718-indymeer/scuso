/*
Import extenal libraries
*/
import React, { Component } from 'react';
// import ReactDOM from 'react-dom'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'

/*
Import internal libraries
*/
import Api from '../../services';
import PostsList from '../../components/posts-list';



class MessagingPage extends Component {



    render() {
        return (
            <div className="messaging-container">
                <div className="top-bar"><h3>User Name</h3></div>
                <div className="messages-container">
                    {/*Filler Code*/}
                    <div className="other-parent">
                        <div className="message-bubble other-guy">Hi there!</div>
                    </div>
                    <div className="you-parent">
                        <div className="message-bubble you">Oi! Sup?</div>
                    </div>
                    {/*End Filler Code*/}
                </div>
                <div className="compose-bar">
                    <input type="text" className="messaging-input" placeholder="Type here..."></input>
                </div>
            </div>
        )
    }
}

export default (MessagingPage);