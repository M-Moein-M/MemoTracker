const express = require('express');
require('dotenv').config();

// setting up app
const app = express();
app.use(express.static('./../forntend/public'));

// html form middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});

// connect database
const { User, createUser, findUser } = require('./database');
