/*
Import extenal libraries
*/
import React, { Component } from 'react';
import Skeleton from 'react-loading-skeleton';




/*
Import internal libraries
*/
import Api from '../../services';
import './profile.scss'
import PostsList from '../../components/posts-list';
import axios from 'axios';
import cheerio from 'cheerio';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        }
    }
    
    
    componentWillMount() {
        Api.checkUser().then((response) => {
            this.setState({users: response.username})
            console.log(response.username)
            toast(` 🕵️‍ stalking you i see`);
        })
    
    }
   


    render() {
        
        return (
            <React.Fragment>
            
            <div className="discover"></div>
            <div className="profileBody">
            <header>
                <img src="https://images.unsplash.com/photo-1560496513-5ea8e6349a24?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1301&q=80" alt="John Doe" className="profile-image"/>
                <h1 className="tag name">Hello, I’m {this.state.users}</h1>
                <p className="tag location">My home is New York, California.</p>
                </header>

                <main className="flex">
                <div className="card">
                    <h2>Background</h2>
                    <p>I’m an aspiring web developer who loves everything about the web. I've lived in lots of different places and have worked in lots of different jobs. I’m excited to bring my life experience to the process of building fantastic looking websites.</p>
                    <p>I'm a life-long learner who's always interested in expanding my skills.</p>
                </div> 

                <div className="card">
                    <h2>Goals</h2>
                    <p>I want to master the process of building web sites and increase my knowledge, skills and abilities in:</p>
                    <ul className="skills">
                    <li>HTML</li>
                    <li>CSS</li>
                    <li>JavaScript</li>
                    <li>ExpressJS</li>
                    <li>ReactJS</li>
                    </ul>
                    <p>I’d like to work for a web development firm helping clients create an impressive online presence.</p>
                </div> 

                </main>
            </div>
                <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
          />
            </React.Fragment>
        )
    }
    
}

export default (HomePage);