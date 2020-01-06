import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
    // helper method to return proper jsx depending on whether or not the user is logged in
    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return <li><a href="/auth/google">Login with Google</a></li>;
            default:
                return [
                    <li key="1"><Payments /></li>,
                    <li key="3" style={{ margin: '0 10px' }}>
                        Credits: { this.props.auth.credits }
                    </li>,
                    <li key="2"><a href="/api/logout">Logout</a></li>
                ];
        }           // In the <li> above, we're passing the key attribute, because the browser thinks that
    }               // since we're returning an array, that it is an object for some reason. So this is a 
                    // fix for a warning in the console. Also, the key numbers don't have to be in order.

    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link 
                        to={this.props.auth ? '/surveys' : '/'} 
                        className="left brand-logo"
                    >
                        Emaily
                    </Link>
                    <ul className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Header);