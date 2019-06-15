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
class Popup extends React.Component {  
    constructor(){
        super();
        this.state={
            date : new Date()
        }
    }
    
    handleDatechange(event,date){
        this.setState({date: date})
    }
  render() {  
return (  
<div className='popup'>  
<div className='popup_inner'>  
<h2>{this.props.text}</h2>  

<FormControl margin="normal" required fullWidth>
    <InputLabel htmlFor="text">Title</InputLabel>
    <Input type="text" id="title"  name="title"/>
</FormControl>

<FormControl margin="normal" required fullWidth>
    <TextField label="Bio" className="textarea" multiline={true} type="text" id="body"  name="body"/>
</FormControl>
<FormControl required fullWidth >
        <InputLabel htmlFor="name">Label</InputLabel>
            <Select
                native required
                    inputProps={{
                         name: 'categorie',
                         id: 'categorie'
                        }}
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
        label="Next appointment"
        type="datetime-local"
        onChange={this.handleDatechange}
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