import React, { useState, useEffect } from "react";

import ProductCard from "../components/ProductCard";
import { useParams } from "react-router-dom";

function ProductPage() {
  const [products, setProducts] = useState([]);

  const { param } = useParams();

  useEffect(() => {
    findProduct(param);
    window.scrollTo(0, 0);
  }, [param]);

  console.log(param);
  const findProduct = async s => {
    await fetch(`/api/products/filter/${s}`)
      .then(res => res.json())
      .then(products => setProducts(products));
  };

  const mappedProducts = products.map(product => (
    <ProductCard key={product.id} product={product} />
  ));

  console.log(products);
  return (
    <div className="productpage-wrapper">
      <div className="bannerproduct-wrapper input-border">
        <h1>Product Page</h1>
      </div>
      <div className="filterproduct-wrapper">
        <p>Shopping Options</p>
        <div className="price-option">
          <p>Price</p>
          <form className="filter-form">
            <label for="startPrice">Starting Price</label>
            <input
              className="input-border"
              type="number"
              name="startPrice"
              placeholder="Starting price"
            />
            <label for="startPrice">End Price</label>
            <input
              className="input-border"
              type="number"
              name="endPrice"
              placeholder="End Price"
            />
          </form>
        </div>
        <div className="colour-option">
          <p>Colour</p>
          <div>
            <button
              className="ml-0 input-border"
              style={{ backgroundColor: "red" }}
            ></button>
            <button
              className="input-border"
              style={{ backgroundColor: "blue" }}
            ></button>
            <button
              className="input-border"
              style={{ backgroundColor: "green" }}
            ></button>
            <button
              className="input-border"
              style={{ backgroundColor: "yellow" }}
            ></button>
          </div>
        </div>
        <div>
          <p>Rating</p>
          <form>
            <label>
              <input className="input-border" type="checkbox" />
              Di atas 4
            </label>
          </form>
        </div>
      </div>
      <div className="productgrid-wrapper">
        <div className="productsub-header">
          <p>{`All ${param} products`}</p>
          <hr />
        </div>
        <div className="productsub-wrapper">{mappedProducts}</div>
      </div>
    </div>
  );
}

export default ProductPage;
