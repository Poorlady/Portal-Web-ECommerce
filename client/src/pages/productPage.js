import React, { useState, useEffect } from "react";

import ProductCard from "../components/ProductCard";
import { useParams } from "react-router-dom";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [priceFilter, setPriceFilter] = useState();
  const [endPrice, setEndPrice] = useState();
  const [color, setColor] = useState([]);

  const { param } = useParams();

  const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case "startPrice":
        setPriceFilter(value);
        break;
      case "endPrice":
        setEndPrice(value);
        break;
      default:
        break;
    }
  };
  console.log(color);
  const handleClick = e => {
    const { value } = e.target;
    if (!color.some(item => item === String(value))) {
      setColor(prevState => [...prevState, String(value)]);
    } else {
      setColor(color.filter(item => item !== String(value)));
    }
  };

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

  const colorSet = new Set(color);

  const mappedProducts = products
    .filter(item =>
      priceFilter
        ? parseInt(priceFilter) < parseInt(endPrice)
          ? item.price >= priceFilter && item.price <= endPrice
          : item.price >= priceFilter
        : item
    )
    .filter(item =>
      item.colour.some(colour =>
        color.length > 0 ? colorSet.has(colour) : colour
      )
    )
    .map(product => <ProductCard key={product.id} product={product} />);

  return (
    <div className="productpage-wrapper">
      <div className="bannerproduct-wrapper input-border">
        <h1>{param ? `All ${param} Products` : "Product Page"}</h1>
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
              value={priceFilter}
              onChange={handleChange}
            />
            <label for="startPrice">End Price</label>
            <input
              className="input-border"
              type="number"
              name="endPrice"
              placeholder="End Price"
              value={endPrice}
              onChange={handleChange}
            />
          </form>
        </div>
        <div className="colour-option">
          <p>Colour</p>
          <div>
            <button
              className="ml-0 input-border"
              style={{ backgroundColor: "red" }}
              value="Merah"
              onClick={handleClick}
            ></button>
            <button
              className="input-border"
              style={{ backgroundColor: "blue" }}
              value="Biru"
              onClick={handleClick}
            ></button>
            <button
              className="input-border"
              style={{ backgroundColor: "green" }}
              value="Hijau"
              onClick={handleClick}
            ></button>
            <button
              className="input-border"
              style={{ backgroundColor: "yellow" }}
              value="Kuning"
              onClick={handleClick}
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

// console.log(products);
// console.log(priceFilter);
// console.log(endPrice);

// console.log(parseInt(priceFilter) < parseInt(endPrice));
// console.log(products);
