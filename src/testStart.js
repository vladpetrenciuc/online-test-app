import React, { useState, useContext, useEffect } from "react";
import UserContext from "./userContext";
import { useHistory } from "react-router-dom";
import { useTimer } from 'react-timer-hook';

export default function Test() {
  const context = useContext(UserContext);
  const history = useHistory();
  const time = new Date();
  time.setSeconds(time.getSeconds() + parseInt(context.testTime) * 60);
  const expiryTimestamp = time;

  const [state, setState] = useState(
    {
      question_number: 0,
      userAnswers: {},
    }
  )

  const handleChange = (event) => {
    let answerArray = state.userAnswers;
    answerArray[state.question_number] = event.target.value;
    setState(prevState => { return { ...prevState, userAnswers: answerArray } });
  }

  const handleCheckBoxChange = (event) => {
    let answerArray = state.userAnswers;
    if (answerArray[state.question_number] === undefined) {
      answerArray[state.question_number] = [event.target.value];
    } else if (answerArray[state.question_number].includes(event.target.value)) {
      answerArray[state.question_number].splice(answerArray[state.question_number].indexOf(event.target.value), 1);
    } else {
      answerArray[state.question_number].push(event.target.value);
    }
    setState(prevState => { return { ...prevState, userAnswers: answerArray } });
  }

  const handleClick = (event) => {
    let prevContext = context;
    prevContext.userAnswers = state.userAnswers;
    context.setUserState(prevContext);
    if (state.question_number === context.questions.length - 1) {
      history.push("/result");
    } else {
      setState(prevState => { return { ...prevState, question_number: state.question_number + 1 } });
    }
  }

  const buttonText = () => {
    if (!isRunning) { start() };
    if (state.question_number < context.questions.length - 1) {
      return "Next question";
    } else {
      return "End test";
    }
  }

  const listRadioAnswers = () => {
    if (context.questions[state.question_number].type === "radio buttons") {
      return (Object.keys(context.questions[state.question_number].answers).map((answer) => {
        return (
          <label key={answer}>
            <input type="radio" value={context.questions[state.question_number].answers[answer]} name="answer" onChange={handleChange} />{context.questions[state.question_number].answers[answer]}
            <br />
          </label>
        )
      }))
    }
  }

  const listCheckBoxAnswers = () => {
    if (context.questions[state.question_number].type === "checkboxes") {
      return (Object.keys(context.questions[state.question_number].answers).map((answer) => {
        return (
          <label key={answer}>
            <input type="checkbox" value={context.questions[state.question_number].answers[answer]} name="answer" onChange={handleCheckBoxChange} />{context.questions[state.question_number].answers[answer]}
            <br />
          </label>
        )
      }))
    }
  }

  const {
    seconds,
    minutes,
    hours,
    isRunning,
    start
  } = useTimer({ expiryTimestamp, onExpire: () => {
    let prevContext = context;
    prevContext.userAnswers = state.userAnswers;
    context.setUserState(prevContext);
    history.push("/result")} });


  const onBackButtonEvent = (e) => {
    e.preventDefault();
    if (window.confirm("Do you want to go back to the test description page? You will lose all your progress")) {
      let prevContext = context;
      prevContext.userAnswers = [];
      context.setUserState(prevContext);
      history.push("/test");
    } else {
      window.history.pushState(null, null, window.location.pathname);
    }
  }


useEffect(() => {
  window.history.pushState(null, null, window.location.pathname);
  window.addEventListener('popstate', onBackButtonEvent);
  return () => {
    window.removeEventListener('popstate', onBackButtonEvent);
  };
});


return (
  <div>
    <h2>Test time: </h2><span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
    <h2>Question number {state.question_number + 1}</h2>
    <h2>{context.questions[state.question_number].question}</h2>
    <form>
      {
        listRadioAnswers()
      }
      {
        listCheckBoxAnswers()
      }
      <br />
    </form>
    <input type="button" value={buttonText()} onClick={handleClick} />
  </div>
)
}