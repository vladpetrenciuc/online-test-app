import React, { useContext, useState } from "react";
import UserContext from "./userContext";

export default function Result() {
  const context = useContext(UserContext);
  const [state, setState] = useState({

  });

  return (
    <div>
      <h2>Congratulations on finishing the test!</h2>
      <h3>Your result is: {
        //show the result from context here
      }</h3>
    </div>
  )
}
