import React, { useState, useEffect } from "react";

import axios from "axios";

import ProductCard from "../components/ProductCard";
import StorePageHeader from "../components/StorePageHeader";
import PowerStore from "../components/PowerStore";
import { useParams, Link } from "react-router-dom";

function StorePage() {
  const { name } = useParams();
  const [products, setProducts] = useState([]);
  const [store, setStore] = useState();
  const [isPowerStore, setIsPowerStore] = useState(false);
  const [etalase, setEtalase] = useState();

  const fetchStore = async name => {
    await axios
      .get(`/api/store/${name}`)
      .then(result => {
        setStore(result.data);
        fetchProducts(result.data._id);
      })
      .catch(err => console.log(err));
  };

  const fetchProducts = async id => {
    await axios
      .get(`/api/products/filter/${id}`)
      .then(result => {
        setProducts(result.data);
      })
      .then(err => console.log(err));
  };

  const handleClick = e => {
    if (e.target.text === "All Etalase") {
      return setEtalase("");
    }
    setEtalase(e.target.text);
  };
  console.log(products);
  console.log(etalase);
  useEffect(() => {
    fetchStore(name);
  }, []);

  const etalaseMapped =
    store &&
    store.etalase.map(item => (
      <li>
        <Link onClick={handleClick} key={item}>
          {item}
        </Link>
      </li>
    ));

  const productsMapped =
    products &&
    products
      .filter(item =>
        etalase ? item.etalase.toLowerCase() === etalase.toLowerCase() : item
      )
      .map(item => <ProductCard key={item._id} product={item} />);

  return store ? (
    <div className="store-page-wrapper">
      <StorePageHeader store={store} />
      {isPowerStore && <PowerStore />}
      <div className="store-page-product">
        <div className="store-page-etalase input-border">
          <h4>Store's Etalase</h4>
          <ul>
            <li>
              <Link onClick={handleClick}>All Etalase</Link>
            </li>
            {etalaseMapped}
          </ul>
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
  ) : (
    <p>Loading....</p>
  );
}

export default StorePage;
