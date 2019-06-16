/*
Import external libraries
*/
import React, { Component } from 'react';
import classNames from 'classnames';
import Skeleton from 'react-loading-skeleton';

/*
Styling
*/
import EventDetail from '../../components/event-detail/eventDetail'
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

class eventsLists extends Component {
    constructor(props){
        super(props);
            this.state = {
                posts: [],
                events: [],
                eventsrommelmarkt: [],
                ghost:[1,2,3,4,5,6,7],
                title: [],
                category: [],
                body: [], 
                showPopup: false,
                eventsscrape: [],
                postsscrape: [],
                titlescrape: [],
                boydscrape: [],
                categoryscrape: [],
                
            };
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
    openNewsPost = async (event, title) => {
        console.log('hallo')
        console.log(title)
        this.setState({
            uid: title
        })
    }
    togglePopup() {  
        this.setState({  
             showPopup: !this.state.showPopup  
        });  
         }  
    readMoreHandler = (ev, id) => {
        ev.preventDefault();
        if (typeof this.props.onReadMore === 'function') {
            this.props.onReadMore(id);
        }
    }
    componentDidMount(){
        Api.findByCategory("rommelmarkt")
            .then((data) => {
                console.log('postloader')
                this.setState(prevState => ({
                    ...prevState,
                    eventsrommelmarkt: data
                }));
                console.log(this.state.eventsrommelmarkt)
            })
            .catch((error) => {

            });
        Api.findAllEvents()
            .then((data) => {
                console.log('postloader')
                this.setState(prevState => ({
                    ...prevState,
                    events: data
                }));
                console.log(this.state.events)
            })
            .catch((error) => {

            });
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
                this.setState({ eventsscrape: data })
                console.log(this.state.eventsscrape)
              }
              
            getData(response.data)
            this.deleteGhost();

        })
        .catch(error => {
            toast.error(error.message, { position: toast.POSITION.BOTTOM_LEFT })
        })

    }
    render() {
        if(this.state.uid){
            return <EventDetail with={this.state.uid} />
        }else if(this.props.parameters === "rommelmarkt"){
            return(
                <React.Fragment>
                    
                </React.Fragment>
            )
        }else{
            

        return (
            <React.Fragment>
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
                        {this.state.events.map((item, index) =>
                        <section className="card" onClick={(ev) => this.openNewsPost(ev, item)} key={index}>
                            <img className="card-image loading" src={item.imageurl}/>
                            <div className="card-detail">
                            <h3 className="card-title loading">{item.title}</h3>
                            <p className="card-description loading">{item.body}</p>
                            <div className="fadeout"></div>

                            </div>
                        </section>
                        )}
                        
                        {this.state && this.state.events && this.state.eventsscrape.map((itemscrape, index) =>
                        <section className="card" key={index}>
                            <img className="card-image loading" src={itemscrape.image}/>
                            <div className="card-detail">
                            <h3 className="card-title loading">{itemscrape.title}</h3>
                            <p className="card-description loading">{itemscrape.bio}</p>
                            <div className="fadeout"></div>

                            </div>
                        </section>
                        )}
               
                        </div></div></section>
            </React.Fragment>
        )
    }
    }
}

export default (eventsLists);