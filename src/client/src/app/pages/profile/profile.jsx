/*
Import extenal libraries
*/
import React, { Component } from 'react';
import Skeleton from 'react-loading-skeleton';
import classNames from 'classnames';





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
            posts: [],
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
            console.log(response)

        })
        Api.fetchPostId().then((response) => {
            this.setState({posts: response})
            console.log(response)

        })
    
    }

    deleteItem = (e) =>{
        let id = e.currentTarget.id;
        console.log(id)
        Api.deleteItem(id).then((response) => {
            console.log(response)
            toast.success('tis verwijderd');

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
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in libero in lorem accumsan tincidunt. Proin in dignissim nunc, ut ullamcorper magna. Praesent interdum urna sed ullamcorper vehicula. Donec sagittis fringilla dignissim. Curabitur neque eros, fringilla eget felis quis, malesuada venenatis dolor. Nullam condimentum scelerisque erat, ac egestas massa mollis at. Proin suscipit purus a elit lacinia, a tempor urna pharetra. Praesent malesuada elementum malesuada. Vestibulum nec rhoncus orci, id hendrerit nunc. Donec accumsan scelerisque ornare. Maecenas neque neque, maximus quis risus at, commodo eleifend nisl.</p>
                </div> 

                <div className="sectionCard">
                    <h2>Goals</h2>
                    <p>Fusce nulla ante, tempus ut turpis nec, convallis venenatis enim. In in tortor dapibus, euismod mi tincidunt, tempus eros. Sed placerat justo tristique quam iaculis, sit amet scelerisque magna condimentum.</p>
                   
                </div> 

                </main>
                <section className="flex">
                <div className="sectionCard created">
                    <h2>Events created by {this.state.users}</h2>
                    <div className="section__content section__content--articles">

                    { this.state.events.map((item, index) =>
                        <section className="card" key={index}>
                            <div class="edit">✎</div>
                            <div onClick={this.deleteItem} id={item.id} class="delete">˟</div>


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
                <section className="flex">

                <div className="sectionCard created">
                    <h2>Posts created by {this.state.users}</h2>
                    <div className="section__content section__content--articles">
                        { this.state.posts.map( (post, index) => (
                            <article key={ post.id } className={classNames("post--small")}>
                                <h1 className="post__title">{ post.title }</h1>
                                <div className="post__synopsis">{ post.synopsis }</div>
                                <button onClick={(ev) => this.readMoreHandler(ev, post.id)}>More</button>
                            </article>
                        ))}
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