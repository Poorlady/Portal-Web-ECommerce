const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  slug: String,
  mainImg: String,
  secondImg: String,
  thirdImg: String,
  desc: String,
  size: [String],
  colour: [String],
  stock: Number,
  price: Number,
  category: String,
  etalase: String,
  condition: String,
  storeName: String,
  weight: Number,
  storeName: String,
  storeId: Schema.Types.ObjectId
});

module.exports = mongoose.model("Product", productSchema);

// const fs = require("fs");
// const path = require("path");

// const p = path.join(
//   process.mainModule.filename,
//   "..",
//   "api",
//   "data",
//   "products.json"
// );

// const getProductFile = cb => {
//   fs.readFile(p, (err, content) => {
//     if (err) {
//       cb([]);
//     } else {
//       cb(JSON.parse(content));
//     }
//   });
// };

// module.exports = class Product {
//   constructor(
//     name,
//     img,
//     desc,
//     size,
//     colour,
//     stock,
//     price,
//     category,
//     etalase,
//     condition,
//     storeName
//   ) {
//     this.name = name;
//     this.img = img;
//     this.desc = desc;
//     this.size = size;
//     this.colour = colour;
//     this.stock = stock;
//     this.price = price;
//     this.category = category;
//     this.etalase = etalase;
//     this.condition = condition;
//     this.storeName = storeName;
//   }

//   save() {
//     this.id = Math.random();
//     this.slug =
//       this.name
//         .trim()
//         .replace(/\s+/g, "-")
//         .toLowerCase() +
//       "-" +
//       this.id;
//     console.log(this.slug);
//     getProductFile(products => {
//       products.push(this);
//       fs.writeFile(p, JSON.stringify(products), err => {
//         console.log(err);
//       });
//     });
//   }

//   static fetchAll(cb) {
//     getProductFile(cb);
//   }

//   static findById(slug, cb) {
//     getProductFile(products => {
//       const product = products.find(item => item.slug === slug);
//       cb(product);
//     });
//   }

//   static filterProdcutsByParam(category, cb) {
//     getProductFile(products => {
//       const filteredProducts = products.filter(
//         item => item.category === category
//       );
//       cb(filteredProducts);
//     });
//   }
// };
