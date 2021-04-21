import React from "react";
export const UserContext = React.createContext(
  {
    firstName: "",
    lastName: "",
    age: 14,
    setUserState: () => { },
    testDifficulty: 0,
    testTime: "",
    questions: []
  }
);
export default UserContext;
