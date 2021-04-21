import React, { useState, useContext } from "react";
import UserContext from "./userContext";
import { useHistory } from "react-router-dom";

export default function Test() {
  const context = useContext(UserContext);
  const history = useHistory();

  const [state, setState] = useState(
    {
      question_number: 0,
    }
  )

  const handleClick = (event) => {
    if (state.question_number === context.questions.length - 1) {
      history.push("/result");
    } else {
      setState({ question_number: state.question_number + 1 });
    }
  }

  const buttonText = () => {
    if (state.question_number < context.questions.length - 1) {
      return "Next question";
    } else {
      return "End test";
    }
  }

  const listAnswers = () => {
    return (Object.keys(context.questions[state.question_number].answers).map((answer) => {
      return (
        <label key={answer}>
          <input type="radio" value={context.questions[state.question_number].answers.answer} name="answer" />{context.questions[state.question_number].answers[answer]}
          <br />
        </label>
      )
    }))
  }

  return (
    <div>
      <h2>Question number {state.question_number + 1}</h2>
      <h2>{context.questions[state.question_number].question}</h2>
      <form>
        {
          listAnswers()
        }
        <br />
      </form>
      <input type="button" value={buttonText()} onClick={handleClick} />
    </div>
  )
}