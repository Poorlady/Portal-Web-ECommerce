import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AddProductForm from "../components/AddProductForm";
import { useParams } from "react-router-dom";
import { authContext } from "../contexts/Auth";

function AddProduct({ method }) {
  const { id } = useParams();

  const [product, setProduct] = useState();
  const [store, setStore] = useState();
  const { user } = useContext(authContext);
  const productToPass = id ? product : null;

  useEffect(() => {
    getStore(user._id);
    if (id) {
      getProduct(id);
    }
  }, []);

  const getProduct = async id => {
    await fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(prod => setProduct(prod));
  };

  const getStore = async id => {
    await axios
      .post("/api/store/getStore", { userId: id })
      .then(result => setStore(result.data));
  };
  return (
    <div className="add-product-wrapper">
      <h4>Add Product</h4>
      <AddProductForm store={store} product={productToPass} method={method} />
    </div>
  );
}

export default AddProduct;
