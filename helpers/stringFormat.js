let today = new Date();
let date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
let time =
  today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds();

exports.getDate = date;

exports.makeFileName = (name, file, index) => {
  return `${name.replace(/\s/g, "-")}_${date}_${time}_${index}Img.${
    file && file.name.split(".").pop()
  }`;
};

exports.stringTOArray = (item) => {
  return item
    .trim()
    .split(",")
    .map((item) => item.trim());
};

exports.dateToday = () => {
  return date;
};

exports.locationMaker = (address, city, zip) => {
  return `${address}, ${city}, ${zip}`;
};

exports.fullName = (fName, lName) => {
  return `${fName} ${lName}`;
};

let fakeF = {
  name: "fileName.jpeg",
};

console.log(this.makeFileName("gambar", null, "main"));
