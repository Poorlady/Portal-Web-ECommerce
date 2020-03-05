const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const saltRound = 10;

const mainpath = require("../../helpers/path");

const User = require("../models/User");

const stringFormater = require("../../helpers/stringFormat");

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
