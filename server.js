/*
   Servidor Node.Js
*/

const {PORT} = require('./config.js');

const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const authMiddleware = require('./middlewares/authMiddleware');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: '4ybhty6qFFDfcwp',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 3*60*60*1000 }
}));

app.use(express.json());


const authRoutes = require('./routes/authRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const selectRoutes = require('./routes/selectRoutes');
const formRoutes = require('./routes/formRoutes');
const resultRoutes = require('./routes/resultRoutes');

app.use('/', authRoutes);
app.use('/', sessionRoutes);
app.use('/api', selectRoutes);
app.use('/api', formRoutes);
app.use('/api', resultRoutes);


app.get('/:page', authMiddleware.isAuthenticated, (req, res) => {
  const page = req.params.page;
  const filePath = path.join(__dirname, 'views', page);
  res.sendFile(filePath);
});

app.get('/forbidden', (req, res) => {
  res.status(403).sendFile(path.join(__dirname, 'views', 'forbidden.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
