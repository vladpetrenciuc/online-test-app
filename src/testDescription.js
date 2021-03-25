import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class TestDescription extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      age: 0,
      redirectToStartTest: false
    }
    this.handleSubmit = this.handleSubmit.bind(this); //this will probably be redone with arrow functions
  }

  handleSubmit(event) {
    this.setState({ redirectToStartTest: true });
  }

  selectDificulty() {
    let optionList = [];
    for (let i = 1; i <= 3; i++) {
      optionList.push(
        <option key={i} value={i}>
          {i}
        </option>
      )
    }
    return optionList;
  }

  render() {
    if (this.state.redirectToStartTest === true) {
      return <Redirect to="/testStart" />;
    } else {
      return (
        <div>
          <h2>Hello {this.state.firstName + ' ' + this.state.lastName}!</h2>
          <h2>Test Description and Dificulty</h2>
          <form onSubmit={this.handleSubmit}>
            <label>Select Dificulty:</label>
            <select>
              {this.selectDificulty()}
            </select>
            <br></br>
            <br></br>
            <input type="submit" value="Begin Test" />
          </form>
          <h3>TO DO: Here will appear the test description depending on dificulty</h3>
        </div>
      )
    }
  }
}