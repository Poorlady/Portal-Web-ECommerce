const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const saltRound = 10;

const mainpath = require("../../helpers/path");

const User = require("../models/User");
const Product = require("../models/Product");

const stringFormater = require("../../helpers/stringFormat");

const insertProductToCart = (user, productId, amount, size, colour) => {
  const cartProductIndex = user.cart.items.findIndex(
    item =>
      item.productId.toString() === productId.toString() &&
      item.size === size &&
      item.colour === colour
  );
  // console.log(cartProductIndex);
  let updatedCartProducts = [...user.cart.items];
  if (cartProductIndex >= 0) {
    let newQuantity = updatedCartProducts[cartProductIndex].amount + amount;
    // console.log(newQuantity);
    updatedCartProducts[cartProductIndex].amount = newQuantity;
    // newArr = manipulateAmount(user.cart.items, cartProductIndex, amout);
  } else {
    const newProduct = {
      productId: productId,
      size: size,
      colour: colour,
      amount: amount
    };
    updatedCartProducts.push(newProduct);
    // newArr = addNewProduct(user.cart.items, productId, amount, colour, size);
  }
  const updatedCart = { items: updatedCartProducts };
  // console.log(updatedCartProducts);
  user.cart = updatedCart;
  user
    .save()
    .then(result => {
      return result;
    })
    .catch(err => {
      return err;
    });
};

const deleteProductFromCart = (user, product) => {
  let updatedCartProducts = user.cart.items.filter(item => {
    if (item._id.toString() === product.toString()) {
      return false;
    } else {
      return true;
    }
  });

  console.log(updatedCartProducts);
  const updatedCart = { items: updatedCartProducts };
  // console.log(updatedCartProducts);
  user.cart = updatedCart;
  user
    .save()
    .then(result => {
      return result;
    })
    .catch(err => {
      return err;
    });
};

exports.signUp = (req, res) => {
  const { fName, lName, bDate, email, password } = req.body;

  bcrypt.hash(password, saltRound, function(err, hash) {
    if (err) {
      res.status(502).json({ mssg: "Server bad gateway" });
    }
    const user = new User({
      fName: fName,
      lName: lName,
      bDate: bDate,
      email: email,
      password: hash
    });

    User.findOne({ email: email }).then(result => {
      if (result) {
        res.status(204).json({ mssg: "Email already taken" });
      } else {
        user
          .save()
          .then(result => res.status(201).json({ data: result }))
          .catch(err => res.status(501).json({ err: err }));
      }
    });
  });
};

exports.logIn = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        console.log(0);
        res.status(204).json({ mssg: "user not found!" });
      } else {
        bcrypt.compare(password, user.password, function(err, result) {
          if (result) {
            console.log(1);
            req.user = user;
            res.status(200).json({ data: user });
          } else {
            console.log(2);
            res.status(204).json({ mssg: "Wrong password, try again!" });
          }
        });
      }
    })
    .catch(err => {
      res.status(501).json({ err: err });
    });
};

exports.updateUser = (req, res) => {
  const { _id, address, city, zip } = req.body;

  let imgFileName, setData;
  if (req.files !== null) {
    const imgFile = req.files.file;
    imgFileName = stringFormater.makeFileName(_id, imgFile, "photo");
    console.log(imgFileName);

    setData = { img: imgFileName, address: address, city: city, zip: zip };

    imgFile.mv(`${mainpath}/client/public/uploads/users/${imgFileName}`);
  } else {
    setData = {
      address: address,
      city: city,
      zip: zip
    };
  }

  User.findByIdAndUpdate(
    _id,
    {
      $set: setData
    },
    { new: true }
  )
    .then(result => {
      res.json(result);
    })
    .catch(err => res.json(err));
};

exports.updatePassword = (req, res) => {
  const { _id, password } = req.body;
  console.log(req.body);

  bcrypt.hash(password, saltRound, function(err, hash) {
    if (err) {
      res.status(502).json({ mssg: "Server bad gateway" });
    }

    User.findByIdAndUpdate(_id, { $set: { password: hash } }, { new: true })
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        console.log(err);
      });
  });
};

exports.getUser = (req, res) => {
  console.log(req.body);
  const { email } = req.body;

  User.findOne({ email: email })
    .then(result => res.json(result))
    .catch(err => console.log(err));
};

exports.addToCart = (req, res) => {
  const { productId, amount, size, colour, userId } = req.body;
  console.log(productId);
  // console.log(productId, amount, size, colour, userId);
  User.findById(userId)
    .then(user => {
      return insertProductToCart(user, productId, amount, size, colour);
    })
    .then(result => res.json(result))
    .catch(err => console.log(err));
};

exports.getCart = (req, res) => {
  User.findById(req.params.id)
    // .populate("cart.items.productId", { name: 1, mainImg: 1, storeId: 1 })
    .populate({
      path: "cart.items.productId",
      select: {
        name: 1,
        mainImg: 1,
        storeId: 1,
        price: 1,
        condition: 1,
        weight: 1
      },
      populate: { path: "storeId", select: { name: 1 } }
    })
    .exec()
    .then(result => res.json(result.cart))
    .catch(err => console.log(err));
};

exports.deleteCart = (req, res) => {
  const userId = req.params.id.split("U").pop();
  const productId = req.params.id.split("U").shift();
  console.log(productId);
  User.findById(userId)
    .then(user => deleteProductFromCart(user, productId))
    .then(result => res.json(result))
    .catch(err => console.log(err));
};
