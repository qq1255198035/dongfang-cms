import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '@/axios/axios.js';
import * as serviceWorker from './serviceWorker';
console.log(`Looks like we are in ${process.env.NODE_ENV} mode!`);
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
