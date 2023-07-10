
const fs = require("fs");

const path = './users.json';

function readUsers() {
  try {
    const data = fs.readFileSync(path, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function writeUsers(users) {
  fs.writeFileSync(path, JSON.stringify(users, null, 2), 'utf8');
}

module.exports = {
  readUsers,
  writeUsers
};