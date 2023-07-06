const fs =require( "fs")

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

function generateId() {
  const users = readUsers();
  if (users.length) {
    return users[users.length - 1].id + 1;
  } else {
    return 1;
  }
}

function getAllUsers(req, res) {
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
    id: generateId(),
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

  if (!name || !age || !gender) {
    res.status(400).json({ error: 'Name, age, and gender are required' });
    return;
  }

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
  const userIndex = users.findIndex(user => user.id === userId);

  if (userIndex === -1) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  users.splice(userIndex, 1);
  writeUsers(users);

  res.sendStatus(204);
}

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  activateUser,
  deleteUser,
};
