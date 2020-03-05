const mongoose = require("mongoose");

const mainpath = require("../../helpers/path");
// const fileUpload = require("express-fileupload");

const Product = require("../models/Product");

const stringFormater = require("../../helpers/stringFormat");

const makeSlug = name => {
  return name.replace(/\s/g, "-").toLowerCase();
};

exports.postProduct = (req, res) => {
  console.log(req.files.mainFile);
  const {
    name,
    desc,
    size,
    colour,
    stock,
    price,
    category,
    etalase,
    condition,
    storeName,
    weight,
    storeId
  } = req.body;

  const mainFile = req.files.mainFile;
  const mainImgname = stringFormater.makeFileName(
    `${storeId}_${name}`,
    mainFile,
    "main"
  );

  const secondFile = req.files.secondFile;
  const secondImgname = stringFormater.makeFileName(
    `${storeId}_${name}`,
    secondFile,
    "second"
  );

  const thirdFile = req.files.thirdFile;
  const thirdImgname = stringFormater.makeFileName(
    `${storeId}_${name}`,
    thirdFile,
    "third"
  );

  const mappedSize = stringFormater.stringTOArray(size);
  const mappedColour = stringFormater.stringTOArray(colour);
  const slug = makeSlug(name);

  mainFile.mv(`${mainpath}/client/public/uploads/products/${mainImgname}`);
  secondFile.mv(`${mainpath}/client/public/uploads/products/${secondImgname}`);
  thirdFile.mv(`${mainpath}/client/public/uploads/products/${thirdImgname}`);

  const product = new Product({
    name: name,
    slug: slug,
    mainImg: mainImgname,
    secondImg: secondImgname,
    thirdImg: thirdImgname,
    desc: desc,
    size: mappedSize,
    colour: mappedColour,
    stock: stock,
    price: price,
    category: category,
    etalase: etalase,
    condition: condition,
    storeName: storeName,
    weight: weight,
    storeId: storeId
  });

  product
    .save()
    .then(result => {
      console.log("product created");
      res.json({
        mssg: "product added"
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProducts = (req, res) => {
  Product.find()
    .then(products => res.json(products))
    .catch(err => console.log(err));
};

exports.getProductsById = (req, res) => {
  Product.findById(req.params.id)
    .then(product => res.status(202).json(product))
    .catch(err => console.log(err));
};

exports.getProductByParams = (req, res) => {
  Product.find({
    $or: [{ category: req.params.params }, { name: req.params.params }]
  }).then(product => res.json(product));
};

exports.editProduct = (req, res) => {
  const {
    name,
    desc,
    size,
    colour,
    stock,
    price,
    category,
    etalase,
    condition,
    storeName,
    weight,
    storeId
  } = req.body;

  const mainFile = req.files.mainFile;
  const mainImgname = stringFormater.makeFileName(
    `${storeId}_${name}`,
    mainFile,
    "main"
  );

  const secondFile = req.files.secondFile;
  const secondImgname = stringFormater.makeFileName(
    `${storeId}_${name}`,
    secondFile,
    "second"
  );

  const thirdFile = req.files.thirdFile;
  const thirdImgname = stringFormater.makeFileName(
    `${storeId}_${name}`,
    thirdFile,
    "third"
  );

  const mappedSize = stringFormater.stringTOArray(size);
  const mappedColour = stringFormater.stringTOArray(colour);
  const slug = makeSlug(name);

  mainFile.mv(`${mainpath}/client/public/uploads/products/${mainImgname}`);
  secondFile.mv(`${mainpath}/client/public/uploads/products/${secondImgname}`);
  thirdFile.mv(`${mainpath}/client/public/uploads/products/${thirdImgname}`);

  Product.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name: name,
        mainImg: mainImgname,
        secondImg: secondImgname,
        thirdImgname: thirdImgname,
        slug: slug,
        desc: desc,
        size: mappedSize,
        colour: mappedColour,
        stock: stock,
        price: price,
        category: category,
        etalase: etalase,
        condition: condition,
        weight: weight,
        storeName: storeName,
        storeId: storeId
      }
    }
  )
    .then(result => {
      res.status(202).json({
        mssg: "Product Edited"
      });
    })
    .catch(err => console.log(err));
};
