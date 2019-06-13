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

let hamburgerclicked = false;
document.querySelector('.hamburger').addEventListener('click', function(){
    if(hamburgerclicked === true){
        document.querySelector('.navigation').style.left = '-100%';
        document.querySelector('.hamburger').style.transform ='rotate(0deg)'

        hamburgerclicked = false;
    }else{
        document.querySelector('.navigation').style.left = '0';
        document.querySelector('.hamburger').style.transform ='rotate(90deg)'
        hamburgerclicked = true;
    }
})


