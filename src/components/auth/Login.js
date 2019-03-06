import React, {Component} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {loginUser} from "../../actions/authActions";
import classnames from "classnames";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/dashboard"); // push user to dashboard when they login
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange = e => {
        this.setState({[e.target.id]: e.target.value});
    };

    onSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
    };

    render() {
        const {errors} = this.state;
        let errorMessage;
        if (this.state.errors.error) {
            errorMessage = <p>{this.state.errors.error}.</p>;
        }

        return (
            <div className="grid-container">
                <div className="content-wrap">
                    <div className="grid-50 tablet-grid-60">
                        <div className="content-shadow">
                            <h1>
                                Welcome to&nbsp;the Tasmanian Government online application service for international students. </h1>
                            <p>
                                International applicants for Tasmanian Government schools and TasTAFE should apply here. Applications will be&nbsp;processed by&nbsp;Government Education and Training International ( <abbr title="Government Education and Training International"> GETI </abbr> ).
                            </p>
                            <p>
                                Registered userscan save and submit applications to their chosen courses, and submit enquiries to{" "}
                                <abbr title="Government Education and Training International"> GETI </abbr> . </p>
                            <p>&nbsp;</p>
                            <p>&nbsp;</p>
                            <button className="buttons">Register</button>
                            <p>
                                <a href="#">Technical support</a> | <a href="#">Contact us</a>
                            </p>
                        </div>
                    </div>
                    <div className="grid-50 tablet-grid-40">
                        <div className="content-shadow">
                            <form noValidate onSubmit={this.onSubmit}>
                                <label htmlFor="email"> E-mail <sup className="required">*</sup> </label>
                                <input id="email" placeholder="Your e-mail" onChange={this.onChange} value={this.state.email} error={errors.email} type="text" className={classnames("text", {
                                    invalid: errors.email || errors.emailnotfound
                                })}/> <span className="red-text">{errors.email} {errors.emailnotfound}</span>

                                <label htmlFor="password"> Password <sup className="required">*</sup> </label>
                                <input id="password" placeholder="Your password" onChange={this.onChange} value={this.state.password} error={errors.password} type="password" className={classnames("text", {
                                    invalid: errors.password || errors.passwordincorrect
                                })}/> <span className="red-text">{errors.password} {errors.passwordincorrect}</span>

                                <button className="buttons" type="submit">
                                    Login
                                </button>
                            </form>
                            {errorMessage}
                            <p>
                                <a href="#">I have forgotten my password</a>.{" "}
                            </p>
                        </div>
                    </div>
                    <div className="clear">&nbsp;</div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    {loginUser}
)(Login);
