import React from 'react';  
import './style.scss';  
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import * as firebase from 'firebase'
import FileUploader from 'react-firebase-file-uploader'
import Api from '../../services'
import {eventPost} from './UserFunction'


class Popup extends React.Component {  
    constructor(){
        super();
        this.state={
            author: '',
            image: '',
            imageurl:'',
            body:'',
            title: '',
            data:'',
            price:'',
            isUploading: false,
            progress: 0,
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        
    }
    componentWillMount() {
        let storage = localStorage.getItem('userId');
        if( storage ){
          Api.checkUser().then((response) => {

            this.setState({
              author: response.username,
            })
        })
        }else{  
        }
    }
    
    handleUploadStart = () => this.setState({isUploading: true, progress: 0});
    handleProgress = (progress) => this.setState({progress});
    handleUploadError = (error) => {
    this.setState({isUploading: false});
    }
    handleUploadSuccess = (filename) => {
    this.setState({image: filename, progress: 100, isUploading: false});
        firebase.storage().ref('test').child(filename).getDownloadURL().then(((url) => {
        this.setState({imageurl: url})          
        return url;
    })
    )
    };
    handleChange(event) {   
    this.setState({
        [`${event.target.name}`]: event.target.value,
    })
    console.log(this.state.label)
    console.log(this.state.data)

    }
    onSubmit(e){
        e.preventDefault()
    
        const user = {
          title: this.state.email,
          imageurl: this.state.password,
          body: this.state.body,
          data: this.state.data,
          price: this.state.price,
          author: this.state.author,
        }
        eventPost(user).then(res => {
          if(res){
            this.props.history.push('/events')
          }
        })
      }

  render() {  
return (  
<div className='popup'>  
<div className='popup_inner'>  
<h2>{this.props.text}</h2>  

<FormControl margin="normal" required fullWidth>
    <InputLabel htmlFor="text">Title</InputLabel>
    <Input type="text" id="title"  name="title" onChange={this.handleChange}  value={this.state.title}/>
</FormControl>
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
<FormControl margin="normal" required fullWidth>
    <TextField label="Bio" className="textarea" multiline={true} type="text" id="body"  name="body" onChange={this.handleChange}  value={this.state.body}/>
</FormControl>
<FormControl required fullWidth >
        <InputLabel htmlFor="name">Label</InputLabel>
            <Select
                ref={ref => {
                    this._select = ref
                }}
                        onChange={this.handleChange}  
                        value={this.state.label}
                        defaultValue={this.state.label}

            >
                <option value="" />
                <option value={"kick-off"}>kick-off</option>
                <option value={"rommelmarkt"}>rommelmarkt</option>
                <option value={"open aanbod"}>open aanbod</option>
                <option value={"openlab"}>openlab"</option>

            </Select>
 </FormControl>
<FormControl margin="normal" required fullWidth>
      <TextField
        id="datetime-local"
        name='data'
        label="Next appointment"
        type="datetime-local"
        onChange={this.handleChange}  value={this.state.data}
        InputLabelProps={{
          shrink: true,
        }}
      />
</FormControl>


<Button
    type="submit"
    fullWidth
    variant="contained"
    color="primary"
    onClick={this.onSubmit}

    >
    Send
</Button>

<button onClick={this.props.closePopup}>close me</button>  
</div>  
</div>  
);  
}  
}  

export default Popup;