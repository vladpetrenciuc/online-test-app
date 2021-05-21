import React, { useContext } from "react";
import UserContext from "./userContext";

export default function Result() {
  const context = useContext(UserContext);

  const answersEqual = (arr1, arr2) => {
    if (arr1 && arr2 && !Array.isArray(arr1) && !Array.isArray(arr2)) {
      if (arr1 === arr2) {
        return true;
      } else {
        return false;
      }
    } else {
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

  const getResult = () => {
    let score = 0;
    for (let i = 0; i < context.questions.length; i++) {
      if (answersEqual(context.questions[i].correct, context.userAnswers[i])) {
        score++;
      }
    }
    return (`${score}/${context.questions.length}`)
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
