const express = require('express');
const bodyParser = require('body-parser');
const users = require('./routes/users');
const { conn } = require('./config/MongoDB');
const app = express();
const PORT =  3000;

app.use(bodyParser.json());

app.use('/api', users);
// conn();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
