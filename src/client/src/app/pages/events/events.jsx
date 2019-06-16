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
import Popup from '../../components/popup/';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

class EventPage extends Component {
    constructor(props){
        super(props);
            this.state = {
                posts: [],
                events: [],
                ghost:[1,2,3,4,5,6,7],
                title: [],
                category: [],
                body: [], 
                showPopup: false,
            };
        }
    pushPost(event) {
		console.log('pushpost pushPost, ')
		event.preventDefault()

		//request to server to add a new username/password
		axios.post('/api/v1/users/', {
            title: this.state.title,
            synopsis: this.state.email,
            body: this.state.body,
    		    })
		.then(response => {
				console.log(response)
				if (!response.data.errmsg) {
          console.log('successful signup')
          this.props.history.push("/login");
				} else {
					console.log('username already taken')
				}
			}).catch(error => {
        console.log(this.state)
				console.log('signup error: ')
        console.log(error)
        toast.error('👻 Email already exist' ,error, {
          position: toast.POSITION.BOTTOM_LEFT
        });

			})
  }
  togglePopup() {  
    this.setState({  
         showPopup: !this.state.showPopup  
    });  
     }  
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
    
    deleteGhost() {
        this.setState({ ghost: [] })
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
            this.deleteGhost();

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
                <div className="discover"></div>
                <section className="section section--articles">
                    <header className="section__header">
                        <h2 className="section__title">Discover the events</h2>
                    </header>
                    <button onClick={this.togglePopup.bind(this)}> Click To Launch Popup</button>  

                        {this.state.showPopup ?  
                        <Popup  
                                text='Click "Close Button" to hide popup'  
                                
                                closePopup={this.togglePopup.bind(this)}  
                        />  
                        : null  
                        }

                    <div className="container">
                    <div className="section__content section__content--events">

                    {this.state.ghost.map(() => 
                        <section className="card">
                            <Skeleton height={150} />
                            <div className="card-detail">
                            <h3 className="card-title loading">{ <Skeleton count={5}/>}</h3>
                            <p className="card-description loading">{<Skeleton count={5}/>}</p>
                            </div>
                        </section>
                        )}
                       

                        {this.state && this.state.events && this.state.events.map((item, index) =>
                        <section className="card" key={index}>
                            <img className="card-image loading" src={item.image}/>
                            <div className="card-detail">
                            <h3 className="card-title loading">{item.title}</h3>
                            <p className="card-description loading">{item.bio}</p>
                            <div className="fadeout"></div>

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

export default (EventPage);