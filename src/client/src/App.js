/*
Import external libraries
*/
import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";

/*
Import Main application
*/import Main from './app/Main';
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
import { Route, Link } from 'react-router-dom'
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
      username: null
    }

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount() {
    this.getUser()
  }

  updateUser (userObject) {
    this.setState(userObject)
  }

  getUser() {
    /*
    axios.get('/api/v1/users').then(response => {
      console.log('Get user response: ')
      console.log(response.data.id, 'test')
      const key = localStorage.getItem('userId');

      if (response.data.id === key) {
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          username: response.data.username
        })
        localStorage.setItem('flag' , true);
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null
        })
        localStorage.setItem('flag' , false)
      }
    })*/
  }

  render() {
    return (
      
      <div className="App">
        <div className="menubar">
          <div className="hamburger">☰</div>
        </div>
            <nav className="nav">

            <div className="navigation">
                    <div className="mainnavigation">
                    <ul className="mainNav">
                        <li><a href="/">home</a></li>
                        <li><a href="/login">login</a></li>
                        <li><a href="/profile">profile</a></li>
                        <li><a href="/messaging">messages</a></li>
                    </ul>
                    <ul className="secondNav">
                        <li><a href="http://www.maesfranckxruben.be/landingpage/">about</a></li>

                    </ul>
                    </div>
            </div>
            </nav>
        {/*<Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />*/}
        {/* greet user if logged in: */}
        {this.state.loggedIn &&
          <p>Join the party, {this.state.username}!</p>
        }
        {/* Routes to different components */}
       <Router>
       <Main />

      </Router>

      </div>
    );
  }
}

export default App;