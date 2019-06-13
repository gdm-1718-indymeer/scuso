import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
document.querySelector('.hamburger').addEventListener('click', function(){
    document.querySelector('.navigation').style.left = "0";
    document.querySelector('.body').style.marginLeft = "200px";
    document.querySelector('.body').style.width = "calc(100%-200px)";
    document.querySelector('.hamburger').style.display = "none"; 
    document.querySelector('.nohamburger').style.display = "block"; 
})
document.querySelector('.nohamburger').addEventListener('click', function(){
    document.querySelector('.navigation').style.left = "-200px";
    document.querySelector('.body').style.marginLeft = "0px";
    document.querySelector('.body').style.width = "100%";
    document.querySelector('.nohamburger').style.display = "none"; 
    document.querySelector('.hamburger').style.display = "block"; 
})

let windowwidth;


setInterval(function(){
    windowwidth = window.innerWidth;
    console.log(windowwidth)
    if(windowwidth>1600){
        document.querySelector('.navigation').style.left = "0";
        document.querySelector('.body').style.marginLeft = "200px";
        document.querySelector('.body').style.width = "calc(100%-200px)";
        document.querySelector('.nohamburger').style.display = "none"; 
        document.querySelector('.hamburger').style.display = "none";
    }else{
        document.querySelector('.navigation').style.left = "-200px";
        document.querySelector('.body').style.marginLeft = "0px";
        document.querySelector('.body').style.width = "100%";
        document.querySelector('.nohamburger').style.display = "none"; 
        document.querySelector('.hamburger').style.display = "block"; 
    }
}, 5000)
