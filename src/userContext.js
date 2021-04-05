import React, { Component } from "react";
export const UserContext = React.createContext(
  {
    firstName: "",
    lastName: "",
    age: 14,
    setUserState: () => { }
  }
);
export default UserContext;
