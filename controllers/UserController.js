const fs =require( "fs")

const path = './users.json';

const { readUsers, writeUsers } = require('../services/user.service');


function getId() {
  const users = readUsers();
  if (users.length) {
    return users[users.length - 1].id + 1;
  } else {
    return 1;
  }
}

function getUsers(req, res) {
  const users = readUsers();
  res.json(users);
}

function createUser(req, res) {
  const { name, age, gender } = req.body;

  if (!name || !age || !gender) {
    res.status(400).json({ error: 'Name, age, and gender are required' });
    return;
  }

  const newUser = {
    id: getId(),
    name,
    age,
    gender,
    status: false,
    creationTimestamp: new Date().toISOString(),
    modificationTimestamp: new Date().toISOString(),
  };

  const users = readUsers();
  users.push(newUser);
  writeUsers(users);

  res.json(newUser);
}

function updateUser(req, res) {
  const userId = parseInt(req.params.id);
  const { name, age, gender } = req.body;

  

  const users = readUsers();
  const userIndex = users.findIndex(user => user.id === userId);

  if (userIndex === -1) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  users[userIndex] = {
    ...users[userIndex],
    name,
    age,
    gender,
    modificationTimestamp: new Date().toISOString(),
  };

  writeUsers(users);

  res.json(users[userIndex]);
}

function activateUser(req, res) {
  const userId = parseInt(req.params.id);

  const users = readUsers();
  constuserIndex = users.findIndex(user => user.id === userId);

  if (userIndex === -1) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  users[userIndex] = {
    ...users[userIndex],
    status: true,
    modificationTimestamp: new Date().toISOString(),
  };

  writeUsers(users);

  res.json(users[userIndex]);
}

function deleteUser(req, res) {
  const userId = parseInt(req.params.id);

  const users = readUsers();
  const userIndex = users.findIndex(user => user.id === i);

  if (userIndex === -1) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  users.splice(userIndex, 1);
  writeUsers(users);

  res.sendStatus(200);
}

module.exports = {
  getUsers,
  createUser,
  updateUser,
  activateUser,
  deleteUser,
};
