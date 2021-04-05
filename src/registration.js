import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "./userContext";

export default class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      age: 0,
      redirectToTest: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this); //this will probably be redone with arrow functions
  }

  selectListAge() {
    let optionList = [];
    optionList.push(
      <option key={0} value="none">
        {"Please select your age"}
      </option>
    )
    for (let i = 14; i < 65; i++) {
      optionList.push(
        <option key={i} value={i}>
          {i}
        </option>
      )
    }
    return optionList;
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = (context) => (event) => {
    context.setUserState({ firstName: this.state.firstName, lastName: this.state.lastName, age: this.state.age });
    this.setState({redirectToTest: true });
  }

  render() {
    if (this.state.redirectToTest === true) {
      return (
        <Redirect to="/test" />
      )
    } else {
      return (
        <UserContext.Consumer>{context => (
          <div>
            <h2>Registration</h2>
            <form onSubmit={this.handleSubmit(context)}>
              <label>
                First Name:
            <input type="text" name="firstName" onChange={this.handleChange} />
              </label>
              <br></br>
              <br></br>
              <label>
                Last Name:
            <input type="text" name="lastName" onChange={this.handleChange} />
              </label>
              <br></br>
              <br></br>
              <label>
                Age:
              <select name="age" onChange={this.handleChange}>
                  {this.selectListAge()}
                </select>
              </label>
              <br></br>
              <br></br>
              <input type="submit" value="Submit" />
            </form>
          </div>)}

        </UserContext.Consumer>
      );
    }
  }
}