import React from 'react';
import ReactDOM from 'react-dom';
import LoginWeb from './LoginWeb';
import App from './App'
import registerServiceWorker from './registerServiceWorker';



ReactDOM.render(
    <LoginWeb /> //  to View on HIS Change to <App/>
    , document.getElementById('root'));
registerServiceWorker();
