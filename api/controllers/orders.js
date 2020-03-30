const Order = require("../models/Order");
const User = require("../models/User");

const stringFormatter = require("../../helpers/stringFormat");

const objectId = require("mongoose").Types.ObjectId;
const stripe = require("stripe");

const checkObjectId = value => {
  if (objectId.isValid(value)) {
    return { "user.userId": value };
  } else {
    return { "order.items.product.storeId.name": value };
  }
};

exports.postOrder = (req, res) => {
  //   console.log(req.body);
  const { userId, total } = req.body;
  console.log(userId, total);
  User.findById(userId)
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
    .then(user => {
      const products = user.cart.items.map(item => {
        return {
          product: {
            ...item.productId._doc,
            storeId: { ...item.productId.storeId._doc }
          },
          size: item.size,
          colour: item.colour,
          amount: item.amount
        };
      });
      const username = stringFormatter.fullName(user.fName, user.lName);
      const location = stringFormatter.locationMaker(
        user.address,
        user.city,
        user.zip
      );
      const order = new Order({
        user: {
          userId: user,
          name: username,
          location: location
        },
        order: {
          items: products
        },
        orderDate: stringFormatter.dateToday(),
        total: total
      });

      return order.save();
    })
    .then(result => {
      User.findById(result.user.userId).then(user => {
        const cart = { items: [] };
        user.cart = cart;
        return user.save();
      });
    })
    .then(result => res.json(result))
    .catch(err => console.log(err));
};

exports.getOrder = (req, res) => {
  const filter = checkObjectId(req.params.params);
  console.log(filter);
  Order.find(filter)
    .then(result => res.json(result))
    .catch(err => console.log(err));
};

exports.postIntent = async (req, res) => {
  console.log(req.body);
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.total * 100,
      currency: "idr",
      metadata: { integration_check: "accept_a_payment" }
    });
    res.status(200).json({ client_secret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ statusCode: 500, mssg: err.massage });
  }
};
// console.log(product);

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
