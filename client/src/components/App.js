import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';          // give certain components the ability to call action creators
import * as actions from '../actions';          // all the different action creators we have defined, and assign them 'actions'

// BrowserRouter dictates what will be displayed based on the URL

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';


class App extends Component {
    // Once this component renders, search for logged in user
    componentDidMount() {
        this.props.fetchUser();     // action defined in actions/index.js
    }


    render() {
        return (
            <BrowserRouter>
                <div className="container">
                    <Header />
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/surveys" component={Dashboard} />
                    <Route path="/surveys/new" component={SurveyNew} />
                </div>
            </BrowserRouter>
        );
    };
}

// passing null for map states to props (first argument), then passing in all actions we want (action creator)
export default connect(null, actions)(App);