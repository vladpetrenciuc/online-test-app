import React, { useContext, useEffect } from "react";
import UserContext from "./userContext";
import { useHistory } from "react-router-dom";

export default function Result() {
  const context = useContext(UserContext);
  const history = useHistory();
  const runOnce = 0;

  const answersEqual = (arr1, arr2) => {
    if (arr1 && arr2 && !Array.isArray(arr1) && !Array.isArray(arr2)) {
      if (arr1 === arr2) {
        return true;
      } else {
        return false;
      }
    } else if(arr1 && arr2) {
      if (arr1.length !== arr2.length) {
        return false;
      }
      for (let i = 0; i < arr1.length; i++) {
        if (!arr2.includes(arr1[i])) {
          return false;
        }
      }
      return true;
    }
  }

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

  const getResult = () => {
    if (runOnce === 0) {
      let score = 0;
      for (let i = 0; i < context.questions.length; i++) {
        if (answersEqual(context.questions[i].correct, context.userAnswers[i])) {
          score++;
        }
      }
      return (`${score}/${context.questions.length}`)
    }
  }

  return (
    <div>
      <h2>Congratulations on finishing the test!</h2>
      <h3>Your result is: {
        getResult()
      }</h3>
    </div>
  )
}
