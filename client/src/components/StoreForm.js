import React, { useState, useEffect } from "react";
import axios from "axios";

function StoreForm({ store, user, updateState }) {
  const URL = store ? "/api/store/updateStore" : "/api/store/addStore";
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImg] = useState("");

  useEffect(() => {
    if (store) {
      setName(store.name);
      setDesc(store.desc);
      setLocation(store.location);
    }
  }, [store]);

  const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "desc":
        setDesc(value);
        break;
      case "location":
        setLocation(value);
        break;
      default:
        break;
    }
  };

  const handleFile = e => {
    const { files } = e.target;
    setImg(files[0]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    store
      ? formData.append("storeId", store._id)
      : formData.append("userId", user._id);
    formData.append("file", image);
    formData.append("name", name);
    formData.append("desc", desc);
    formData.append("location", location);

    await axios
      .post(URL, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })
      .then(result => {
        updateState("store", result.data);
      })
      .catch(err => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit} className="store-form">
      <h4>Your Store's Information</h4>
      <hr />
      <div className="store-form-group">
        <label>Store Name</label>
        <input
          name="name"
          className="input-border"
          type="text"
          placeholder="Store Name"
          onChange={handleChange}
          value={name}
        />
      </div>
      <div className="store-form-group">
        <label>Store Description</label>
        <input
          name="desc"
          className="input-border"
          type="text"
          placeholder="Store Description"
          onChange={handleChange}
          value={desc}
        />
      </div>
      <div className="store-form-group">
        <label>Store Location</label>
        <textarea
          name="location"
          placeholder="add your store location"
          className="input-border"
          onChange={handleChange}
          value={location}
        />
      </div>
      <div>
        <label>Store Image</label>
        <input onChange={handleFile} name="img" type="file" />
      </div>
      {store && (
        <img
          id="store-form-img"
          src={`/uploads/stores/${store.img}`}
          alt={store.name}
        />
      )}
      <button
        type="submit"
        className="input-border submit-btn"
        onChange={handleChange}
      >
        Save Changes
      </button>
    </form>
  );
}

export default StoreForm;
