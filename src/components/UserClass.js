import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      count2: 1,
      userInfo: {
        name: "Dummy",
        location: "Default",
      },
    };
    // console.log(this.props.name + "Child Constructor");
  }

  async componentDidMount() {
    // console.log(this.props.name + 'Child Component Did Mount');

    const data = await fetch("https://api.github.com/users/akshch");
    const json = await data.json();

    // console.log(json);

    this.setState({
      userInfo: json,
    });
  }

  componentDidUpdate() {
    // console.log("Component Did Update");
  }

  componentWillUnmount() {
    console.log("Component Will Unmount");
  }

  render() {
    const { name, location, avatar_url } = this.state.userInfo;
    const { count, count2 } = this.state;

    console.log(this.props.name + "Child Rendered");

    return (
      <div className="user-card">
        <h1>Count {count} </h1>
        <button
          onClick={() => {
            this.setState({
              count: this.state.count + 1,
            });
          }}
        >
          Increate Count
        </button>
        <img src={avatar_url}></img>
        <h2>Name: {name}</h2>
        <h3>Location: {location}</h3>
        <h4>Contact: akshaych2786@gmail.com</h4>
      </div>
    );
  }
}

export default UserClass;

/** ---- Mounting ------------------
 * Constructor (Dummy)
 * Render (Dummy)
 *    <HTML Dummy>
 *
 *  Component  Did Mount
 *      <API Call>
 *      <this.setState> -> State Variable is Updated
 *
 *
 *
 * ---- Update ------
 *    render(Api data)
 *    <HTML  (new API data)>
 *    Component Did Update
 *
 *
 *
 */
