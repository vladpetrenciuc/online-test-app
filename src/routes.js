import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Registration from "./registration"
import TestDescription from "./testDescription"

export default function RouteAndSwitch() {
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
          <Route exact path="/">
            <Registration />
          </Route>
          <Route exact path="/test">
            <TestDescription />
          </Route>
          <Route path="/about">
            <About />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}
