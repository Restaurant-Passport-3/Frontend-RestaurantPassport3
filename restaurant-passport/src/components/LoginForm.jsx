import React from "react";
import { connect } from 'react-redux';
import { login } from '../actions/actions';

import { withFormik, Form, Field } from "formik";
import * as yup from "yup";

function Login({ errors, touched, values, loggingIn }) {

  return (
    <Form>
      {/* <label name="email" className="login-label-email">
        {" "}
        {touched.email && errors.email && (
          <p className="error">{errors.email}</p>
        )}
        Email : */}
      <Field
        className="login-field-email field"
        name="email"
        placeholder="Email"
        type="email"
        value={values.email || ""}
      />
      {/* </label> */}
      {/* <label name="password" className="login-label-password"> */}
      {touched.password && errors.password && (
        <p className="error">{errors.password}</p>
      )}
      {/* Password: */}
      <Field
        className="login-field-password field"
        name="password"
        placeholder="Password"
        type="password"
        value={values.password || ""}
      />
      {/* </label> */}
      <label name="remember" className="login-label-remember">
        Remember:
        <Field
          className="login-field-remember field"
          name="remember"
          type="checkbox"
          placeholder="false"
        />
      </label>
      <label name="submitButton" className="login-label-btn">
        <button
          name="submitBtn"
          type="submit"
          disabled={loggingIn}
          className="login-submitBtn"
        >
          {!loggingIn ? "Log In" : "Logging In"}
        </button>
      </label>
    </Form>
  );
}

const FormikLog = withFormik({
  mapPropsToValues({
    remember,
    email,
    password,
    setLocalStorage,
    getLocalStorage,
    loggingIn
    // credentials
  }) {
    return {
      remember: remember || false,
      email: email,
      password: password,
      setStorage: setLocalStorage,
      getStorage: getLocalStorage,
      loggingIn: loggingIn
      // credentials: credentials
    };
  },

  validationSchema: yup.object().shape({
    email: yup
      .string()
      .min(6)
      .email("Invalid Email")
      .required("Email required"),
    password: yup
      .string()
      .min(6, "Password is at least 6 characters")
      .required("Password Required"),
    remember: yup.boolean().required()
  }),
  handleSubmit(values, { props }) {

    // Creating payload for login using axiosWithAuth
    const credentials = {
      username: values.email,
      password: values.password
    };

    if (
      values.remember === true &&
      (!localStorage.passportRemember ||
        values.getStorage("passportRemember") === false)
    ) {
      values.setStorage("passportRemember", true);
      values.setStorage("passportEmail", values.email);
      values.setStorage("passportPassword", values.password);
      // console.log("Set initial storage", localStorage);
    } else if (
      values.remember === true &&
      (values.getStorage("passportEmail") !== values.email ||
        values.getStorage("passportPassword") !== values.password)
    ) {
      // console.log("changed Storage");
      values.setStorage("passportRemember", true);
      values.setStorage("passportEmail", values.email);
      values.setStorage("passportPassword", values.password);
    } else if (values.remember === false) {
      // console.log("Remove Storage");
      values.setStorage("passportRemember", false);
      values.setStorage("passportEmail", "");
      values.setStorage("passportPassword", "");
    }

    // Login using redux
    props.login(credentials).then(() => {
      props.props.history.push("/passport")
    });
  }
})(Login);

const mapStateToProps = state => {
  // console.log('state from redux', state)
  return {
    loggingIn: state.loggingIn
  }
};

const FormikLogin = connect(
  mapStateToProps, 
  {    
    login
  }
)(FormikLog);

export default FormikLogin;
