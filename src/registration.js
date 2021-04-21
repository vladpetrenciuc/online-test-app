import React, { useContext, useState } from "react";
import {useHistory} from "react-router-dom";
import UserContext from "./userContext";

export default function Registration() {
  const context = useContext(UserContext);
  const history = useHistory();

  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    age: 0,
  })

  const handleChange = (event) => {
    setState(prevState => {
      return { ...prevState, [event.target.name]: event.target.value }
    });
  }

  const handleSubmit = (event) => {
    context.setUserState({ firstName: state.firstName, lastName: state.lastName, age: state.age });
    history.push("/test");
  }

  const selectListAge = () => {
    let optionList = [];
    optionList.push(
      <option key={0} value="none">
        {"Please select your age"}
      </option>
    )
    for (let i = 14; i < 65; i++) {
      optionList.push(
        <option key={i} value={i}>
          {i}
        </option>
      )
    }
    return optionList;
  }

    return (
      <div>
        <h2>Registration</h2>
        <form onSubmit={handleSubmit}>
          <label>
            First Name:
            <input type="text" name="firstName" onChange={handleChange} />
          </label>
          <br></br>
          <br></br>
          <label>
            Last Name:
            <input type="text" name="lastName" onChange={handleChange} />
          </label>
          <br></br>
          <br></br>
          <label>
            Age:
              <select name="age" onChange={handleChange}>
              {selectListAge()}
            </select>
          </label>
          <br></br>
          <br></br>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  
}