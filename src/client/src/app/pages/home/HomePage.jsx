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

        Api.checkUser().then((response) => {
            console.log(response.username)
            toast(`👋 hello, how are you ${response.username}?`);
          })
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
                })
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
        console.log(this.state.events)
        
        return (
            <React.Fragment>
                <div className="headerwithsearch">
                    <h1 className="hidden">SCUSO</h1>
                    <input type="text" placeholder="search an event"></input>
                </div>
                <section className="section section--articles">
                    <header className="section__header">
                        <h2 className="section__title">Calender</h2>
                    </header>
                    <div className="section__content section__content--articles">
                        <div class="container">
                        <section class="card">
                             <img class="card-image loading" src={ <Skeleton count={5} />}/>
                             <div class="card-detail">
                             <h3 class="card-title loading">{ <Skeleton count={5}/>}</h3>
                             <p class="card-description loading">{<Skeleton count={5}/>}</p>
                             </div>
                         </section>

                        {this.state && this.state.events && this.state.events.map(item =>
                         <section class="card">
                             <img class="card-image loading" src={item.image || <Skeleton count={5} />}/>
                             <div class="card-detail">
                             <h3 class="card-title loading">{item.title || <Skeleton count={5}/>}</h3>
                             <p class="card-description loading">{item.bio}</p>
                             </div>
                         </section>
                         )}
                        {this.state && this.state.posts && this.state.posts.map(item =>
                            <section class="card">
                                <img class="card-image loading" src={item.image || <Skeleton count={5} />}/>
                                <div class="card-detail">
                                    <h3 class="card-title loading">{item.title || <Skeleton count={5}/>}</h3>
                                    <p class="card-description loading">{item.bio}</p>
                                </div>
                            </section>
                        )}
                        </div>


                        <PostsList posts={posts} onReadMore={this.goToPostDetailPage} />
                    </div>
                    <footer className="section__footer">
                        READ MORE
                    </footer>
                </section>
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