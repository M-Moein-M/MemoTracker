// loading .env file configs
require('dotenv').config();
const path = require('path');

const express = require('express');

// for session store
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('express-flash');

// handlebars
const exhbs = require('express-handlebars');

// setting up app
const app = express();
app.use(express.static('./../frontend/public'));

// html form middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});

// connect database
const temp = require('./database');

// session store
const store = new MongoDBStore({
  uri: process.env.SESSION_DB_URI,
  collection: 'Session',
});

// catch session store errors
store.on('error', function (error) {
  console.log(error);
});

app.use(flash());
app.use(
  session({
    secret: process.env.SECRET || 'skyisgettingdarker',
    resave: true,
    saveUninitialized: true,
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
  })
);

// passport
const passport = require('passport');

// passport initialization
require('./passport-config')(passport);

module.exports = { passport };

app.use(passport.initialize());
app.use(passport.session());

// handlebar
app.engine('handlebars', exhbs());
app.set('view engine', 'handlebars');

// routes
app.use('/', require('./routes/index.js'));
app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));
app.use('/memo', require('./routes/memo'));

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});
