import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { authContext } from "../contexts/Auth";

function LogIn({ closeLogin, role }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isForgetPassword, setIsForgetPassword] = useState(false);
  const URL = !isForgetPassword ? "/api/user/login" : "/api/user/reset";
  const { updateState } = useContext(authContext);
  let history = useHistory();

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
      .post(URL, { email: email, password: password, role: role })
      .then(result => {
        if (result.status === 200) {
          console.log(result.data);
          if (!isForgetPassword) {
            updateState("user", result.data.data);
            if (result.data.data.role === "admin") {
              history.push("/admin/dashboard");
            }
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
                <Link className="forget-password" onClick={handleClick}>
                  Forget Password
                </Link>
                <button className=" submit-btn input-border" type="submit">
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
                <button className="submit-btn input-border" type="submit">
                  Submit
                </button>
              </form>
            </div>
          </>
        )}
        {role !== "admin" && (
          <button
            className=" del-btn etalase-close login-close"
            onClick={() => closeLogin()}
          >
            X
          </button>
        )}
      </div>
    </div>
  );
}

export default LogIn;
