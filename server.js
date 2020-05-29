const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
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
      useFindAndModify: false,
    }
  )
  .then((res) => {
    console.log("connected");
    // require("./api/data/adminSeed");
  })
  .catch((err) => console.log(err));

server.use(fileUpload());
server.use(apiRoutes);

if (process.env.NODE_ENV === "production") {
  server.use(express.static("client/build"));

  server.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });

  server.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "public"));
  });
}
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`server runs in port ${PORT}`);
});
