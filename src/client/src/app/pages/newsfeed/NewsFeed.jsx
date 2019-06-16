/*
Import extenal libraries
*/
import React, { Component } from 'react';
import Skeleton from 'react-loading-skeleton';




/*
Import internal libraries
*/
import PostDetail from '../../components/post-detail/PostDetail'; 
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
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import * as firebase from 'firebase'
import FileUploader from 'react-firebase-file-uploader'
import {Redirect} from 'react-router-dom'
class NewsFeed extends Component {
   
    constructor() {
        super()
        this.state = {
            posts: [],
        events: [],
        ghost:[1,2,3,4,5,6,7],
        title: [],
        body: [],
        synopsis: [],
        author: [],
        image: '',
        imageurl:'',
        isUploading: false,
        progress: 0,
        avatarURL: '',
        redirect: false,
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        
    }
        handleUploadStart = () => this.setState({isUploading: true, progress: 0});
        handleProgress = (progress) => this.setState({progress});
        handleUploadError = (error) => {
        this.setState({isUploading: false});
        toast.error(error.message);
        }
        handleUploadSuccess = (filename) => {
        this.setState({image: filename, progress: 100, isUploading: false});
        firebase.storage().ref('test').child(filename).getDownloadURL().then(((url) => {
          this.setState({imageurl: url})          
          return url;
      })
    )
    };

    textTruncate(str, length, ending){
        if (length == null) {
          length = 100;
        }
        if (ending == null) {
          ending = '...';
        }
        if (str.length > length) {
          return str.substring(0, length - ending.length) + ending;
        } else {
          return str;
        }
      };
      handleChange(event) {
        console.log('OIOIOIOIOIOIOIOI')
        console.log(event)
        this.setState({
            [`${event.target.name}`]: event.target.value,
        })
        
        if(this.state.body !== ""){
            let body = this.state.body;
            let syn = this.textTruncate(body, 100);
            this.setState({
                synopsis: syn,
            })
        
    }
    }
    
    openBlogpost = async (event, title) => {
        console.log(title)
        this.setState({
            uid: title
        })
    }
    onSubmit(event) {
      
        
        event.preventDefault()
        
		//request to server to add a new username/password
		axios.post('/api/v1/posts', {
            title: this.state.title,
            body: this.state.body,
            synopsis: this.state.synopsis,
            author: this.state.author,
            image: this.state.image,
            imageurl: this.state.imageurl,
    		    })
		.then(response => {
                console.log(response)
                console.log("gepushed")
				if (!response.data.errmsg) {
          console.log('submit success')
                }
                window.location.reload();
			}).catch(error => {
        console.log(this.state)
				console.log('push error: ')
        console.log(error)
        toast.error(error.message ,error, {
          position: toast.POSITION.BOTTOM_LEFT
        });

			})
  }
    
    componentWillMount() {
      if (localStorage.getItem('userId')){

      }else{
        window.location = '/login'
      }
        this.loadPosts();
        let storage = localStorage.getItem('userId');
        if( storage ){
          Api.checkUser().then((response) => {
            this.setState({
              author: response.username,
            })
        })
        }else{
          toast(`👋 You have to be logged in to send a newsitem`);   
        }
    }
    
    
    deleteGhost() {
        this.setState({ ghost: [] })
    }
    loadPosts = () => {
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
        
        if(this.state.uid){
            return <PostDetail with={this.state.uid} />
        }else {
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
                <form className="newsform">
          <h2 className="newstitle">Create a newsitem</h2>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="text">Title</InputLabel>
              <Input type="text" id="title" onChange={this.handleChange}  value={this.state.title} name="title"/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <TextField label="body" className="textarea" multiline={true} type="text" id="body" onChange={this.handleChange}  value={this.state.body} name="body"/>
            </FormControl>
            {this.state.isUploading &&
<p>Progress: {this.state.progress}</p>
}
{this.state.imageurl &&
<img src={this.state.imageurl} />
}
<FileUploader
accept="image/*"
name="image"
randomizeFilename
storageRef={firebase.storage().ref('test/')}
onUploadStart={this.handleUploadStart}
onUploadError={this.handleUploadError}
onUploadSuccess={this.handleUploadSuccess}
onProgress={this.handleProgress}
/>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={this.onSubmit}

            >
              Send
            </Button>
          </form>
            <div className="newsfeed clearfix">
                {this.state && this.state.posts && this.state.posts.map((item, index) =>
                    <section className="blogpost" onClick={(ev) => this.openBlogpost(ev, item)} key={index}>
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
        )}
    }
    
}

export default (NewsFeed);