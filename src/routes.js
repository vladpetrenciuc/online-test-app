import { React, Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Registration from "./registration";
import TestDescription from "./testDescription";
import UserContext from "./userContext";

export default class RouteAndSwitch extends Component {
  setUserState = ({ firstName, lastName, age }) => {
    this.setState({ firstName: firstName, lastName: lastName, age: age });
  }
  state = {
    firstName: "",
    lastName: "",
    age: 14,
    setUserState: this.setUserState
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
              <Route path="/about">
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
    </div>
  );
}
