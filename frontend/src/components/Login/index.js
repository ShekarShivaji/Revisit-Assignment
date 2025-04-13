import "./index.css";
import { Component } from "react";
import {Link,Navigate } from "react-router-dom"
import Cookies from 'js-cookie'

class Login extends Component {
    state = {username: "" , password: ""} 

    submitForm = async e => {
        e.preventDefault();
        const { username, password } = this.state 
        if (username && password !== ""){
            const userDetails = {
                username , password
            }
            const response = await fetch("http://localhost:3001/login/", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(userDetails),
              });
            const data = await response.json()
            if (response.ok){
                 
                Cookies.set('jwt_token', data.jwtToken, {
                expires: 30,
                path: '/',
                })
                window.location.replace('/')
            }
        }else {
            alert("fill the input fields")
        }
    }

    onChangeUserName = (e) => {
        this.setState({ username: e.target.value });
      };
    
      onChangePassword = (e) => {
        this.setState({ password: e.target.value });
      };

    render() {
        const {username , password} = this.state
        const jwtToken = Cookies.get('jwt_token')
        if (jwtToken !== undefined) {
            return <Navigate to="/" />
        }
        return (
            <div className="login-bg">
                <form className="login-card" onSubmit={this.submitForm} >
                    <h1>Login</h1>
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
                    <button type="submit" className="loginBtn">Login</button>
                    <p className="signuptext">Don't have an account? 
                        <span>
                            <Link to="/signup">
                                <button className="signupButton">Sign Up</button>
                            </Link>
                        </span>
                    </p>
                </form>
            </div>
        )
    }
}

export default Login