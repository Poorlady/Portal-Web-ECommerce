const Admin = require("../models/Admin");
const fs = require("fs");

const stringFormarter = require("../../helpers/stringFormat");
const mainpath = require("../../helpers/path");

const removeFile = (fileName) => {
  fs.unlinkSync(`${mainpath}/client/public/uploads/admins/${fileName}`);
};

exports.addCategory = (req, res) => {
  const { category } = req.body;
  Admin.countDocuments(function (err, count) {
    if (!err && count === 0) {
      const data = { category: { items: category } };
      Admin.create(data)
        .then((result) =>
          res.status(200).json({ result: result, mssg: "Item already saved!" })
        )
        .catch((err) => console.log(err));
    } else if (!err && count !== 0) {
      Admin.findOne()
        .then((result) => {
          let updatedCategories;
          if (result.category.items.length > 0) {
            const categoryArr = [...result.category.items];
            categoryArr.push(category);
            updatedCategories = { items: categoryArr };
          } else {
            updatedCategories = { items: category };
          }
          result.category = updatedCategories;
          return result.save();
        })
        .then((result) => {
          res.status(200).json({ result: result, mssg: "Item already saved!" });
        });
    } else {
      console.log(err);
    }
  });
};

exports.deleteCategory = (req, res) => {
  Admin.findOne()
    .then((result) => {
      const categoryArr = [...result.category.items].filter((item) => {
        if (item === req.params.name) {
          return false;
        }
        return true;
      });
      const newCategory = { items: categoryArr };
      result.category = newCategory;
      return result.save();
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
};

exports.getAdminData = (req, res) => {
  Admin.findOne()
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
};

exports.postCarousel = (req, res) => {
  const imgFile = req.files.file;
  const fileName = stringFormarter.makeFileName(
    imgFile.name,
    imgFile,
    "carousel"
  );

  Admin.countDocuments(function (err, count) {
    if (!err && count === 0) {
      const data = { carousel: { images: fileName } };
      imgFile.mv(`${mainpath}/client/public/uploads/admins/${fileName}`);
      Admin.create(data)
        .then((result) =>
          res.status(200).json({ result: result, mssg: "Item already saved!" })
        )
        .catch((err) => console.log(err));
    } else if (!err && count !== 0) {
      Admin.findOne()
        .then((result) => {
          let updatedCarousel;
          if (result.carousel.images.length > 0) {
            const carouselArr = [...result.carousel.images];
            carouselArr.push(fileName);
            updatedCarousel = { images: carouselArr };
          } else {
            updatedCarousel = { images: fileName };
          }
          result.carousel = updatedCarousel;
          imgFile.mv(`${mainpath}/client/public/uploads/admins/${fileName}`);
          return result.save();
        })
        .then((result) => {
          res.status(200).json({ result: result, mssg: "Item already saved!" });
        });
    } else {
      console.log(err);
    }
  });
};

exports.deleteCarousel = (req, res) => {
  Admin.findOne()
    .then((result) => {
      const carouselArr = [...result.carousel.images].filter((item) => {
        if (item === req.params.name) {
          return false;
        }
        return true;
      });
      removeFile(req.params.name);
      const newCarousel = { images: carouselArr };
      result.carousel = newCarousel;
      return result.save();
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
};
