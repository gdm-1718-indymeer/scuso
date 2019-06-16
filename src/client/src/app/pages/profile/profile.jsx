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

import Avatar from 'react-avatar'

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            events: [],
        }
    }
    
    
    componentWillMount() {
        if (localStorage.getItem('userId')){

        }else{
          window.location = '/login'
        }
        Api.checkUser().then((response) => {
            this.setState({users: response.username})
            console.log(response.username)
            toast(` 🕵️‍ stalking you i see`);
        })

        Api.fetchEventsId().then((response) => {
            this.setState({events: response})

        })
    
    }
   


    render() {
        
        return (
            <React.Fragment>
            
            <div className="discover"></div>
            <div className="profileBody">
            <header>
                <Avatar size="150" name={this.state.users} className="profile-image"/>

                <h1 className="tag name">Hello, I’m {this.state.users}</h1>
                </header>

                <main className="flex">
                <div className="sectionCard">
                    <h2>Background</h2>
                    <p>I’m an aspiring web developer who loves everything about the web. I've lived in lots of different places and have worked in lots of different jobs. I’m excited to bring my life experience to the process of building fantastic looking websites.</p>
                    <p>I'm a life-long learner who's always interested in expanding my skills.</p>
                </div> 

                <div className="sectionCard">
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
                <section className="flex">
                <div className="sectionCard created">
                    <h2>Events created by me</h2>
                    <div className="section__content section__content--articles">

                    { this.state.events.map((item, index) =>
                        <section className="card" key={index}>
                            <img className="card-image loading" src={item.imageurl}/>
                            <div className="card-detail">
                            <h3 className="card-title loading">{item.title}</h3>
                            <p className="card-description loading">{item.body}</p>
                            <div className="fadeout"></div>

                            </div>
                        </section>
                        )}
                </div> 
                </div>
                </section>
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