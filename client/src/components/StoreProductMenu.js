import React, { useState, useEffect } from "react";
import StoreProductList from "../components/StoreProductList";

import axios from "axios";

function StoreProductMenu({ id }) {
  const [isDelClicked, setIsDelClicked] = useState(false);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts(id);
  }, []);

  console.log(products);
  const fetchProducts = async id => {
    await axios
      .get(`/api/products/filter/${id}`)
      .then(products => setProducts(products.data))
      .catch(err => console.log(err));
  };

  const handleChange = e => {
    const { value } = e.target;

    setSearch(value);
  };

  const delClicked = () => {
    setIsDelClicked(true);
  };

  const delClose = () => {
    setIsDelClicked(false);
  };

  const productFilter = products
    .filter(product => product.name.toLowerCase().includes(search))
    .map(product => (
      <StoreProductList
        key={product._id}
        product={product}
        delClicked={delClicked}
      />
    ));

  return (
    <div className="store-productmenu-wrapper">
      <h4>Your Store Products</h4>
      <form>
        <input
          type="text"
          placeholder="Search Product"
          className="input-border store-productmenu-search"
          name="search"
          onChange={handleChange}
        />
      </form>
      <hr />
      {productFilter}
      {isDelClicked && (
        <div className="popup-wrapper">
          <div className="popup-inner">
            <div className="store-product-del">
              <p>Are you sure?</p>
              <button className="ml-0 del-btn input-border">Delete</button>
              <button className=" input-border" onClick={delClose}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StoreProductMenu;
