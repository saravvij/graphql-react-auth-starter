import React, { Component } from "react";
import { graphql } from "react-apollo";
import AuthForm from "./AuthForm";
import loginMutation from "../queries/login";
import { hashHistory } from "react-router";
import query from "../queries/current-user";

class Login extends Component {
  constructor() {
    super();
    this.state = { errors: [] };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit({ email, password }) {
    event.preventDefault();
    console.log(event);
    this.props
      .mutate({
        variables: {
          email,
          password
        },
        refetchQueries: [{ query }]
      })
      .then(() => {
        hashHistory.push("/");
      })
      .catch(res => {
        const errors = res.graphQLErrors.map(error => error.message);
        this.setState({ errors });
      });
  }

  render() {
    console.log(this.props);
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

export default graphql(loginMutation)(Login);
