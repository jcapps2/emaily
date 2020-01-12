// SurveyField contains logic to render a single label and text input
import React from 'react';

// lecture 157 explains the ...input. Lecture 162 explains the nested destructuring
export default ({ input, label, meta: { error, touched } }) => {
    return (
        <div>
            <label>{label}</label>
            <input {...input} style={{ marginBottom: '5px' }} />
            <div className="red-text" style={{ marginBottom: '20px' }}>
                {touched && error}
            </div>
        </div>
    );
};