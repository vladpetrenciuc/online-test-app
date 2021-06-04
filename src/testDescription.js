import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "./userContext";

export default function TestDescription() {
  const context = useContext(UserContext);
  const history = useHistory();

  const [state, setState] = useState({
    testDifficulty: 1,
    testTime: "",
    questions: [],
  })

  const handleChange = (event) => {
    if (context.testDifficulty !== "none") {
      const testData = require("../testJSONs/difficulty" + state.testDifficulty + ".json");
      let prevContext = context;
      prevContext.testDifficulty = state.testDifficulty;
      prevContext.testTime = testData.time.toString();
      prevContext.questions = testData.questions;
      context.setUserState(prevContext);
    }
    setState(prevState => {
      return { ...prevState, [event.target.name]: event.target.value }
    });
  }

  const handleSubmit = (event) => {
    const testData = require("../testJSONs/difficulty" + state.testDifficulty + ".json");
    let prevContext = context;
    prevContext.testDifficulty = state.testDifficulty;
    prevContext.testTime = testData.time.toString();
    prevContext.questions= testData.questions;
    context.setUserState(prevContext);
    history.push("/testStart");
  }

  const selectDificulty = () => {
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

  const describeTest = () => {
    console.log(context);
    if (context.testDifficulty !== undefined && context.testDifficulty !== 0) {
      return <h3>The test contains {context.questions.length} questions. You have a time limit of {context.testTime} minutes to complete it. <br></br>
      The test will auto submit after the time runs out. Good luck!</h3>;
    }
  }

  return (
    <div>
      <h2>Hello {context.firstName + ' ' + context.lastName}!</h2>
      <h2>Test Description and Difficulty</h2>
      <form onSubmit={handleSubmit}>
        <label>Select Dificulty:</label>
        <select name="testDifficulty" onChange={handleChange}>
          {selectDificulty()}
        </select>
        <br></br>
        <br></br>
        <input type="submit" value="Begin Test" />
      </form>
      <h3>{describeTest()}</h3>
    </div>
  )
}
