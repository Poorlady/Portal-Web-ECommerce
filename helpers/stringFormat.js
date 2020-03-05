exports.makeFileName = (name, file, index) => {
  return `${name}_${index}Img.${file.name.split(".").pop()}`;
};

exports.stringTOArray = item => {
  return item.trim().split(",");
};
