// SurveyNew shows SurveyForm and SurveyFormReview
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
    /*
    constructor() {
        super(props);

        this.state = { new: true };
    }*/

    state = { showFormReview: false };      // 100% equivalent to the commented out constructor above. Left for comparison.

    renderContent() {
        if (this.state.showFormReview) {
            return <SurveyFormReview onCancel={() => this.setState({ showFormReview: false })} />;
        }

        return <SurveyForm onSurveySubmit={() => this.setState({ showFormReview: true })} />;
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

// Lecture 173: Dumping Form Values explains how this works
export default reduxForm({
    form: 'surveyForm'
})(SurveyNew);