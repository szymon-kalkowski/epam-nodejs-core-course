import csv from "csvtojson";
import fs from "fs";

const writableStream = fs.createWriteStream("file.txt");

csv({
  delimiter: ";",
})
  .fromFile("./csv/nodejs-hw1-ex1.csv")
  .then((jsonArray) => {
    jsonArray.map((x) => writableStream.write(JSON.stringify(x) + "\n"));
  })
  .catch((error) => console.log(error));
