import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { deleteToken } from "../actions/actions";

function Navigation1(props) {

  const deleteTokenNow = (e) => {
    props.deleteToken(e);
    props.props.history.push("/login");
  };

  return (
    <div className="nav-container">
      <i className="fas fa-utensils nav-icon" />
      {props.loggedIn ? <NavLink to="/passport-form">Entry</NavLink> : null}
      {props.loggedIn ? <NavLink to="/passport">Passport</NavLink> : null}
      {props.loggedIn ? <NavLink to="/explore">Explore</NavLink> : null}
      <a target="_blank" rel="noopener noreferrer" href="https://elastic-galileo-429c23.netlify.com/about.html" >About Us</a>
      {!props.loggedIn ? <NavLink to="/signup">SignUp</NavLink> : null}
      {!props.loggedIn ? <NavLink to="/login">Login</NavLink> : null}
      {props.loggedIn ? <button onClick={(e) => deleteTokenNow(e)}>Log out</button> : null}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn
  }
}

const Navigation = connect(
  mapStateToProps,
  {
    deleteToken
  }
)(Navigation1)

export default Navigation;
