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
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

class NewsFeed extends Component {
   
    constructor() {
        super()
        this.state = {
            posts: [],
        events: [],
        ghost:[1,2,3,4,5,6,7],
        title: [],
        body: [],
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
  
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    onSubmit(event) {
		console.log('pushpost pushPost, ')
		event.preventDefault()

		//request to server to add a new username/password
		axios.post('/api/v1/posts', {
            title: this.state.title,
            synopsis: this.state.body,
            body: this.state.body,
    		    })
		.then(response => {
                console.log(response)
                console.log("gepushed")
				if (!response.data.errmsg) {
          console.log('submit success')
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
                <div className="headerwithsearch">
                    <div className="header">
                    <h2 className="discover">Newsfeed</h2>
                     <p>What's new?</p> 
                    </div>
                </div>
                <section className="section section--articles">
                <form>
          
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="text">Title</InputLabel>
              <Input type="text" id="title" onChange={this.handleChange}  value={this.state.title} name="title"/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="text">Body</InputLabel>
              <Input type="text" id="body" onChange={this.handleChange}  value={this.state.body} name="body"/>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={this.handleSubmit}

            >
              Sign in
            </Button>
          </form>
                       

                        
                    
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
                       

                        <PostsList posts={posts} onReadMore={this.goToPostDetailPage} />
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

export default (NewsFeed);