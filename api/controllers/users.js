const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const saltRound = 10;
const fs = require("fs");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const transport = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.SENDGRID_API_KEY,
    },
  })
);
const mainpath = require("../../helpers/path");
const User = require("../models/User");
const Product = require("../models/Product");
const stringFormater = require("../../helpers/stringFormat");

const removeFile = (fileName) => {
  fs.unlinkSync(`${mainpath}/client/public/uploads/users/${fileName}`);
};

const emailSign = (userMail) => {
  return (email = {
    to: userMail,
    from: "shop@node-ecom.com",
    subject: "Welcome To ECommerce Shop",
    text:
      "We are grateful for your membership and hope you have fun shopping in our website",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  });
};

const emailReset = (userMail, token) => {
  return (email = {
    to: userMail,
    from: "shop@node-ecom.com",
    subject: "Password Reset",
    html: `<p>You request a reset password for this account</p>
    <p>Click this <a href="https://mycommercial.herokuapp.com/reset/${token}"> Link </a> for reset your account password</p>`,
  });
};

const insertProductToCart = (user, productId, amount, size, colour) => {
  const cartProductIndex = user.cart.items.findIndex(
    (item) =>
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
      amount: amount,
    };
    updatedCartProducts.push(newProduct);
    // newArr = addNewProduct(user.cart.items, productId, amount, colour, size);
  }
  const updatedCart = { items: updatedCartProducts };

  user.cart = updatedCart;
  return user.save();
};

const deleteProductFromCart = (user, product) => {
  let updatedCartProducts = user.cart.items.filter((item) => {
    if (item._id.toString() === product.toString()) {
      return false;
    } else {
      return true;
    }
  });

  const updatedCart = { items: updatedCartProducts };
  // console.log(updatedCartProducts);
  user.cart = updatedCart;
  return user.save();
};

exports.signUp = (req, res) => {
  const { fName, lName, bDate, email, password } = req.body;

  bcrypt.hash(password, saltRound, function (err, hash) {
    if (err) {
      res.status(502).json({ mssg: "Server bad gateway" });
    }
    const user = new User({
      fName: fName,
      lName: lName,
      bDate: bDate,
      email: email,
      password: hash,
    });

    User.findOne({ email: email }).then((result) => {
      if (result) {
        res.status(204).json({ mssg: "Email already taken" });
      } else {
        user
          .save()
          .then((result) => {
            res.status(201).json({ data: result });
            return transport.sendMail(emailSign(email));
          })
          .catch((err) => res.status(501).json({ err: err }));
      }
    });
  });
};

exports.logIn = (req, res) => {
  const { email, password, role } = req.body;
  let userRole = role ? role : "user";

  User.findOne({ email: email, role: userRole })
    .then((user) => {
      if (!user) {
        return res.status(201).json({ mssg: "user not found!" });
      } else {
        bcrypt.compare(password, user.password, function (err, result) {
          if (result) {
            req.user = user;
            res.status(200).json({ data: user });
          } else {
            return res.status(201).json({ mssg: "Wrong password, try again!" });
          }
        });
      }
    })
    .catch((err) => {
      res.status(501).json({ err: err });
    });
};

exports.updateUser = (req, res) => {
  const { _id, address, city, zip, phone, formerImg } = req.body;

  let imgFileName, setData;
  if (req.files !== null) {
    const imgFile = req.files.file;
    imgFileName = stringFormater.makeFileName(_id, imgFile, "photo");

    setData = {
      img: imgFileName,
      address: address,
      city: city,
      zip: zip,
      phone: phone,
    };

    formerImg !== "undefined" ? removeFile(formerImg) : null;
    imgFile.mv(`${mainpath}/client/public/uploads/users/${imgFileName}`);
  } else {
    setData = {
      address: address,
      city: city,
      zip: zip,
      phone: phone,
    };
  }

  User.findByIdAndUpdate(
    _id,
    {
      $set: setData,
    },
    { new: true }
  )
    .then((result) => {
      res.json(result);
    })
    .catch((err) => res.json(err));
};

exports.updatePassword = (req, res) => {
  const { _id, password } = req.body;

  bcrypt.hash(password, saltRound, function (err, hash) {
    if (err) {
      res.status(502).json({ mssg: "Server bad gateway" });
    }

    User.findByIdAndUpdate(_id, { $set: { password: hash } }, { new: true })
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

exports.getUser = (req, res) => {
  const { email } = req.body;

  User.findOne({ email: email })
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
};

exports.addToCart = (req, res) => {
  const { productId, amount, size, colour, userId } = req.body;
  // console.log(productId, amount, size, colour, userId);
  User.findById(userId)
    .then((user) => {
      return insertProductToCart(user, productId, amount, size, colour);
      // console.log(insertProductToCart(user, productId, amount, size, colour));
    })
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
};

exports.getCart = (req, res) => {
  User.findById(req.params.id)
    // .populate("cart.items.productId", { name: 1, mainImg: 1, storeId: 1 })
    .populate({
      path: "cart.items.productId",
      select: {
        name: 1,
        desc: 1,
        mainImg: 1,
        storeId: 1,
        price: 1,
        condition: 1,
        weight: 1,
        discount: 1,
      },
      populate: { path: "storeId", select: { name: 1 } },
    })
    .exec()
    .then((result) => res.json(result.cart))
    .catch((err) => console.log(err));
};

exports.deleteCart = (req, res) => {
  const userId = req.params.id.split("U").pop();
  const productId = req.params.id.split("U").shift();

  User.findById(userId)
    .then((user) => deleteProductFromCart(user, productId))
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
};

exports.resetPassword = (req, res) => {
  const { email } = req.body;
  let id;
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      res.status(501).json({ err: err });
    }
    const token = buffer.toString("hex");
    console.log(token);
    User.findOne({ email: email })
      .then((user) => {
        if (!user) {
          return res.status(201).json({ mssg: "Email Not Found" });
        }
        id = user._id;
        user.resetToken = token + "U" + user._id;
        user.resetExpired = Date.now() + 3600000;
        return user.save();
      })
      .then((result) => {
        res.status(200).json({ mssg: "Email has been send" });
        transport.sendMail(emailReset(email, token + "U" + id));
      })
      .catch((err) => console.log(err));
  });
};

exports.changePassword = (req, res) => {
  const { password, token } = req.body;

  const userId = token.split("U").pop();
  let resetUser;
  User.findOne({
    resetToken: token,
    resetExpired: { $gt: Date.now() },
    _id: userId,
  })
    .then((user) => {
      resetUser = user;
      if (!user) {
        res.status(201).json({ mssg: "Token is expired!" });
      }
      return bcrypt.hash(password, saltRound);
    })
    .then((hashedPassword) => {
      resetUser.password = hashedPassword;
      resetUser.resetToken = undefined;
      resetUser.resetExpired = undefined;
      return resetUser.save();
    })
    .then((result) => res.json({ mssg: "Password Change" }))
    .catch((err) => console.log(err));
};

const createAdmin = () => {
  bcrypt.hash("adminPassword", saltRound, function (err, hash) {
    if (err) {
      res.status(502).json({ mssg: "Server bad gateway" });
    }
    const user = new User({
      fName: "admin",
      lName: "akun",
      email: "admin@email.com",
      password: hash,
      role: "admin",
    });
    user
      .save()
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  });
};
