/*
   Servidor Node.Js
*/

const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const { PORT } = require('./config.js');

const authMiddleware = require('./middlewares/authMiddleware');
const authRoutes = require('./routes/authRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const selectRoutes = require('./routes/selectRoutes');
const formRoutes = require('./routes/formRoutes');
const resultRoutes = require('./routes/resultRoutes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: '4ybhty6qFFDfcwp',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 3 * 60 * 60 * 1000 } // 3 horas
}));

app.use('/', authRoutes);
app.use('/', sessionRoutes);
app.use('/api', selectRoutes);
app.use('/api', formRoutes);
app.use('/api', resultRoutes);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/:page', authMiddleware.isAuthenticated, (req, res, next) => {
  const page = req.params.page;


  if (!page.endsWith('.html')) return next();

  const filePath = path.join(__dirname, 'views', page);
  res.sendFile(filePath);
});


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
