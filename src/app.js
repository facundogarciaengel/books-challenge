const express = require('express');
const mainRouter = require('./routes/main');
const session = require('express-session');
const cookies = require('cookie-parser');

const app = express();
 const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware')

app.use(session({
  secret: 'secreto',
  resave: false,
  saveUninitialized: false,
}));

app.use(cookies());

 app.use(userLoggedMiddleware);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use('/', mainRouter);

app.listen(3000, () => {
  console.log('listening in http://localhost:3000');
});
