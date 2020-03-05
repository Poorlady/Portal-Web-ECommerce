exports.toCurrency = (price, amount = 1) => {
  return (price * amount).toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR"
  });
};

exports.textOnly = value => {
  var letters = /^[A-Z a-z]*$/;
  if (value.match(letters)) {
    return true;
  } else {
    alert("Alphabetical only!");
  }
};
