import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(products => setProducts(products));
  }, []);

  const productsMapped = products.map(item => <ProductCard product={item} />);
  return <div className="product-list">{productsMapped}</div>;
}

export default ProductList;
