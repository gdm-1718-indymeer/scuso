/*
Import extenal libraries
*/
import React, { Component } from 'react';
// import ReactDOM from 'react-dom'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import 'whatwg-fetch';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');



class MessagingPage extends Component {
    constructor(props) {
        super(props);
      }
      state = {
            users: [],
            timestamp: 'no timestamp yet',

      }

    /*   componentDidMount(){
           this.loadMessages();

       }

       loadMessages = () => {
           Api.findAllUsers()
               .then((data) => {
                   this.setState(prevState => ({
                       ...prevState,
                       users: data
                   }));

               })
               .catch((error) => {
                   console.log(error);
               });
               console.log(this.state.users)

       }
*/

    testSock = () => {
        this.sendSocketIO = this.sendSocketIO.bind(this);
    }

    sendSocketIO() {
        socket.emit('example_message', 'demo');
    }

    render() {
        const {users} = this.state;
        return (
            <div className="messaging-container">
                <div className="top-bar"><h3>User Name</h3></div>
                <div>
                    <button onClick={this.sendSocketIO}>Send Socket.io</button>
                </div>
                <div className="messages-container">
                    {/*Filler Code*/}
                    <div className="other-parent">
                    <div className="user-details">
                            {
                            this.state.users.map(user => 
                                <tr>
                                <td>Username: </td>
                                <td>{user.name}</td>
                                </tr>
                            )
                            }
                        </div>
                        <div className="message-bubble other-guy">Hi there! {this.state.timestamp}</div>
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