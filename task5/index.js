const http = require("http");
const { url } = require("./config.js");
const {
  addUser,
  getUsers,
  deleteUser,
  addHobbies,
  getUserHobbies,
} = require("./userService.js");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "public, max-age=3600");

  addUser(req, res);
  getUsers(req, res);
  deleteUser(req, res);
  addHobbies(req, res);
  getUserHobbies(req, res);
});

server.listen(8000, () => {
  console.log(`Server is running on ${url}`);
});
