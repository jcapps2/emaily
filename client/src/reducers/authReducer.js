import { FETCH_USER } from '../actions/types';

// null, so by default, the app has no idea if we are logged in.
export default function(state = null, action) {
    switch (action.type) {
        case FETCH_USER:
            return action.payload || false;
        default: 
            return state;
    }
}