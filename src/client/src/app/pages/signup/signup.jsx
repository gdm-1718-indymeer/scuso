import axios from 'axios';
import { Link } from 'react-router-dom';
/*
Import extenal libraries
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
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


/*
Material UI
*/
import Grid from '@material-ui/core/Grid';

/*
Components
*/

/*
Styling
*/
const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class Signup extends Component {
  constructor() {
		super()
		this.state = {
			username: '',
      email: '',
      redirectTo: null,
      localProvider:{
        password: {
          value:''
        }
      }
      

    }
  
		this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleInputChange(event, value){
      this.setState({
        [event.target.name]: event.target.value
      })
  }
  handleChange(el) {
    let inputName = el.target.name;
    let inputValue = el.target.value;

    let statusCopy = Object.assign({}, this.state);
    statusCopy.localProvider[inputName].value = inputValue;

    this.setState(statusCopy);
  }
	handleSubmit(event) {
		console.log('sign-up handleSubmit, username: ')
		console.log(this.state.username)
		event.preventDefault()

		//request to server to add a new username/password
		axios.post('/api/v1/users/', {
			...this.state
		})
			.then(response => {
				console.log(response)
				if (!response.data.errmsg) {
          console.log('successful signup')
          this.props.history.push("/");
				} else {
					console.log('username already taken')
				}
			}).catch(error => {
				console.log('signup error: ')
				console.log(error)

			})
  }  
  render() {
    const { classes } = this.props;

    

    return (
      <React.Fragment>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form  className={classes.form}>
          <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input name="username" type="text" id="username"  autoComplete="username" onChange={this.handleInputChange}  />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="email" name="email" autoComplete="email" onChange={this.handleInputChange} />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input type="password" id="password" autoComplete="current-password" onChange={this.handleChange} name="password"/>
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"

            >
              Sign in
            </Button>
          </form>
        </Paper>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Signup);