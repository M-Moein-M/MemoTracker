const mongoose = require('mongoose');
const userSchema = require('./userSchema');
const User = mongoose.model('User', userSchema);
require('dotenv').config();

mongoose.connect(process.env.DB_CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const connector = mongoose.connection;
connector.on('error', (err) => console.error(err));
connector.once('open', () => console.log('MongoDB is connected'));

async function createUser(newUser) {
  await new User(newUser).save();
}

async function findUser(user) {
  return await User.findOne(user);
}

module.exports = { User, createUser, findUser };
