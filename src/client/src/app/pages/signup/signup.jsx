import axios from 'axios';
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
import { FormErrors } from './formError';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


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
    marginTop: theme.spacing.unit * 30,
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
  panelDefault:{
    color: '#D8000C',
    backgroundColor: '#FFD2D2',
    padding: `2px`,
    fontSize: '1em',
    verticalAlign: 'middle',
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
      password:'',
      formErrors: {email: '', password: ''},
      emailValid: false,
      passwordValid: false,
      formValid: false

    }
  
		this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)

  }
 

  handleChange(el) {
    let nextState = {...this.state, localProvider: {...this.state.localProvider, [el.target.name]: [el.target.value] } };
    this.setState(nextState);
  }
  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  }
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '': ' is too short';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    emailValid: emailValid,
                    passwordValid: passwordValid
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.passwordValid});
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

	handleSubmit(event) {
		console.log('sign-up handleSubmit, username: ')
		console.log(this.state.username)
		event.preventDefault()

		//request to server to add a new username/password
		axios.post('/api/v1/users/', {
      username: this.state.username,
        email: this.state.email,
        password: this.state.password
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

  render() {
    const { classes } = this.props;

    

    return (
      <React.Fragment>
                  <div className="discover"></div>

        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h2" variant="h5">
            Sign in
          </Typography>
      
          <form  className={classes.form}>
          <FormControl margin="normal"  required fullWidth>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input name="username" type="text" id="username"  autoComplete="username" onChange={this.handleInputChange} value={this.state.username} />
            </FormControl>
            <FormControl margin="normal"  className={`form-group ${this.errorClass(this.state.formErrors.email)}`} required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="email" name="email" autoComplete="email" onChange={this.handleInputChange} value={this.state.email}/>
            </FormControl>
            <FormControl margin="normal" className={`form-group ${this.errorClass(this.state.formErrors.password)}`} required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input type="password" id="password" autoComplete="current-password" onChange={this.handleInputChange}  value={this.state.password} name="password"/>
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
              className={classes.submit}
              onClick={this.handleSubmit}

            >
              Sign in
            </Button>
          </form>
        </Paper>
        <div >
          <FormErrors className={classes.panelDefault} formErrors={this.state.formErrors} />
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

export default withStyles(styles)(Signup);