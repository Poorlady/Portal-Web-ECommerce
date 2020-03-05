import React, { useState } from "react";

import ProductCard from "../components/ProductCard";
import StorePageHeader from "../components/StorePageHeader";
import PowerStore from "../components/PowerStore";

function StorePage() {
  const [products, setProducts] = useState([
    "https://via.placeholder.com/200x150?text=first",
    "https://via.placeholder.com/200x150?text=second",
    "https://via.placeholder.com/200x150?text=third",
    "https://via.placeholder.com/200x150?text=fourth",
    "https://via.placeholder.com/200x150?text=fifth",
    "https://via.placeholder.com/200x150?text=sixth",
    "https://via.placeholder.com/200x150?text=seventh",
    "https://via.placeholder.com/200x150?text=eighth",
    "https://via.placeholder.com/200x150?text=ninth",
    "https://via.placeholder.com/200x150?text=tenth",
    "https://via.placeholder.com/200x150?text=first",
    "https://via.placeholder.com/200x150?text=second",
    "https://via.placeholder.com/200x150?text=third",
    "https://via.placeholder.com/200x150?text=fourth",
    "https://via.placeholder.com/200x150?text=fifth",
    "https://via.placeholder.com/200x150?text=sixth",
    "https://via.placeholder.com/200x150?text=seventh",
    "https://via.placeholder.com/200x150?text=eighth",
    "https://via.placeholder.com/200x150?text=ninth",
    "https://via.placeholder.com/200x150?text=tenth"
  ]);
  const [isPowerStore, setIsPowerStore] = useState(false);
  const productsMapped = products.map(item => <ProductCard product={item} />);

  return (
    <div className="store-page-wrapper">
      <StorePageHeader />
      {isPowerStore && <PowerStore />}
      <div className="store-page-product">
        <div className="store-page-etalase input-border">
          <h4>Store's Etalase</h4>
          <p>All Etalase</p>
          <p>Etalase 1</p>
          <p>Etalase 2</p>
        </div>
        <div className="span-col-3">
          <div className="store-page-filter">
            <h4 className="span-col-2">Store's Product</h4>
            <input className="input-border" placeholder="search product" />
            <select className="input-border" name="cars">
              <option value="lowest price">lowest price</option>
              <option value="highest price">highest price</option>
              <option value="latest add">latest add</option>
              <option value="oldest add">oldest add</option>
            </select>
          </div>
          <hr />
          <div className="product-list">{productsMapped}</div>
        </div>
      </div>
    </div>
  );
}

export default StorePage;
