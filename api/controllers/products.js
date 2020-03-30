const mongoose = require("mongoose");
const fs = require("fs");

const mainpath = require("../../helpers/path");
// const fileUpload = require("express-fileupload");

const Product = require("../models/Product");
const Order = require("../models/Order");
const stringFormater = require("../../helpers/stringFormat");

const makeSlug = name => {
  return name.replace(/\s/g, "-").toLowerCase();
};

const removeFile = fileName => {
  fs.unlinkSync(`${mainpath}/client/public/uploads/products/${fileName}`);
};

const setData = req => {
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

  let dataSet,
    mainFile,
    mainImgName,
    secondFile,
    secondImgName,
    thirdFile,
    thirdImgName;

  const mappedSize = stringFormater.stringTOArray(size);
  const mappedColour = stringFormater.stringTOArray(colour);
  const slug = makeSlug(name);

  if (req.files !== null) {
    console.log(typeof req.files.thirdFile);
    console.log(req.files.thirdFile);
    if (req.files.mainFile != null) {
      mainFile = req.files.mainFile;
      mainImgName = stringFormater.makeFileName(
        `${storeId}_${name}`,
        mainFile,
        "main"
      );
      mainFile.mv(`${mainpath}/client/public/uploads/products/${mainImgName}`);
      req.body.mainFile && removeFile(req.body.mainFile);
    }
    if (req.files.secondFile != null) {
      secondFile = req.files.secondFile;
      secondImgName = stringFormater.makeFileName(
        `${storeId}_${name}`,
        secondFile,
        "second"
      );
      secondFile.mv(
        `${mainpath}/client/public/uploads/products/${secondImgName}`
      );
      req.body.secondFile && removeFile(req.body.secondFile);
    }

    if (req.files.thirdFile != null) {
      thirdFile = req.files.thirdFile;
      thirdImgName = stringFormater.makeFileName(
        `${storeId}_${name}`,
        thirdFile,
        "third"
      );
      thirdFile.mv(
        `${mainpath}/client/public/uploads/products/${thirdImgName}`
      );
      req.body.thirdFile && removeFile(req.body.thirdFile);
    }
  }

  dataSet = {
    name: name,
    mainImg: mainImgName ? mainImgName : req.body.mainFile,
    secondImg: secondImgName ? secondImgName : req.body.secondFile,
    thirdImg: thirdImgName ? thirdImgName : req.body.thirdFile,
    slug: slug,
    desc: desc,
    size: mappedSize,
    colour: mappedColour,
    stock: stock,
    price: price,
    category: category.trim().toLowerCase(),
    etalase: etalase,
    condition: condition,
    weight: weight,
    storeName: storeName,
    storeId: storeId,
    addedDate: stringFormater.dateToday()
  };

  return dataSet;
};

exports.postProduct = (req, res) => {
  const dataSet = setData(req);
  const product = new Product(dataSet);
  console.log(req.user);
  console.log(req);
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
    .populate("storeId", "name")
    .exec()
    .then(products => {
      // console.log(products);
      res.json(products);
    })
    .catch(err => console.log(err));
};

exports.getProductsById = (req, res) => {
  Product.findById(req.params.id)
    .populate("storeId", "name")
    .populate({
      path: "review.user.userId",
      select: {
        img: 1
      }
    })
    .exec()
    .then(product => {
      // console.log(product);
      res.status(202).json(product);
    })
    .catch(err => console.log(err));
};

exports.getProductByParams = (req, res) => {
  console.log(req.params.params);
  Product.find({
    $or: [{ category: req.params.params }, { name: req.params.params }]
  }).then(product => res.json(product));
};

exports.getProductsByStoreId = (req, res) => {
  Product.find({
    storeId: req.params.params
  }).then(product => res.json(product));
};

exports.editProduct = (req, res) => {
  const dataSet = setData(req);
  Product.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: dataSet
    }
  )
    .then(result => {
      res.status(202).json({
        mssg: "Product Edited"
      });
    })
    .catch(err => console.log(err));
};

exports.deleteProducts = (req, res) => {
  Product.findByIdAndRemove(req.params.params)
    .then(result => {
      result.mainImg && removeFile(result.mainImg);
      result.secondImg && removeFile(result.secondImg);
      result.thirdImg && removeFile(result.thirdImg);
      res.json(result);
    })
    .catch(err => console.log(err));
};

exports.postReview = (req, res) => {
  // console.log(req.body);
  const {
    userId,
    userName,
    productId,
    text,
    rate,
    orderId,
    orderList
  } = req.body;

  const review = {
    user: { userId: userId, name: userName },
    text: text,
    rate: rate,
    date: stringFormater.dateToday()
  };
  Product.updateOne({ _id: productId }, { $push: { review: review } })
    .then(result => {
      Order.findById(orderId).then(result => {
        const orderItems = [...result.order.items];
        const index = orderItems.findIndex(
          item => item._id.toString() === orderList.toString()
        );
        orderItems[index].reviewed = true;
        const order = { items: orderItems };
        result.order = order;
        return result.save();
      });
    })
    .then(result => res.json(result))
    .catch(err => console.log(err));
};

exports.processCheckout = (req, res) => {};
// console.log(dataSet);
// console.log(req.files.mainFile);
// console.log(req.body);
