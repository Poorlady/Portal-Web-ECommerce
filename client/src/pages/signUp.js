import React, { useState, useEffect, useContext } from "react";

import axios from "axios";

import { authContext } from "../contexts/Auth";
import { useHistory } from "react-router-dom";

const stringFormarter = require("../helpers/stringFormarter");

function SignUp({ closeLogin }) {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [bDate, setBDate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const URL = "/api/user/signup";
  const { updateState } = useContext(authContext);

  let history = useHistory();

  const handleChange = e => {
    const { name, value } = e.target;

    switch (name) {
      case "fName":
        if (stringFormarter.textOnly(value)) {
          setFName(value);
        }
        break;
      case "lName":
        if (stringFormarter.textOnly(value)) {
          setLName(value);
        }
        break;
      case "bDate":
        setBDate(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "rePassword":
        setRePassword(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    closeLogin();
  }, []);

  const passCheck = (pass, rePass) => {
    console.log(pass.length);
    if (password.length >= 8) {
      if (pass === rePass) {
        return true;
      } else {
        alert("Passwords didn't match, Please insert the correct password!!");
        return false;
      }
    } else {
      alert("Minimum password length is 8 character");
      return false;
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (passCheck(password, rePassword)) {
      await axios
        .post(URL, {
          fName: fName,
          lName: lName,
          bDate: bDate,
          email: email,
          password: password
        })
        .then(result => {
          console.log(result);
          if (result.status === 201) {
            updateState("user", result.data.data);
            history.push("/");
          } else {
            alert("Email already taken! please use another email");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  return (
    <div className="signup-wrapper">
      <h2>Create New Account</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div>
          <p>Personal Information</p>
          <input
            className="input-border"
            type="text"
            name="fName"
            placeholder="First Name"
            onChange={handleChange}
            value={fName}
          />
          <input
            className="input-border"
            type="text"
            name="lName"
            placeholder="Last Name"
            onChange={handleChange}
            value={lName}
          />
          <input
            className="input-border"
            type="date"
            name="bDate"
            placeholder="Birth Day"
            onChange={handleChange}
            value={bDate}
          />
        </div>
        <div>
          <p>Sign In Information</p>
          <input
            className="input-border"
            type="email"
            name="email"
            placeholder="Add your Email"
            onChange={handleChange}
            value={email}
          />
          <input
            className="input-border"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={password}
          />
          <input
            className="input-border"
            type="password"
            name="rePassword"
            placeholder="Re-type Password"
            onChange={handleChange}
            value={rePassword}
          />
        </div>
        <button type="submit" className=" submit-btn input-border">
          Submit
        </button>
      </form>
    </div>
  );
}

export default SignUp;
