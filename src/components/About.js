import UserContext from "../utils/UserContext";
import User from "./User";
import UserClass from "./UserClass";
import React from "react";

class About extends React.Component {
  constructor() {
    super();
    // console.log("Parent Constructor");
  }

  componentDidMount() {
    // console.log("Parent Component Did Mount");
  }

  render() {
    // console.log("Parent Rendered");
    return (
      <div>
        <h2>About Us</h2>
        <h4>This is Namaste React Webseries </h4>
        <UserContext.Consumer>
          {({ loggedInUser }) => (
            <h2 className="text-xl font-bold">{loggedInUser}</h2>
          )}
        </UserContext.Consumer>
        <UserClass name={"First"} location={"Bhiwandi"} />
      </div>
    );
  }
}
export default About;

/**
 * Parent Constructor
 * Parent Render
 *
 *  First Constructor
 *  First Render
 *
 *  Second Constructor
 *  Second Render
 *
 * < DOM UPDATED -  IN SINGLE BATCH >
 *  First Component Did Mount
 *  Second Componet Did Mount
 *
 *  Parent Component Did Mount
 *
 */
