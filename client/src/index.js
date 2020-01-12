import 'materialize-css/dist/css/materialize.min.css';      // webpack assumes this is npm module, so it isn't necessary to use '/' at beginnning
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

// Dev testing for sending emails
import axios from 'axios';
window.axios = axios;

// currently has dummy reducer
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

// Provider informs all children of new/updated state and rerenders
ReactDOM.render(
    <Provider store={store}><App /></Provider>, 
    document.querySelector('#root')
);

// Look in .env.development and .env.production to see keys.
// The keys are the same because we're not activating Stripe account forreal.
//console.log('STRIPE KEY IS ', process.env.REACT_APP_STRIPE_KEY);
//console.log('Environment is ', process.env.NODE_ENV);