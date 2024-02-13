const { url } = require("./config");

const mapUserData = (user) => ({
  user: {
    id: user.id,
    name: user.name,
    email: user.email,
  },
  links: {
    self: `${url}/${user.id}`,
    hobbies: `${url}/${user.id}/hobbies`,
  },
});

const mapUserHobbiesData = (user) => ({
  hobbies: user.hobbies,
  links: {
    self: `${url}/${user.id}/hobbies`,
    user: `${url}/${user.id}`,
  },
});

const removeDuplicates = (arr) => {
  return [...new Set(arr)];
};

module.exports = {
  mapUserData,
  mapUserHobbiesData,
  removeDuplicates,
};
