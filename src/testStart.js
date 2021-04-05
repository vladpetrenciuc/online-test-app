import React, { Component } from "react";
import UserContext from "./userContext";
import { Redirect } from "react-router-dom";

export default class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question_number: 0,
      redirectToResult: false
    }
  }

  handleClick = (context) => (event) => {
    if (this.state.question_number === context.questions.length-1) {
      this.setState({ redirectToResult: true });
    } else {
      this.setState({ question_number: this.state.question_number + 1 });
    }
  }

  buttonText = (context) => {
    if (this.state.question_number < context.questions.length-1) {
      return "Next question";
    } else {
      return "End test";
    }
  }

  render() {

    if (this.state.redirectToResult) {
      return(
      <Redirect to="/result" />
      )
    } else {
      return (
        <UserContext.Consumer>
          {context => (
            <div>
              <h2>Question number {this.state.question_number + 1}</h2>
              <h2>{context.questions[this.state.question_number]["question"]}</h2>
              <form>
                {
                  Object.keys(context.questions[this.state.question_number]["answers"]).map((answer) => {
                    return (
                      <label key={answer}>
                        <input type="radio" value={context.questions[this.state.question_number]["answers"][answer]} name="answer" />{context.questions[this.state.question_number]["answers"][answer]}
                        <br />
                      </label>
                    )
                  })
                }
                <br />
              </form>
              <input type="button" value={this.buttonText(context)} onClick={this.handleClick(context)} />
            </div>
          )}
        </UserContext.Consumer>
      )
    }
  }
}