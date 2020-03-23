import React, { useState, useContext } from "react";

import axios from "axios";

import { authContext } from "../contexts/Auth";

function LogIn({ closeLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const URL = "/api/user/login";

  const { updateState } = useContext(authContext);

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === "email") {
      return setEmail(value);
    }
    if (name === "password") {
      return setPassword(value);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (password < 8) {
      return alert("password must be 8 characters");
    }

    await axios
      .post(URL, { email: email, password: password })
      .then(result => {
        if (result.status === 200) {
          console.log(result.data);
          updateState("user", result.data.data);
          closeLogin();
        } else {
          alert("Email or Password is wrong!!");
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="popup-wrapper">
      <div className="popup-inner">
        <h2>Masuk</h2>
        <hr />
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <label for="email">Email</label>
            <input
              className="input-border"
              type="email"
              name="email"
              placeholder="Type your email here..."
              onChange={handleChange}
              value={email}
            />
            <label for="password">Password</label>
            <input
              className="input-border"
              type="password"
              name="password"
              placeholder="Type your password here"
              onChange={handleChange}
              value={password}
            />
            <button className="input-border" type="submit">
              Log In
            </button>
          </form>
        </div>
        <button className="login-close" onClick={() => closeLogin()}>
          Close
        </button>
      </div>
    </div>
  );
}

export default LogIn;
