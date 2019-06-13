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
                <div className="hamburger">hamburger</div>
                <div className="nohamburger">nohamburger</div>
                <div className="navigation">

                    <nav className="nav">
                        <ul className="mainNav">
                            <li><a href="/">home</a></li>
                            <li><a href="/login">login</a></li>
                            <li><a href="/messages">messages</a></li>
                        </ul>
                        <ul className="secondNav">
                            <li><a href="http://www.maesfranckxruben.be/landingpage/">about</a></li>

                        </ul>
                    </nav>
                </div>
                </header>
            </div>

        );

    }
}

export default Navbar