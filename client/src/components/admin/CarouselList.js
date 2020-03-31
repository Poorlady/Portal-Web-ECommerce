import React, { useState } from "react";
import { Link } from "react-router-dom";
import CarouselItem from "./CarouselItem";
import axios from "axios";

function CarouselList() {
  const [images, setImages] = useState({});
  const [isAdding, setIsAdding] = useState(false);
  const [carouselList, setCarouselList] = useState(
    localStorage.getItem("images")
      ? JSON.parse(localStorage.getItem("images"))
      : []
  );

  const handleChange = e => {
    const { files } = e.target;
    setImages(files[0]);
  };

  const openForm = e => {
    setIsAdding(true);
  };

  const closeForm = e => {
    setIsAdding(false);
  };

  const saveLocal = data => {
    localStorage.setItem("images", JSON.stringify(data));
    setCarouselList(data);
  };
  const handleSubmit = async e => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("file", images);

    await axios
      .post("/api/admin/carousel", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })
      .then(result => {
        console.log(result);
        closeForm();
        saveLocal(result.data.result.carousel.images);
        setImages({});
      })
      .catch(err => console.log(err));
  };

  const handleClick = async name => {
    console.log("clicked");
    await axios
      .delete(`/api/admin/carousel/${name}`)
      .then(result => {
        console.log(result);
        saveLocal(result.data.carousel.images);
      })
      .catch(err => console.log(err));
  };

  console.log(carouselList);
  return (
    <>
      <div className="side--menu-head">
        <p>Shop Carousel Images</p>
      </div>
      <div className="category--form-list">
        <Link className="cat--add" onClick={() => openForm()}>
          Add Image
        </Link>
        <div className="category--list-grid">
          {carouselList.map((item, i) => (
            <CarouselItem item={item} key={i} handleClick={handleClick} />
          ))}
        </div>
      </div>

      {isAdding && (
        <div className="popup-wrapper">
          <div className="popup-inner etalase-inner">
            <button
              className="login-close etalase-close input-border"
              onClick={() => closeForm()}
            >
              X
            </button>
            <form onSubmit={handleSubmit} className="category--form">
              <div>
                <label>Add Category</label>
                <input
                  type="file"
                  name="category"
                  onChange={handleChange}
                  className="input-border"
                />
              </div>
              <button type="submit" className="add-etalase input-border">
                Add Image
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default CarouselList;
