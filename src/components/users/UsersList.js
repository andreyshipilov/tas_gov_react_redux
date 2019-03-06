import React, {Component} from "react";
import PropTypes from "prop-types";

import {connect} from "react-redux";
import {fetchUsers} from "../../actions/privateActions";

class UsersList extends Component {
    async componentDidMount() {
        await this.props.fetchUsers();
    }

    renderUsers() {
        return this.props.users.map(user => {
            return (
                <div className="user" key={user.id.toString()}>
                    <p>
                        <img src={user.avatar} alt="" className="img-responsive"/> <br/>
                        <span>{user.first_name} {user.last_name}</span>
                    </p>
                </div>
            );
        });
    }

    render() {
        return (
            <div className="grid-container">
                <div className="content-wrap">
                    <div className="grid-100">
                        <div className="content-shadow">
                            <h1>Users</h1>{this.renderUsers()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

UsersList.propTypes = {
    fetchUsers: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    users: state.users,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    {fetchUsers}
)(UsersList);
