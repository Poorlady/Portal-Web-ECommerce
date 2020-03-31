import React, { useState } from "react";
import { Link } from "react-router-dom";
import CategoryItem from "./CategoryItem";
import axios from "axios";

function CategoryForm() {
  const [isAdding, setIsAdding] = useState(false);
  const [category, setCategory] = useState("");
  const [categoryList, setCategoryList] = useState(
    localStorage.getItem("category") &&
      JSON.parse(localStorage.getItem("category"))
  );

  const handleChange = e => {
    const { value } = e.target;
    setCategory(value);
  };

  const openForm = e => {
    setIsAdding(true);
  };

  const closeForm = e => {
    setIsAdding(false);
  };

  const saveLocal = data => {
    localStorage.setItem("category", JSON.stringify(data));
    setCategoryList(data);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    await axios
      .post("/api/admin/category", { category: category })
      .then(result => {
        console.log(result);
        closeForm();
        saveLocal(result.data.result.category.items);
        setCategory("");
      })
      .catch(err => console.log(err));
  };

  const handleClick = async name => {
    await axios
      .delete(`/api/admin/category/${name}`)
      .then(result => {
        console.log(result);
        saveLocal(result.data.category.items);
      })
      .catch(err => console.log(err));
  };

  const mappedCategories =
    categoryList &&
    categoryList.map((item, i) => {
      return (
        <CategoryItem item={item} i={i} key={i} handleClick={handleClick} />
      );
    });

  console.log(categoryList);
  return (
    <>
      <div className="side--menu-head">
        <p>Shop Categories List</p>
      </div>
      <div className="category--form-list">
        <thead>
          <tr>
            <th>No.</th>
            <th>Category Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{mappedCategories}</tbody>
        <Link className="cat--add" onClick={() => openForm()}>
          Add Category
        </Link>
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
                  name="category"
                  onChange={handleChange}
                  className="input-border"
                  value={category}
                />
              </div>
              <button type="submit" className="add-etalase input-border">
                Add Category
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default CategoryForm;
