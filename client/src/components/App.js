import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';          // give certain components the ability to call action creators
import * as actions from '../actions';          // all the different action creators we have defined, and assign them 'actions'

// BrowserRouter dictates what will be displayed based on the URL

import Header from './Header';
import Landing from './Landing';
const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>


class App extends Component {
    // Once this component renders, search for logged in user
    componentDidMount() {
        this.props.fetchUser();     // action defined in actions/index.js
    }


    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/surveys" component={Dashboard} />
                        <Route path="/surveys/new" component={SurveyNew} />
                    </div>
                </BrowserRouter>
            </div>
        );
    };
}

// passing null for map states to props (first argument), then passing in all actions we want (action creator)
export default connect(null, actions)(App);