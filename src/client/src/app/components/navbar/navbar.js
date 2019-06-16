import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Route, Link } from 'react-router-dom'
import { BrowserRouter as Router } from "react-router-dom";

import logo from './logo.png';
import './app.css';

import axios from 'axios'

class Navbar extends Component {
    constructor() {
        super()
        this.logout = this.logout.bind(this)
    }

    logout(event) {
        event.preventDefault()
        console.log('logging out')
        axios.post('/user/logout').then(response => {
          console.log(response.data)
          if (response.status === 200) {
            this.props.updateUser({
              loggedIn: false,
              username: null
            })
          }
        }).catch(error => {
            console.log('Logout error')
        })
      }

    render() {
        const loggedIn = this.props.loggedIn;
        console.log('navbar render, props: ')
        console.log(this.props);
        
        return (
            <div>

                <header className="navbar App-header" id="nav-container">
                    <div className="col-4" >
                        {loggedIn ? (
                            <section className="navbar-section">
                              <Router>

                                <Link to="#" className="btn btn-link text-secondary" onClick={this.logout}>
                                <span className="text-secondary">logout</span></Link>
                                </Router>


                            </section>
                        ) : (
                                <section className="navbar-section">
                                 <Router>
                                    <Link to="/" className="btn btn-link text-secondary">
                                        <span className="text-secondary">home</span>
                                        </Link>
                                        </Router>
                                     <Router>
                                    <Link to="/login" className="btn btn-link text-secondary">
                                    <span className="text-secondary">login</span>
				</Link>
                </Router>
                <Router>
                                    <Link to="/signup" className="btn btn-link">
                                    <span className="text-secondary">sign up</span>
				</Link>
                </Router>
                                </section>
                            )}
                    </div>
                    <div className="col-4 col-mr-auto">
                    <div id="top-filler"></div>
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1 className="App-title">MERN Passport</h1>
                    </div>
                </header>
            </div>

        );

    }
}

export default Navbar