import React from "react";
import { Link } from "react-router-dom";

function OffStoreList({ stores }) {
  var sectionStyle = {
    width: "100%",
    height: "400px",
    backgroundImage: "url(" + {} + ")",
  };
  return (
    <div className="OffStore-wrapper">
      <div className="OffStore-header">
        <h2>Store List</h2>
      </div>
      <div className="OffStore-list">
        {stores.map((item, i) => (
          <div
            key={item._id}
            style={{ backgroundImage: `url(/uploads/stores/${item.img})` }}
            className={`OffStore-item`}
          >
            <Link
              className="capitalize OffStore-name"
              to={`/store/${item.name}`}
            >
              {item.name}
            </Link>
          </div>
        ))}
        <div className="OffStore-item">Nissin</div>
        <div className="OffStore-item">Samsung</div>
        <div className="OffStore-item">LG</div>
        <div className="OffStore-item">Hyundai</div>
      </div>
    </div>
  );
}

export default OffStoreList;
