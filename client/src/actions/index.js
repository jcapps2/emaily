import axios from 'axios';
import { FETCH_USER } from './types';

// redux-thunk allows us to manually use redux's dispatch function

// only one JS expression in this arrow function, so I can remove {} and remove the 'return.'
// redux-thunk automatically passes the dispatch function into the below function - dispatch recalculates app state
export const fetchUser = () => async dispatch => {
    // relative path to backend server
    const res = await axios.get('/api/current_user')         
    dispatch({ type: FETCH_USER, payload: res.data });
};  // If this function confuses you in the future, look at "Node with React: Fullstack Web Development"
    // course on Udemy, lecture 86 to see the original structure of this function, and how he refactors it.

// Taking care of Stripe token - lecture 103 if confused
export const handleToken = (token) => async dispatch => {
    const res = await axios.post('/api/stripe', token);         // posting token to backend server

    dispatch({ type: FETCH_USER, payload: res.data });          // remember that redux is allowing us to manually control the dispatch function to update state
};