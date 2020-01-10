import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.css";
import { Route } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";
import Navigation from "./components/Navigation";
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";
import PassportForm from "./components/PassportForm";
import Passport from "./components/Passport";
import Explore from "./components/Explore";

class App extends Component {

  state = {
    rememberMe: "",
    rememberEmail: "",
    rememberPassword: "",
    flipped: true
  };

  user_id = localStorage.getItem("user_id");

  componentDidMount() {
    // console.log("storage", localStorage);
    this.setState({
      rememberMe: this.localStorageGet("passportRemember") || false,
      rememberEmail: this.localStorageGet("passportEmail") || "",
      rememberPassword: this.localStorageGet("passportPassword") || ""
    });
  }

  
  localStorageGet = item =>
    // console.log("LSG", item)
    JSON.parse(localStorage.getItem(item));

  localStorageSet = (item, value) => {
    // console.log("localStorageSet", item, value);
    localStorage.setItem(item, JSON.stringify(value));
  };

  setFlipped = e => {
    this.setState({flipped: e})
  };

  render() {
    return (
      <div className="App">
        <Route path="/" 
        render={(props) => (
          <Navigation props={props} />
        )} />

        <Route exact path="/" render={(props) => (<LoginForm
            props={props}
            setLocalStorage={this.localStorageSet}
            getLocalStorage={this.localStorageGet}
            remember={this.state.rememberMe}
            email={this.state.rememberEmail}
            password={this.state.rememberPassword}
        />)} />

        <Route exact path="/signup" render={(props) => (<SignUpForm
            props={props}
            setLocalStorage={this.localStorageSet}
            getLocalStorage={this.localStorageGet}
        />)} />

        <Route exact path="/login" render={(props) => (<LoginForm
            props={props}
            setLocalStorage={this.localStorageSet}
            getLocalStorage={this.localStorageGet}
            remember={this.state.rememberMe}
            email={this.state.rememberEmail}
            password={this.state.rememberPassword}
        />)} />

        <Route path="/passport-form">
          <PassportForm />
        </Route>
        <PrivateRoute exact path="/passport" component={Passport} setFlipped={this.setFlipped} flipped={this.state.flipped} />
        <PrivateRoute exact path="/explore" component={Explore} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {

  }
};

export default connect(
  mapStateToProps,
    {
      
    }
)(App);