import React, { useState, useEffect } from "react";
import StoreProductList from "../components/StoreProductList";

import axios from "axios";

function StoreProductMenu({ id }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts(id);
  }, [id]);

  const fetchProducts = async id => {
    await axios
      .get(`/api/products/store/${id}`)
      .then(products => setProducts(products.data))
      .catch(err => console.log(err));
  };

  const deleteProduct = async id => {
    await axios
      .delete(`/api/products/${id}`)
      .then(result =>
        setProducts(prevState =>
          prevState.filter(item => item.name !== result.data.name)
        )
      )
      .catch(err => console.log(err));
  };

  const handleChange = e => {
    const { value } = e.target;
    setSearch(value);
  };

  const productFilter = products
    .filter(product => product.name.toLowerCase().includes(search))
    .map(product => (
      <StoreProductList
        key={product._id}
        product={product}
        deleteProduct={deleteProduct}
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
    </div>
  );
}

export default StoreProductMenu;
