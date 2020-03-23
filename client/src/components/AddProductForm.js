import React, { useState, useEffect } from "react";

import axios from "axios";
import { useHistory } from "react-router-dom";

function AddProductForm({ store, product }) {
  const URL = product ? `/api/edit-product/${product._id}` : "/api/product";
  const [name, setName] = useState("");
  const [img, setImg] = useState();
  const [secondImg, setSecondImg] = useState();
  const [thirdImg, setThirdImg] = useState();
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [etalase, setEtalase] = useState("");
  const [condition, setCondition] = useState("");
  const [colour, setColour] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState();
  const [weight, setWeight] = useState();
  const [etalaseList, setEtalaseList] = useState(store ? store.etalase : []);
  const [isLoading, setIsLoading] = useState();

  let history = useHistory();

  const check = product => {
    setIsLoading(true);
    if (product) {
      console.log(product.mainImg);
      setName(product.name);
      setImg(product.mainImg);
      setSecondImg(product.secondImg);
      setThirdImg(product.thirdImg);
      setDesc(product.desc);
      setCategory(product.category);
      setEtalase(product.etalase);
      setCondition(product.condition);
      setSize(product.size);
      setColour(product.colour);
      setPrice(product.price);
      setWeight(product.weight);
      setIsLoading(false);
      return true;
    } else {
      setIsLoading(false);
      return false;
    }
  };

  useEffect(() => {
    check(product);
  }, [store, product]);

  const handleFile = e => {
    const { name, files } = e.target;
    switch (name) {
      case "mainImg":
        setImg(files[0]);
        break;
      case "secondImg":
        setSecondImg(files[0]);
        break;
      case "thirdImg":
        setThirdImg(files[0]);
        break;
      default:
        break;
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    if (value === "Select Etalase") {
      setEtalase("-");
    }
    switch (name) {
      case "name":
        setName(value);
        break;
      case "desc":
        setDesc(value);
        break;
      case "category":
        setCategory(value);
        break;
      case "size":
        setSize(value);
        break;
      case "colour":
        setColour(value);
        break;
      case "price":
        setPrice(value);
        break;
      case "etalase":
        setEtalase(value);
        break;
      case "condition":
        setCondition(value);
        break;
      case "weight":
        setWeight(value);
        break;
      default:
        break;
    }
  };
  const handleSubmit = async event => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("mainFile", img ? img : product ? product.mainImg : null);
    formData.append(
      "secondFile",
      secondImg ? secondImg : product ? product.secondImg : null
    );
    formData.append(
      "thirdFile",
      thirdImg ? thirdImg : product ? product.thirdImg : null
    );
    formData.append("name", name);
    formData.append("desc", desc);
    formData.append("category", category);
    formData.append("etalase", etalase);
    formData.append("condition", condition);
    formData.append("price", price);
    formData.append("size", size);
    formData.append("colour", colour);
    formData.append("weight", weight);
    formData.append("storeName", store.name);
    formData.append("storeId", store._id);

    await axios
      .post(URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => history.push("/profile"))
      .catch(err => console.log(err));
  };

  console.log(product);

  return isLoading ? (
    <p>Loading data....</p>
  ) : (
    <form onSubmit={handleSubmit}>
      <div className="add-form-group">
        {product && (
          <img
            className="add-form-uploaded"
            src={`/uploads/products/${product.mainImg}`}
            alt={`${product.name} one`}
          />
        )}
        <label>Add Main Picture</label>
        <input type="file" name="mainImg" onChange={handleFile} />
      </div>
      <div className="add-form-group">
        {product && (
          <img
            className="add-form-uploaded"
            src={`/uploads/products/${product.secondImg}`}
            alt={`${product.name} two`}
          />
        )}
        <label>Add Picture</label>
        <input type="file" name="secondImg" onChange={handleFile} />
      </div>
      <div className="add-form-group">
        {product && (
          <img
            className="add-form-uploaded"
            src={`/uploads/products/${product.thirdImg}`}
            alt={`${product.name} three`}
          />
        )}
        <label>Add Picture</label>
        <input type="file" name="thirdImg" onChange={handleFile} />
      </div>
      <div>
        <h4>Informasi Produk</h4>
        <hr />
        <div className="add-form-group">
          <label>Nama Produk :</label>
          <input
            name="name"
            className="add-form-input input-border"
            type="text"
            placeholder="Product's Title"
            value={name}
            onChange={handleChange}
          />
        </div>
        <div className="add-form-group">
          <label>Kategori Produk :</label>
          <input
            name="category"
            className="add-form-input input-border"
            type="text"
            placeholder="Product's Category"
            value={category}
            onChange={handleChange}
          />
        </div>
        <div className="add-form-group">
          <label>Etalase Produk :</label>
          <select
            name="etalase"
            className="add-form-input input-border"
            type="text"
            placeholder="Product's Etalase"
            value={etalase}
            onChange={handleChange}
          >
            <option selected defaultChecked>
              Select Etalase
            </option>
            {etalaseList.length > 1 ? (
              etalaseList.map(item => (
                <option selected={item === etalase} value={item}>
                  {item}
                </option>
              ))
            ) : (
              <option>-</option>
            )}
          </select>
        </div>
        <h4>Deskripsi Produk</h4>
        <hr />
        <div className="add-form-group">
          <label>Deskripsi Produk</label>
          <textarea
            name="desc"
            className="input-border"
            placeholder="Product's Description"
            value={desc}
            onChange={handleChange}
          />
        </div>
        <div className="add-form-group">
          <p>Kondisi Produk</p>
          <label>
            <input
              className="input-border"
              name="condition"
              type="radio"
              value="baru"
              checked={condition === "baru"}
              onChange={handleChange}
            />
            Baru
          </label>
          <label>
            <input
              className="input-border"
              name="condition"
              type="radio"
              value="bekas"
              checked={condition === "bekas"}
              onChange={handleChange}
            />
            Bekas
          </label>
        </div>
        <div className="add-form-group">
          <label>Berat Produk :</label>
          <input
            name="weight"
            className="add-form-input input-border"
            type="number"
            placeholder="Product's Weight"
            value={weight}
            onChange={handleChange}
          />
        </div>
        <h4>Opsi Produk</h4>
        <hr />
        <div className="add-form-group">
          <label>Ukuran Tersedia</label>
          <input
            name="size"
            className="add-form-input input-border"
            type="text"
            placeholder="Product's Size Avalaible (S,M,L) / (39,40,41)"
            value={size}
            onChange={handleChange}
          />
        </div>
        <div className="add-form-group">
          <label>Warna Tersedia</label>
          <input
            name="colour"
            className="add-form-input input-border"
            type="text"
            placeholder="Product's Colour Avalaible (Red,Green,Blue)"
            value={colour}
            onChange={handleChange}
          />
        </div>
        <div className="add-form-group">
          <label>Harga Produk</label>
          <input
            name="price"
            className="add-form-input input-border"
            type="number"
            placeholder="Product's Price"
            value={price}
            onChange={handleChange}
          />
        </div>
        <div className="add-form-group">
          <button type="submit" className="input-border">
            Simpan Produk
          </button>
        </div>
      </div>
    </form>
  );
}

export default AddProductForm;
