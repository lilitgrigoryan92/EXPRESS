const express=require("express") 
const app = express();
const UserController=require('../controllers/UserController') 

const useApi = (req, res, next) => {
  const apiKey = req.headers['api-key'];
  if (apiKey && apiKey === '456') {
    next();
  } else {
    res.status(401).json({ error: 'Incorrect API key' });
  }
};

app.get('/', useApi, UserController.getUsers);
app.post('/', useApi, UserController.createUser);
app.put('/:id', useApi, UserController.updateUser);
app.patch('/:id/activate', useApi, UserController.activateUser);
app.delete('/:id', useApi, UserController.deleteUser);

module.exports = app;
