import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "./userContext";

export default function TestDescription() {
  const context = useContext(UserContext);
  const [state, setState] = useState({
    testDifficulty: 1,
    testTime: "",
    questions: [],
    redirectToStartTest: false
  })

  const handleChange = (event) => {
    setState(prevState => {
      return { ...prevState, [event.target.name]: event.target.value }
    });
  }

  const handleSubmit = (context) => (event) => {
    const testData = require("../testJSONs/difficulty" + state.testDifficulty + ".json");
    context.setUserState({ testDifficulty: state.testDifficulty, testTime: testData.time.toString(), questions: testData.questions });
    setState({ redirectToStartTest: true });
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

  if (state.redirectToStartTest === true) {
    return <Redirect to="/testStart" />;
  } else {
    return (
      <div>
        <h2>Hello {context.firstName + ' ' + context.lastName}!</h2>
        <h2>Test Description and Dificulty</h2>
        <form onSubmit={handleSubmit(context)}>
          <label>Select Dificulty:</label>
          <select onChange={handleChange}>
            {selectDificulty()}
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
