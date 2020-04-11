import React, { useContext, useEffect, useState } from "react";

import { authContext } from "../contexts/Auth";
import { useHistory } from "react-router-dom";

import axios from "axios";

function ProfileForm() {
  const { user, updateState } = useContext(authContext);
  const [img, setImg] = useState({});
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState();
  const [phone, setPhone] = useState("");
  const bDate = user.bDate.split("T")[0];
  const URL = "/api/user/update/";
  let history = useHistory();

  useEffect(() => {
    setAddress(user.address);
    setCity(user.city);
    setZip(user.zip);
    setPhone(user.phone);
  }, [user]);

  const handleFile = (e) => {
    const { files } = e.target;
    setImg(files[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "address":
        setAddress(value);
        break;
      case "city":
        setCity(value);
        break;
      case "zip":
        setZip(value);
        break;
      case "phone":
        setPhone(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("_id", user._id);
    formData.append("file", img);
    formData.append("address", address);
    formData.append("city", city);
    formData.append("zip", zip);
    formData.append("phone", phone);

    await axios
      .put(URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((result) => {
        updateState("user", result.data);
        history.push("/profile/menu");
      })
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-photo">
        {user.img && <img src={`/uploads/users/${user.img}`} alt={user.name} />}
        <input type="file" name="userImg" onChange={handleFile} />
        <div className="user-prev">
          <p className="user-prev-name">
            Name : {`${user.fName} ${user.lName}`}
          </p>
          <p>Address : {address ? user.address : "-"}</p>
        </div>
      </div>
      <div className="form-group">
        <label>First Name</label>
        <input
          className="input-border ml-0"
          type="text"
          placeholder="First Name"
          value={user.fName}
          disabled
        />
      </div>
      <div className="form-group">
        <label>Last Name</label>
        <input
          className="input-border"
          type="text"
          placeholder="Last Name"
          value={user.lName}
          disabled
        />
      </div>
      <div className="form-group">
        <label>Phone</label>
        <input
          className="input-border ml-0"
          type="text"
          placeholder="Phone Number"
          value={phone}
          name="phone"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Birth Day</label>
        <input
          className="input-border ml-0"
          type="date"
          placeholder="Birth Day"
          value={bDate}
          disabled
        />
      </div>
      <label>Address</label>
      <textarea
        name="address"
        className="input-border w-100"
        placeholder="Your Address"
        value={address}
        onChange={handleChange}
      />
      <div className="form-group">
        <label>City</label>
        <input
          name="city"
          className="input-border ml-0"
          type="text"
          placeholder="City"
          value={city}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Zip Code</label>
        <input
          name="zip"
          className="input-border"
          type="text"
          placeholder="Zip Code"
          value={zip}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <button className="input-border submit-btn">Save Changes</button>
      </div>
    </form>
  );
}

export default ProfileForm;
