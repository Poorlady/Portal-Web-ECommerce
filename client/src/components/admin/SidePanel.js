import React from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";

function SidePanel({ logout }) {
  let { url } = useRouteMatch();
  let history = useHistory();
  return (
    <>
      <div className="side--header">Shop-Admin</div>
      <div className="side--menu">
        <ul>
          <li>
            <Link className="side--menu-link" to={`${url}/carousel`}>
              Carousel
            </Link>
          </li>
          <li>
            <Link className="side--menu-link" to={`${url}/shop-category`}>
              Shop Category
            </Link>
          </li>
          <li>
            <Link onClick={() => logout(history)} className="side--menu-link">
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default SidePanel;
