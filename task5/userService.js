const { v4: uuidv4 } = require("uuid");
const {
  mapUserData,
  mapUserHobbiesData,
  removeDuplicates,
} = require("./utils.js");

let users = [];

const addUser = (req, res) => {
  if (req.url === "/api/users" && req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      const user = {
        id: uuidv4(),
        ...JSON.parse(body),
        hobbies: [],
      };
      users.push(user);

      const response = {
        data: mapUserData(user),
        error: null,
      };

      res.writeHead(201);
      res.end(JSON.stringify(response));
    });
  }
};

const getUsers = (req, res) => {
  if (req.url === "/api/users" && req.method === "GET") {
    const response = {
      data: users.map(mapUserData),
      error: null,
    };

    res.end(JSON.stringify(response));
  }
};

const deleteUser = (req, res) => {
  if (req.url.match(/\/api\/users\/.{36}/) && req.method === "DELETE") {
    const id = req.url.split("/")[3];
    const user = users.find((user) => user.id === id);

    if (user) {
      users = users.filter((user) => user.id !== id);
      const response = {
        data: {
          success: true,
        },
        error: null,
      };

      res.end(JSON.stringify(response));
    } else {
      const response = {
        data: null,
        error: `User with id ${id} doesn't exist`,
      };

      res.writeHead(404);
      res.end(JSON.stringify(response));
    }
  }
};

const addHobbies = (req, res) => {
  if (req.url.match(/\/api\/users\/.{36}\/hobbies/) && req.method === "PATCH") {
    const id = req.url.split("/")[3];
    const user = users.find((user) => user.id === id);

    if (user) {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk;
      });

      req.on("end", () => {
        const { hobbies } = JSON.parse(body);
        users = users.map((user) => {
          if (user.id === id) {
            return {
              ...user,
              hobbies: removeDuplicates([...user.hobbies, ...hobbies]),
            };
          }
          return user;
        });
        const response = {
          data: mapUserData(user),
          error: null,
        };

        res.end(JSON.stringify(response));
      });
    } else {
      const response = {
        data: null,
        error: `User with id ${id} doesn't exist`,
      };

      res.writeHead(404);
      res.end(JSON.stringify(response));
    }
  }
};

const getUserHobbies = (req, res) => {
  if (req.url.match(/\/api\/users\/.{36}\/hobbies/) && req.method === "GET") {
    const id = req.url.split("/")[3];
    const user = users.find((user) => user.id === id);

    if (user) {
      const response = {
        data: mapUserHobbiesData(user),
        error: null,
      };

      res.end(JSON.stringify(response));
    } else {
      const response = {
        data: null,
        error: `User with id ${id} doesn't exist`,
      };

      res.writeHead(404);
      res.end(JSON.stringify(response));
    }
  }
};

module.exports = {
  addUser,
  getUsers,
  deleteUser,
  addHobbies,
  getUserHobbies,
};
