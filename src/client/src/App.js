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
    axios.get('/api/v1/users').then(response => {
      console.log('Get user response: ')
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          username: response.data.user.username
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null
        })
      }
    })
  }

  render() {
    return (
      <div className="App">
   
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