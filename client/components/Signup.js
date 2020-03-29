import React, { Component } from "react";
import { graphql } from "react-apollo";
import AuthForm from "./AuthForm";
import signupMutation from "../queries/signup";
import { hashHistory } from "react-router";
import query from "../queries/current-user";

class Signup extends Component {
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
      }).catch(res => {
        const errors = res.graphQLErrors.map(error => error.message);
        this.setState({ errors });
      });
  }

  render() {
    return (
      <div>
        <div className="row">
          <h3>Signup</h3>
        </div>
        <AuthForm
          buttonLabel="Signup"
          onSubmit={this.onSubmit}
          errors={this.state.errors}
        ></AuthForm>
      </div>
    );
  }
}

export default graphql(query)(
  graphql(signupMutation)(Signup)
);
