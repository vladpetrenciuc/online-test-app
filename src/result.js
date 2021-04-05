import React, { Component } from "react";
import UserContext from "./userContext";

export default class Result extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){
        return(
            <UserContext.Consumer>
                {context => (
                    <div>
                        <h2>Congratulations on finishing the test!</h2>
                    </div>
                )}
            </UserContext.Consumer>
        )
    }
}