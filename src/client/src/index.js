import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyD_ILCmLttiyDdLhUqo_Cf6O2agEd5mtxU",
    authDomain: "scuso-cb1ee.firebaseapp.com",
    databaseURL: "https://scuso-cb1ee.firebaseio.com",
    projectId: "scuso-cb1ee",
    storageBucket: "scuso-cb1ee.appspot.com",
    messagingSenderId: "966229664157",
    appId: "1:966229664157:web:43854b941ba198e0"
  };

firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
let hamburgerclicked = false;
document.querySelector('.hamburger').addEventListener('click', function(){
    if(hamburgerclicked === true){
        document.querySelector('.navigation').style.left = '-100%';

        document.querySelector('.hamburger').style.transform ='rotate(0deg)'
        document.querySelector('.menubar').style.zIndex = "600"
        document.querySelector('.menubar').style.left = "0"
        document.querySelector('.hamburger').style.color ='black'

        document.querySelector('.discover').style.zIndex = "607"
        hamburgerclicked = false;
    }else{
        document.querySelector('.navigation').style.left = '0';
        document.querySelector('.hamburger').style.transform ='rotate(90deg)'
        document.querySelector('.hamburger').style.color ='white'
        document.querySelector('.hamburger').style.zIndex ='99999';
        hamburgerclicked = true;
        document.querySelector('.menubar').style.left = "100%"
        document.querySelector('.discover').style.zIndex = "0"

    }
})



