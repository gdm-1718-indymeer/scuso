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
import MenuItem from '@material-ui/core/MenuItem'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import * as firebase from 'firebase'
import FileUploader from 'react-firebase-file-uploader'
import Api from '../../services'
import {eventPost} from './UserFunction'

const fontArray = ["kickoff", "rommelmarkt", "open aanbod", "openlab"  ]
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
            label: 'None',
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
    renderValue = (value) => {
        return value && value[0];
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
        [event.target.name]: event.target.value
    })
    console.log(this.state)
    }
    onSubmit(e){
        e.preventDefault()
    
        const user = {
        author: this.state.author,
          title: this.state.title,
          imageurl: this.state.imageurl,
          body: this.state.body,
          data: this.state.data,
          price: this.state.price,
          label: this.state.label,
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


<FormControl fullWidth>
       <InputLabel htmlFor="select-font">Label</InputLabel>
       <Select
         value={this.state.label}
          onChange={this.handleChange}
   
          inputProps={{
            name: "label",
            id: "abel"
          }}
        >
        <MenuItem value="nothing">
            <em>None</em>
          </MenuItem>
          <MenuItem value="kick-off">kick-off</MenuItem>
          <MenuItem value="rommelmarkt">rommelmarkt</MenuItem>
          <MenuItem value="open aanbod">open aanbod</MenuItem>
          <MenuItem value="open lab">open lab</MenuItem>

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
<FormControl margin="normal" required fullWidth>
    <InputLabel htmlFor="text">Prijs</InputLabel>
    <Input type="text" id="prijs"  name="price" onChange={this.handleChange}  value={this.state.price}/>
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