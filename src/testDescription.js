import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "./userContext";
//import { UserContextConsumer } from "./userContext"

export default class TestDescription extends Component {

  constructor(props) {
    super(props);
    this.state = {
      testDifficulty: 1,
      testTime: "",
      questions: [],
      redirectToStartTest: false
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = (context) => (event) => {
    let testData = require("../testJSONs/difficulty" + this.state.testDifficulty + ".json");
    //this.setState({ testTime: testData.time.toString(), questions: testData.questions });
    context.setUserState({ testDifficulty: this.state.testDifficulty, testTime: testData.time.toString(), questions: testData.questions});
    this.setState({ redirectToStartTest: true });
  }

  selectDificulty() {
    let optionList = [];
    optionList.push(
      <option key={0} value={"none"}>
        {"Please select the desired difficulty level"}
      </option>
    )
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
        <UserContext.Consumer>
          {context => (
            <div>
              <h2>Hello {context.firstName + ' ' + context.lastName}!</h2>
              <h2>Test Description and Dificulty</h2>
              <form onSubmit={this.handleSubmit(context)}>
                <label>Select Dificulty:</label>
                <select onChange={this.handleChange}>
                  {this.selectDificulty()}
                </select>
                <br></br>
                <br></br>
                <input type="submit" value="Begin Test" />
              </form>
              <h3>TO DO: Here will appear the test description depending on dificulty</h3>
            </div>
          )}
        </UserContext.Consumer>
      )
    }
  }
}