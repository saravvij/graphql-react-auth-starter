import React, { Component } from "react";
import { graphql } from "react-apollo";
import AuthForm from "./AuthForm";
import loginMutation from "../queries/login";
import query from '../queries/current-user';
import { hashHistory } from "react-router";

class Login extends Component {
  constructor() {
    super();
    this.state = { errors: [] };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillUpdate(nextProps) {
    if (!this.props.data.currentUser && nextProps.data.currentUser) {
      hashHistory.push("/dashboard");
    }
  }

  onSubmit({ email, password }) {
    event.preventDefault();
    this.props
      .mutate({
        variables: {
          email,
          password
        },
        refetchQueries: [{ query }]
      })
      .catch(res => {
        const errors = res.graphQLErrors.map(error => error.message);
        this.setState({ errors });
      });
  }

  render() {
    return (
      <div>
        <h3>Login</h3>
        <AuthForm
          buttonLabel="Login"
          onSubmit={this.onSubmit}
          errors={this.state.errors}
        ></AuthForm>
      </div>
    );
  }
}

export default graphql(query)(
  graphql(loginMutation)(Login)
);
