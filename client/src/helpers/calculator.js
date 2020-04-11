exports.getDiscount = (product) => {
  return product.price - product.price * (product.discount.rate / 100);
};
