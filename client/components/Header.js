import React, { Component } from "react";
import CurrentUserQuery from "../queries/current-user";
import { graphql } from "react-apollo";
import { Link } from "react-router";
import logoutMutation from "../queries/logout";

class Header extends Component {
  constructor() {
    super();
    this.onLogoutClick = this.onLogoutClick.bind(this);
  }

  onLogoutClick() {
    this.props.mutate({
      refetchQueries: [{ query: CurrentUserQuery }]
    });
  }
  
  renderButtons() {
    const { loading, currentUser } = this.props.data;

    if (loading) {
      return <span></span>;
    }

    if (currentUser) {
      return (
        <div>
          <li>
            <span>Welcome, {currentUser.email}</span>
          </li>
          <li>
            <a onClick={this.onLogoutClick}>Signout</a>
          </li>
        </div>
      );
    } else {
      return (
        <div>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </div>
      );
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo left">
            Home
          </Link>
          <ul className="right">{this.renderButtons()}</ul>
        </div>
      </nav>
    );
  }
}

export default graphql(logoutMutation)(graphql(CurrentUserQuery)(Header));
