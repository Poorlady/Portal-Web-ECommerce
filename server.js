const express = require("express");
const fileUpload = require("express-fileupload");

const server = express();

const apiRoutes = require("./api/routes/api");

const mongoose = require("mongoose");

const bodyParser = require("body-parser");
server.use(bodyParser.json());

server.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(
    "mongodb+srv://saniekasmara:" +
      process.env.MONGO_ATLAS_PW +
      "@storedb-e9u42.mongodb.net/shop?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }
  )
  .then(res => {
    console.log("connected");
    // require("./api/data/adminSeed");
  })
  .catch(err => console.log(err));

server.use(fileUpload());
server.use(apiRoutes);

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`server runs in port ${PORT}`);
});
