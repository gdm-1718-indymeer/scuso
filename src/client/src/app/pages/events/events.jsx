/*
Import extenal libraries
*/
import React, { Component } from 'react';
import Skeleton from 'react-loading-skeleton';




/*
Import internal libraries
*/
import eventDetail from '../../components/event-detail/eventDetail'
import Api from '../../services';
import EventsList from './eventsList';
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
  
    componentWillMount() {
        
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
    
    
    
    
    goToPostDetailPage = (id) => {
        this.props.history.push(`/news/${id}`);
    }

    render() {
        const { events } = this.state.events;
        
        return (
            <React.Fragment>
            

            <div className="body">
                
                                                <EventsList posts={events} onReadMore={this.goToPostDetailPage} />

                         </div>               

                    
                    <footer className="section__footer">
                        READ MORE
                    </footer>
                
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