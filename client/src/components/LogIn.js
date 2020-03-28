import React, { useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { authContext } from "../contexts/Auth";

function LogIn({ closeLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isForgetPassword, setIsForgetPassword] = useState(false);
  const URL = !isForgetPassword ? "/api/user/login" : "/api/user/reset";

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

  const handleClick = () => {
    setIsForgetPassword(true);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!isForgetPassword) {
      if (password < 8) {
        return alert("password must be 8 characters");
      }
    }

    await axios
      .post(URL, { email: email, password: password })
      .then(result => {
        if (result.status === 200) {
          console.log(result.data);
          if (!isForgetPassword) {
            updateState("user", result.data.data);
          } else {
            setIsForgetPassword(false);
          }
          closeLogin();
        } else {
          console.log(result);
          alert(result.data.mssg);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="popup-wrapper">
      <div className="popup-inner">
        {!isForgetPassword ? (
          <>
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
                <Link onClick={handleClick}>Forget Password</Link>
                <button className="input-border" type="submit">
                  Log In
                </button>
              </form>
            </div>
          </>
        ) : (
          <>
            <h2>Forget Password</h2>
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
                <button className="input-border" type="submit">
                  Submit
                </button>
              </form>
            </div>
          </>
        )}
        <button className="login-close" onClick={() => closeLogin()}>
          Close
        </button>
      </div>
    </div>
  );
}

export default LogIn;
