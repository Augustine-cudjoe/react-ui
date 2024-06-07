const express = require('express');
const path = require('path');
const jsonServer = require('json-server');
const sequelize = require('./db');
const User = require('./models/User');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

// Use json-server to serve the db.json
const router = jsonServer.router('db.json');
app.use('/api', router);

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.post('/users', async (req, res) => {
  const newUser = await User.create(req.body);
  res.json(newUser);
});

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
