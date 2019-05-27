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
import  { subscribeToTimer } from '../../services/Api';

import PostsList from '../../components/posts-list';



class MessagingPage extends Component {
    constructor(props) {
        super(props);
        subscribeToTimer((err, timestamp) => this.setState({ 
          timestamp 
        }));
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

    render() {
        const {users} = this.state;
        return (
            <div className="messaging-container">
                <div className="top-bar"><h3>User Name</h3></div>
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