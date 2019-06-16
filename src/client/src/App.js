/*
Import external libraries
*/
import React, {Component} from 'react';
import {BrowserRouter as Router} from "react-router-dom";

/*
Import Main application
*/
import Main from './app/Main';
/*
class App extends Component {
  render() {
    return (
      <Router>
        <Main />
      </Router>
    );
  }
}

export default App;*/

import axios from 'axios'
import Api from './app/services'
import {Route, Link} from 'react-router-dom'
// components
import Signup from './app/pages/signup'
import LoginForm from './app/pages/login'
import Navbar from './app/components/navbar'
import Home from './app/pages/home'
import signup from './app/pages/signup';

class App extends Component {
    constructor() {
        super()
        this.state = {
            loggedIn: false,
            username: null,
            auth: ['login', 'signup']
        }
        this.componentDidMount = this.componentDidMount.bind(this)

    }

    webpush = () => {
        const publicVapidKey ='BEWjVFc3LSrD-gFKFzdroLsbOIOLXIndtrKR2JgndLszVNjpufToQazxkPb-l4Gt46RlQ0wS6uHzpGL8BZDjeAg'

        if('serviceWorker' in navigator){
            this.send().catch(err => console.error(err))
        }

    }

    send = async () => {

    }
    // Your web app's Firebase configuration

    componentDidMount() {
        let storage = localStorage.getItem('userId');
        if (storage !== null) {
            this.setState({auth: ['Logout']})
        } else {
            this.setState({auth: ['login', 'signup']})

        }
    }

    deleteStorage = (e) => {

        const el = e.target.className;
        console.log(el)
        if (el == "Logout") {
            e.preventDefault();
            // ...do your state change...
            localStorage.removeItem("userId")
            localStorage.removeItem("userToken")
            localStorage.removeItem("notiSeen")


            window.location.reload("/")

        }
    }

    render() {

        return (
            <div className="App">
                <div className="menubar">
                    <div className="hamburger">☰</div><div><img class="headerimg" src="https://firebasestorage.googleapis.com/v0/b/scuso-cb1ee.appspot.com/o/test%2Fheader.png?alt=media&token=0bd5b92e-e3c7-4d44-a3c0-f63a2c75af45" /></div>
                </div>
                <nav className="nav">

                    <div className="navigation">
                        <div className="mainnavigation">
                            <ul className="mainNav">
                                <li><a href="/"> Home 🏠</a></li>
                                <li><a href="/newsfeed"> Newsfeed 📰</a></li>
                                <li><a href="/profile">Profile 👤</a></li>
                                <li><a href="/messaging">Messages 📩 </a></li>
                                {this.state.auth.map((auth, index) => (
                                    <div className="auth" key={index}>
                                        <li><a href={"/" + auth} onClick={this.deleteStorage}
                                               className={auth}>{auth}</a></li>
                                    </div>

                                ))}
                            </ul>
                        </div>
                    </div>
                </nav>

                <Router>
                    <Main/>

                </Router>

            </div>

        );
    }
}

export default App;