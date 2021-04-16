import React, { useState, useContext } from "react";
import UserContext from "./userContext";
import { Redirect } from "react-router-dom";

export default function Test() {
  const context = useContext(UserContext);
  const [state, setState] = useState(
    {
      question_number: 0,
      redirectToResult: false
    }
  )

  const handleClick = (context) => (event) => {
    if (state.question_number === context.questions.length - 1) {
      setState({ redirectToResult: true });
    } else {
      setState({ question_number: state.question_number + 1 });
    }
  }

  const buttonText = (context) => {
    if (this.state.question_number < context.questions.length - 1) {
      return "Next question";
    } else {
      return "End test";
    }
  }

  if (this.state.redirectToResult) {
    return (
      <Redirect to="/result" />
    )
  } else {
    return (
      <div>
        <h2>Question number {state.question_number + 1}</h2>
        <h2>{context.questions[state.question_number]["question"]}</h2>
        <form>
          {
            Object.keys(context.questions[state.question_number]["answers"]).map((answer) => {
              return (
                <label key={answer}>
                  <input type="radio" value={context.questions[state.question_number]["answers"][answer]} name="answer" />{context.questions[state.question_number]["answers"][answer]}
                  <br />
                </label>
              )
            })
          }
          <br />
        </form>
        <input type="button" value={buttonText(context)} onClick={handleClick(context)} />
      </div>
    )
  }
}