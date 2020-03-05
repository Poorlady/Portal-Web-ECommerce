import React, { useEffect } from "react";
import Carousel from "../components/Carousel";
import CategoryDiscList from "../components/ProductDiscList";
import OffStoreList from "../components/OffStoreList";
import ProductList from "../components/ProductList";
import { Link } from "react-router-dom";

function LandingApp() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <div className="landing-main">
        <div className="span-col-2 span-row-2">
          <Carousel />
        </div>
        <div className="main-item">
          <Link>
            <img
              src="http://d36gula0vrbl28.cloudfront.net/media/wysiwyg/sirena/furniture_banner2.png"
              alt=""
            />
            <div className="category-caption left-top hund-p">
              <h4>Dekorasi Rumah</h4>
            </div>
          </Link>
        </div>
        <div className="main-item">
          <img
            src="http://d36gula0vrbl28.cloudfront.net/media/wysiwyg/sirena/furniture_banner1.png"
            alt=""
          />
          <div className="category-caption left-top">
            <h4>Kursi dan Sofa</h4>
          </div>
        </div>
        <div className="main-item">
          <img
            src="http://d36gula0vrbl28.cloudfront.net/media/wysiwyg/sirena/furniture_banner_5.jpg"
            alt=""
          />
          <div className="category-caption left-top">
            <h4>Kursi Santai</h4>
          </div>
        </div>
        <div className="main-item">
          <img
            src="http://d36gula0vrbl28.cloudfront.net/media/wysiwyg/sirena/furniture_banner_4.jpg"
            alt=""
          />
          <div className="category-caption">
            <h4>Dekorasi umah</h4>
          </div>
        </div>
        <div className="main-item">
          <img
            src="http://d36gula0vrbl28.cloudfront.net/media/wysiwyg/sirena/furniture_banner_3.jpg"
            alt=""
          />
          <div className="category-caption">
            <h4>Dekorasi Ruah</h4>
          </div>
        </div>
      </div>
      <CategoryDiscList />
      <OffStoreList />
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
