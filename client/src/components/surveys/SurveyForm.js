// SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
    renderFields() {        // lecture 159 if confused about the destructuring in the .map()
        return _.map(formFields, ({ label, name }) => {
            return <Field key={name} component={SurveyField} type="text" label={label} name={name} />
        });
    }
    
    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat white-text">
                        Cancel
                    </Link>
                    <button type="submit" className="teal btn-flat right white-text">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    errors.recipients = validateEmails(values.recipients || '');    // when the form initially appears, it is 
                                                                    // checking for errors, so value.emails 
                                                                    // doesn't necessarily exist yet. Thus we 
                                                                    // pass the empty string in that case.

    _.each(formFields, ({ name }) => {
        if (!values[name]) {        // to reference a property of an object on the fly, we use []
            errors[name] = 'You must provide a value';
        }
    });

    return errors;      // if this is empty, redux form thinks all is good and we're good to go.
}

export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false     // Keeps fields in survey if the user clicks the 'Back' button in SurveyFormReview
})(SurveyForm);