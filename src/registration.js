import React, { Component } from "react";
import { Redirect } from "react-router-dom";

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
    for (let i = 14; i < 65; i++) {
      optionList.push(
        <option key={i} value={i}>
          {i}
        </option>
      )
    }
    return optionList;
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    this.setState({ redirectToTest: true });
  }

  render() {
    if (this.state.redirectToTest === true) {
      return <Redirect to={{ pathname: "/test", state: { firstName: this.state.firstName, lastName: this.state.lastName, age: this.state.age } }} />; //this may not be correct or useful
    } else {
      return (
        <div>
          <h2>Registration</h2>
          <form onSubmit={this.handleSubmit}>
            <label>
              First Name:
            <input type="text" name="first_name" onChange={this.handleChange} />
            </label>
            <br></br>
            <br></br>
            <label>
              Last Name:
            <input type="text" name="last_name" onChange={this.handleChange} />
            </label>
            <br></br>
            <br></br>
            <label>
              Age:
            <select onChange={this.handleChange}>
                {this.selectListAge()}
              </select>
            </label>
            <br></br>
            <br></br>
            <input type="submit" value="Submit" />
          </form>
        </div>
      );
    }
  }
}