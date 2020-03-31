import React, { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import CategoryDiscList from "../components/ProductDiscList";
import OffStoreList from "../components/OffStoreList";
import ProductList from "../components/ProductList";
import axios from "axios";

function LandingApp() {
  const [images, setImages] = useState([]);
  const [storeList, setStoreList] = useState([]);

  const fetchData = async () => {
    await axios
      .get("/api/store/random")
      .then(result => setStoreList(result.data))
      .catch(err => console.log(err));

    await axios
      .get("/api/admin")
      .then(result => {
        localStorage.setItem(
          "category",
          JSON.stringify(result.data.category.items)
        );
        localStorage.setItem(
          "images",
          JSON.stringify(result.data.carousel.images)
        );
        setImages(result.data.carousel.images);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchData();
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <div className="landing-main">
        <div className="span-col-3 span-row-2">
          <Carousel item={images} />
        </div>
      </div>
      <CategoryDiscList />
      <OffStoreList stores={storeList} />
      <div className="productlist-wrapper">
        <div>
          <h3>Produk Lain</h3>
          <hr />
        </div>
        <ProductList />
      </div>
    </main>
  );
}

export default LandingApp;
