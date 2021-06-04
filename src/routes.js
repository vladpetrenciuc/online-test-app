import { React, Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Registration from "./registration";
import TestDescription from "./testDescription";
import TestStart from "./testStart";
import Result from "./result";
import UserContext from "./userContext";

export default class RouteAndSwitch extends Component {
  setUserState = ({ firstName, lastName, age, testDifficulty, testTime, questions, userAnswers }) => {
    this.setState({
      firstName: firstName,
      lastName: lastName,
      age: age,
      testDifficulty: testDifficulty,
      testTime: testTime,
      questions: questions,
      userAnswers: userAnswers
    });
  }
  state = {
    firstName: "",
    lastName: "",
    age: 14,
    setUserState: this.setUserState,
    testDifficulty: 0,
    testTime: "",
    questions: [],
    userAnswers: {},
  }

  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Registration</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>

          <hr />

          <Switch>
            <UserContext.Provider value={this.state}>
              <Route exact path="/">
                <Registration />
              </Route>
              <Route exact path="/test">
                <TestDescription />
              </Route>
              <Route exact path="/testStart">
                <TestStart />
              </Route>
              <Route exact path="/result">
                <Result />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
            </UserContext.Provider>
          </Switch>
        </div>
      </Router>
    );
  }
}


function About() {
  return (
    <div>
      <h2>About</h2>
      <h3>Copyright Vlad Petrenciuc</h3>
    </div>
  );
}
