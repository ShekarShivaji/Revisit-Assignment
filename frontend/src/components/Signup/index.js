import "./index.css";
import { Component } from "react";

class Signup extends Component {
  state = {
    name: "",
    username: "",
    password: "",
    gender: "",
    location: "",
    errorMessage: "", // Store error message here
  };

  onSubmitForm = async (e) => {
    e.preventDefault();
    const { name, username, password, gender, location } = this.state;
    const newUser = { name, username, password, gender, location };

    if (name || username || password || gender || location !== ""){
      try {
        const response = await fetch("http://localhost:3001/signup/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        });
  
        if (response.ok) {
          const result = await response.text();
          alert(result);
          window.location.replace("/login")
        } else {
          const errorText = await response.text();
          this.setState({ errorMessage: errorText }); // Set the error message in state
          alert(`Error: ${errorText}`);
        }
      } catch (error) {
        console.error("Error during form submission:", error.message);
        this.setState({ errorMessage: "Something went wrong, please try again." }); // Set generic error message
        alert("Something went wrong, please try again.");
      }
    }else {
      alert("Fill all the inputs")
    }

    
  };

  onChangeName = (e) => {
    this.setState({ name: e.target.value });
  };

  onChangeUserName = (e) => {
    this.setState({ username: e.target.value });
  };

  onChangePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  onChangeGender = (e) => {
    this.setState({ gender: e.target.value });
  };

  onChangeLocation = (e) => {
    this.setState({ location: e.target.value });
  };

  render() {
    const { name, username, password, gender, location, errorMessage } = this.state;
    return (
      <div className="loginRoute-bg">
        
        <form className="card" onSubmit={this.onSubmitForm}>
        <h1>Sign Up</h1>
          <lable htmlFor="Name">Name</lable>
          <input
            id="Name"
            className="inputs"
            type="text"
            value={name}
            placeholder="Enter your name"
            onChange={this.onChangeName}
          />
          <lable htmlFor="UserName">UserName</lable>
          <input
            id="UserName"
            className="inputs"
            type="text"
            value={username}
            placeholder="Enter your userName"
            onChange={this.onChangeUserName}
          />
          <lable htmlFor="Password">Password</lable>
          <input
            id="Password"
            className="inputs"
            type="password"
            value={password}
            placeholder="Enter your password"
            onChange={this.onChangePassword}
          />
          <lable htmlFor="Gender">Gender</lable>
          <input
            id="Gender"
            className="inputs"
            type="text"
            value={gender}
            placeholder="Enter your Gender"
            onChange={this.onChangeGender}
          />
          <lable htmlFor="Location">Location</lable>
          <input
            id="Location"
            className="inputs"
            type="text"
            value={location}
            placeholder="Enter your location"
            onChange={this.onChangeLocation}
          />
          <button className="signUpBtn" type="submit">Sign Up</button>
          {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Display error message */}
        </form>
      </div>
    );
  }
}

export default Signup;
