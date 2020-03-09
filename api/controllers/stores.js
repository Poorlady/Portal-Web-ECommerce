const mainpath = require("../../helpers/path");

const stringFormater = require("../../helpers/stringFormat");

const Store = require("../models/Store");

exports.addStore = (req, res) => {
  const { userId, name, desc, location } = req.body;

  let imgFileName;

  if (req.files !== null) {
    const imgFile = req.files.file;
    imgFileName = stringFormater.makeFileName(userId, imgFile, "photo");
    console.log(imgFileName);

    setData = {
      img: imgFileName,
      userId: userId,
      name: name,
      desc: desc,
      location: location
    };

    imgFile.mv(`${mainpath}/client/public/uploads/stores/${imgFileName}`);
  } else {
    setData = { userId: userId, name: name, desc: desc, location: location };
  }

  const store = new Store(setData);

  store
    .save()
    .then(result => {
      res.json(result);
    })
    .catch(err => console.log(err));
};

exports.getStore = (req, res) => {
  const { userId } = req.body;

  Store.findOne({ userId: userId })
    .then(result => res.json(result))
    .catch(err => console.log(err));
};

exports.updateStore = (req, res) => {
  const { storeId, name, desc, location } = req.body;

  let imgFileName;

  if (req.files !== null) {
    const imgFile = req.files.file;
    imgFileName = stringFormater.makeFileName(storeId, imgFile, "photo");

    setData = {
      img: imgFileName,
      name: name,
      desc: desc,
      location: location
    };

    imgFile.mv(`${mainpath}/client/public/uploads/stores/${imgFileName}`);
  } else {
    setData = { name: name, desc: desc, location: location };
  }

  Store.findByIdAndUpdate(storeId, { $set: setData }, { new: true })
    .then(result => res.json(result))
    .catch(err => console.log(err));
};

exports.addEtalase = (req, res) => {
  const { id, etalase } = req.body;

  Store.findByIdAndUpdate(id, { $set: { etalase: etalase } }, { new: true })
    .then(result => res.json(result))
    .catch(err => console.log(err));
};

exports.findByName = (req, res) => {
  Store.findOne({ name: req.params.params })
    .then(result => res.json(result))
    .catch(err => console.log(err));
};
