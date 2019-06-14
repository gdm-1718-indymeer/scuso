/*
Import extenal libraries
*/
import React, { Component } from 'react';
import Skeleton from 'react-loading-skeleton';




/*
Import internal libraries
*/
import Api from '../../services';
import PostsList from '../../components/posts-list';
import axios from 'axios';
import cheerio from 'cheerio';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

class HomePage extends Component {
    state = {
        posts: [],
        events: [],

    };
    
    
    componentWillMount() {
        this.loadPosts();
        let storage = localStorage.getItem('notiSeen');
        if( storage === 'true'){
        }else{
            Api.checkUser().then((response) => {

                    toast(`👋 hello, how are you ${response.username}?`);
                    localStorage.setItem('notiSeen', 'true');
                }
    
              )
              
            
        }
    
    }
   
    loadPosts = () => {
        const url = 'https://cors-anywhere.herokuapp.com/https://deschuur.org/agenda';

        axios.get(url)
        .then(response => {
            let getData = html => {
                let data = [];
                const $ = cheerio.load(html);
                $('.card').each((i, elem) => {
                  data.push({
                    image : $(elem).find('img').attr('src'),
                    title : $(elem).find('h2').text(),
                    bio: $(elem).find('.content').text(),
                    link : 'https://deschuur.org' + $(elem).find('a').attr('href'),
                    data: {
                        day: $(elem).find('.date').children('.day').text(),
                        day_month: $(elem).find('.day_month').text()
                    },
                    label: $(elem).find('.tag').text(),
                    price: $(elem).find('.cost').text(),
                  });
                });
                console.log(data)
                this.setState({ events: data })
              }
              
            getData(response.data)
        })
        .catch(error => {
            toast.error(error.message, { position: toast.POSITION.BOTTOM_LEFT })
        })

        Api.findAllPosts()
            .then((data) => {
                console.log('postloader')
                this.setState(prevState => ({
                    ...prevState,
                    posts: data
                }));
                console.log(this.state.posts)
            })
            .catch((error) => {
                toast.error(error.message, { position: toast.POSITION.BOTTOM_LEFT })

            });
    }

    goToPostDetailPage = (id) => {
        this.props.history.push(`/news/${id}`);
    }

    render() {
        const { posts } = this.state.posts;
        
        return (
            <React.Fragment>
            

            <div className="body">
                <div className="headerwithsearch">
                    <div className="header">
                    <h2 className="discover">Discover Activities</h2>
                     <p>Discover fun new activities below:</p> 
                     <div className="search-container">
                        <form >
                        <input type="text" placeholder="Search Activities" name="search"></input>
                        <button type="submit"><p className ='magnify'> &#9906;</p></button>
                        </form>
                    </div>
                    </div>
                </div>
                <section className="section section--articles">
                    <header className="section__header">
                        <h2 className="section__title">Populair Near you</h2>
                    </header>
                    <div className="section__content section__content--articles">
                        <div className="container">
                        <section className="card">
                            <img className="card-image loading" src={ <Skeleton count={5} />}/>
                            <div className="card-detail">
                            <h3 className="card-title loading">{ <Skeleton count={5}/>}</h3>
                            <p className="card-description loading">{<Skeleton count={5}/>}</p>
                            </div>
                        </section>

                        {this.state && this.state.events && this.state.events.map((item, index) =>
                        <section className="card" key={index}>
                            <img className="card-image loading" src={item.image || <Skeleton count={5} />}/>
                            <div className="card-detail">
                            <h3 className="card-title loading">{item.title || <Skeleton count={5}/>}</h3>
                            <p className="card-description loading">{item.bio}</p>
                            <div className="fadeout"></div>

                            </div>
                        </section>
                        )}
                    <section className="section section--articles">
                        <header className="section__header">
                            <h2 className="section__title">Featured Activities</h2>
                        </header>
                        <div className="wrapper">
                            <article>
                                <img className="image" src="https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80" />
                                <div className="text">
                                    <h3 >Rommelmarkt</h3>
                                    <p >Zie events in de buurt</p>
                                </div>
                            </article>
                            <article>
                                <img className="image" src="https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80" />
                                <div className="text">
                                    <h3 >Rommelmarkt</h3>
                                    <p >Zie events in de buurt</p>
                                </div>
                            </article>
                            <article>
                                <img className="image" src="https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80" />
                                <div className="text">
                                    <h3 >Rommelmarkt</h3>
                                    <p >Zie events in de buurt</p>
                                </div>
                            </article>
                        </div>
                        </section>
                            <div>
                            {this.state && this.state.posts && this.state.posts.map((item, index) =>
                                <section className="blogpost" key={index}>
                                    <div className="blogexerpt">
                                        <h3 className="exerptTitle loading">{item.title || <Skeleton count={5}/>}</h3>
                                        <p className="exerptDescription loading">{item.synopsis}</p>
                                    </div>
                                </section>
                            )}
                        </div>
                        </div>

                        <PostsList posts={posts} onReadMore={this.goToPostDetailPage} />
                    </div>
                    <footer className="section__footer">
                        READ MORE
                    </footer>
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