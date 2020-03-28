import React from "react";

export default class AuthForm extends React.Component {
  constructor() {
    super();
    this.state = { email: "", password: "" };
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnSubmit(e) {
    e.preventDefault();
    this.props.onSubmit({
      email: this.state.email,
      password: this.state.password
    });
  }

  render() {
    const { buttonLabel = "Submit", errors } = this.props;
    console.log('errors in authform', errors);
    return (
      <div className="row">
        <form className="col s12" onSubmit={this.handleOnSubmit}>
          {errors.length > 0 && (
            <div className="row">
              <div className="col s6 card-panel red lighten-1">
                <ul>
                  { errors.map((error, index) => <li key={index}>{error}</li>) }
                </ul>
              </div>
            </div>
          )}

          <div className="row">
            <div className="input-field col s6">
              <input
                placeholder="Email"
                id="email"
                name="email"
                type="email"
                required
                className="validate"
                onChange={e => this.setState({ email: e.target.value })}
              ></input>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <input
                placeholder="Password"
                id="password"
                name="password"
                type="password"
                required
                className="validate"
                onChange={e => this.setState({ password: e.target.value })}
              ></input>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <button className="btn">{buttonLabel}</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
