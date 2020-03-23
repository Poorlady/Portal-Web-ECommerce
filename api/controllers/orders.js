const Order = require("../models/Order");

const stringFormatter = require("../../helpers/stringFormat");

const objectId = require("mongoose").Types.ObjectId;

const checkObjectId = value => {
  if (objectId.isValid(value)) {
    return { userId: value };
  } else {
    return { "products.storeName": value };
  }
};

exports.postOrder = (req, res) => {
  //   console.log(req.body);
  const { user, product } = req.body;
  console.log(user);
  console.log(product);

  // const uName = stringFormatter.fullName(user.fName, user.lName);
  // const uLocation = stringFormatter.locationMaker(
  //   user.address,
  //   user.city,
  //   user.zip
  // );
  // const total = product.reduce(
  //   (acc, { price, amount }) => acc + price * amount,
  //   0
  // );
  // const date = stringFormatter.dateToday();
  // //   const groupBy = (objectArray, property) => {
  // //     let reduced = objectArray.reduce(function(acc, obj) {
  // //       let key = obj[property];
  // //       if (!acc[key]) {
  // //         acc[key] = [];
  // //       }
  // //       acc[key].push(obj);
  // //       return acc;
  // //     }, []);
  // //     return reduced.map(item => item._id);
  // //   };
  // const maped = product.map(
  //   ({
  //     _id,
  //     name,
  //     size,
  //     colour,
  //     amount,
  //     storeName,
  //     storeId,
  //     mainImg,
  //     price
  //   }) => ({
  //     _id,
  //     name,
  //     size,
  //     colour,
  //     amount,
  //     storeName,
  //     storeId,
  //     mainImg,
  //     price
  //   })
  // );
  // //   const groupedProducts = groupBy(maped, "storeName");
  // //   console.log(maped);
  // //   console.log(groupedProducts);
  // //   const productMapped = groupedProducts.map(item => {
  // //     let newObj = {
  // //       productId: item._id,
  // //       productName: item.name,
  // //       productSize: item.size,
  // //       productColour: item.colour,
  // //       amount: item.amount
  // //     };
  // //     return newObj;
  // //   });

  // const order = new Order({
  //   userName: uName,
  //   userId: user._id,
  //   location: uLocation,
  //   orderDate: date,
  //   total: total
  // });

  // maped.forEach(elemet => {
  //   order.products.push(elemet);
  // });

  // order
  //   .save()
  //   .then(result => res.json(result))
  //   .catch(err => console.log(err));
};

exports.getOrder = (req, res) => {
  const filter = checkObjectId(req.params.params);
  Order.find(filter)
    .then(result => res.json(result))
    .catch(err => console.log(err));
};
