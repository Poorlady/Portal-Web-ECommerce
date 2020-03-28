const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  mainImg: { type: String },
  secondImg: { type: String },
  thirdImg: { type: String },
  desc: { type: String },
  size: [{ type: String }],
  colour: [{ type: String }],
  price: {
    type: Number,
    required: true
  },
  category: { type: String },
  etalase: { type: String },
  condition: { type: String },
  storeId: {
    type: Schema.Types.ObjectId,
    ref: "Store",
    required: true
  },
  weight: { type: Number },
  addedDate: {
    type: Date,
    required: true
  },
  review: [
    {
      user: {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true
        },
        name: { type: String, required: true }
      },
      text: {
        type: String,
        required: true
      },
      rate: {
        type: Number,
        required: true
      },
      date: {
        type: Date,
        required: true
      }
    }
  ]
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
