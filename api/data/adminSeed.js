const bcrypt = require("bcrypt");
const saltRound = 10;

const User = require("../models/User");

bcrypt.hash("adminPassword", saltRound, (err, hased) => {
  if (err) {
    console.log(err);
  }
  var user = {
    fName: "Admin",
    lName: "user",
    email: "admin@gmail.com",
    role: "admin",
    password: hased
  };

  User.create(user, function(e) {
    if (e) {
      throw e;
    }
  });
});
