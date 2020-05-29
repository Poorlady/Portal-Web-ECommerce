const mongoose = require("mongoose");
const fs = require("fs");

const mainpath = require("../../helpers/path");
// const fileUpload = require("express-fileupload");

const Product = require("../models/Product");
const Order = require("../models/Order");
const stringFormater = require("../../helpers/stringFormat");

const makeSlug = (name) => {
  return name.replace(/\s/g, "-").toLowerCase();
};

const removeFile = (fileName) => {
  fs.unlinkSync(`${mainpath}/client/public/uploads/products/${fileName}`);
};

const handleFile = (file, imgIndex, storeId, name, formerImg) => {
  let fileContainer = file;
  let imgName = file.name.replace(/\s/g, `${storeId + imgIndex + name}`);

  fileContainer.mv(`${mainpath}/client/public/uploads/products/${imgName}`);

  console.log(typeof formerImg);

  formerImg !== "null" && formerImg !== "undefined"
    ? removeFile(formerImg)
    : null;
  return imgName;
};

const setData = (req) => {
  console.log(req.body);
  console.log(req.files);
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
    storeId,
    formerMain,
    formerSecond,
    formerThird,
  } = req.body;
  let dataSet, mainImgName, secondImgName, thirdImgName;

  const mappedSize = stringFormater.stringTOArray(size);
  const mappedColour = stringFormater.stringTOArray(colour);
  const slug = makeSlug(name);

  if (req.files !== null) {
    console.log(req.files.mainFile != null);
    if (req.files.mainFile != null) {
      mainImgName = handleFile(
        req.files.mainFile,
        "main",
        storeId,
        name,
        formerMain
      );
    } else {
      mainImgName = formerMain;
    }
    if (req.files.secondFile != null) {
      secondImgName = handleFile(
        req.files.secondFile,
        "second",
        storeId,
        name,
        formerSecond
      );
    } else {
      secondImgName = formerSecond;
    }

    if (req.files.thirdFile != null) {
      thirdImgName = handleFile(
        req.files.thirdFile,
        "third",
        storeId,
        name,
        formerThird
      );
    } else {
      thirdImgName = formerThird;
    }
  } else {
    mainImgName = formerMain;
    secondImgName = formerSecond;
    thirdImgName = formerThird;
  }
  console.log(mainImgName);
  console.log(secondImgName);
  console.log(thirdImgName);
  dataSet = {
    name: name,
    mainImg: mainImgName,
    secondImg: secondImgName,
    thirdImg: thirdImgName,
    slug: slug,
    desc: desc,
    size: mappedSize,
    colour: mappedColour,
    stock: stock,
    price: price,
    category: category.trim(),
    etalase: etalase.trim(),
    condition: condition,
    weight: weight,
    storeName: storeName,
    storeId: storeId,
    addedDate: stringFormater.dateToday(),
  };
  return dataSet;
};

exports.postProduct = (req, res) => {
  const dataSet = setData(req);
  const product = new Product(dataSet);
  console.log(product);
  product
    .save()
    .then((result) => {
      res.json({
        mssg: "product added",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProducts = (req, res) => {
  Product.find()
    .populate("storeId", "name")
    .exec()
    .then((products) => {
      res.json(products);
    })
    .catch((err) => console.log(err));
};

exports.getProductsById = (req, res) => {
  Product.findById(req.params.id)
    .populate({
      path: "storeId",
      select: { name: 1 },
    })
    .populate({
      path: "review.user.userId",
      select: {
        img: 1,
      },
    })
    .exec()
    .then((product) => {
      res.status(202).json(product);
    })
    .catch((err) => console.log(err));
};

exports.getProductByParams = (req, res) => {
  Product.find({
    $or: [{ category: req.params.params }, { name: req.params.params }],
  }).then((product) => res.json(product));
};

exports.getProductsByStoreId = (req, res) => {
  Product.find({
    storeId: req.params.params,
  }).then((product) => res.json(product));
};

exports.editProduct = (req, res) => {
  const dataSet = setData(req);
  console.log(dataSet);
  Product.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: dataSet,
    }
  )
    .then((result) => {
      res.status(202).json({
        mssg: "Product Edited",
      });
    })
    .catch((err) => console.log(err));
};

exports.deleteProducts = (req, res) => {
  Product.findByIdAndRemove(req.params.params)
    .then((result) => {
      console.log(result);
      result.mainImg && removeFile(result.mainImg);
      result.secondImg && removeFile(result.secondImg);
      result.thirdImg && removeFile(result.thirdImg);
      res.json(result);
    })
    .catch((err) => console.log(err));
};

exports.postReview = (req, res) => {
  const {
    userId,
    userName,
    productId,
    text,
    rate,
    orderId,
    orderList,
  } = req.body;

  const review = {
    user: { userId: userId, name: userName },
    text: text,
    rate: rate,
    date: stringFormater.dateToday(),
  };
  Product.updateOne({ _id: productId }, { $push: { review: review } })
    .then((result) => {
      Order.findById(orderId).then((result) => {
        const orderItems = [...result.order.items];
        const index = orderItems.findIndex(
          (item) => item._id.toString() === orderList.toString()
        );
        orderItems[index].reviewed = true;
        const order = { items: orderItems };
        result.order = order;
        return result.save();
      });
    })
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
};

exports.addDiscount = (req, res) => {
  const { start, end, id, rate } = req.body;

  Product.findById(id)
    .then((product) => {
      const discount = {
        startedDate: start,
        endDate: end,
        rate: rate,
      };
      product.discount = discount;
      return product.save();
    })
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
};

exports.getDiscount = (req, res) => {
  Product.find({
    $and: [
      {
        "discount.startedDate": { $lte: new Date() },
      },
      { "discount.endDate": { $gte: new Date() } },
    ],
  })
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
};
