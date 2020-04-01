import React, { useEffect, useContext } from "react";
import axios from "axios";
import SidePanel from "../components/admin/SidePanel";
import CategoryForm from "../components/admin/CategoryForm";
import CarouselList from "../components/admin/CarouselList";
import { authContext } from "../contexts/Auth";
import { useRouteMatch, Switch, Route } from "react-router-dom";

import pic from "../img/back.png";

const saveLocal = data => {
  localStorage.setItem("images", JSON.stringify(data.carousel.images));
  localStorage.setItem("category", JSON.stringify(data.category.items));
};

function AdminDashboard() {
  let { path } = useRouteMatch();
  const { deleteUser } = useContext(authContext);

  const fetchData = async () => {
    await axios
      .get("/api/admin")
      .then(result => {
        console.log(result);
        saveLocal(result.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div class="grid">
      <div class="span-row-5 side--panel">
        <SidePanel logout={deleteUser} />
      </div>
      <div class="span-col-4 panel--header">
        <Switch>
          <Route exact path={`${path}/`}>
            <h2>Welcome The Administrator</h2>
          </Route>
          <Route path={`${path}/carousel`}>
            <h2>Carousel</h2>
          </Route>
          <Route path={`${path}/shop-category`}>
            <h2>Shop Categories</h2>
          </Route>
        </Switch>
      </div>
      <div class="span-col-4 span-row-4 panel--content">
        <Switch>
          <Route exact path={`${path}/`}>
            <div className="pic-add">
              <a href="https://icons8.com">
                <img src={pic} alt="https://icons8.com" />
              </a>
            </div>
          </Route>
          <Route path={`${path}/carousel`}>
            <CarouselList />
          </Route>
          <Route path={`${path}/shop-category`}>
            <CategoryForm />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default AdminDashboard;
