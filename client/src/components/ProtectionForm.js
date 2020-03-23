import React, { useState, useContext } from "react";

import { authContext } from "../contexts/Auth";

import axios from "axios";

function ProtectionForm() {
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const { user } = useContext(authContext);
  const URL = "/api/user/update-password/";

  const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case "password":
        setPassword(value);
        break;
      case "re-password":
        setRePassword(value);
        break;
      default:
        break;
    }
  };

  const validePassword = (password, rePassword) => {
    if (password === rePassword) {
      return true;
    }
    return false;
  };
  const handleSubmit = async e => {
    e.preventDefault();
    if (validePassword(password, rePassword)) {
      await axios
        .post(URL, { _id: user._id, password: password })
        .then(result => console.log(result))
        .catch(err => console.log(err));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="protection-form">
      <p>Change Your Password</p>
      <div className="protection-group">
        <label>New Password</label>
        <input
          name="password"
          className="input-border"
          type="password"
          placeholder="type new password"
          onChange={handleChange}
          value={password}
        />
      </div>
      <div className="protection-group">
        <label>Re-type New Password</label>
        <input
          name="re-password"
          className="input-border"
          type="password"
          placeholder="re-type new password"
          onChange={handleChange}
          value={rePassword}
        />
      </div>
      <div className="protection-group">
        <button className="input-border submit-btn">Change Password</button>
      </div>
    </form>
  );
}

export default ProtectionForm;
