/*
   Controladores para la autenticación y obtencion de datos del usuario autenticado
*/

const bcrypt = require('bcryptjs');
const connection = require('../config/dbConfig');

const authController = {
  validateUser: (req, res) => {
    const {username, password} = req.body;

    const userQuery = 'SELECT * FROM usuarios WHERE username = ?';
    connection.query(userQuery, [username], (err, userResults) => {
      if (err) {
        console.error('Error en la consulta:', err);
        return res.status(500).json({success: false, message: 'Error en el servidor'});
      }

      if (userResults.length === 0) {
        return res.json({success: false, field: 'username', message: 'Usuario no encontrado'});
      }

      const user = userResults[0];
      if (!bcrypt.compareSync(password, user.password)) {
        return res.json({success: false, field: 'password', message: 'Contraseña incorrecta'});
      }

      req.session.name = user.name;
      req.session.username = user.username;
      req.session.authenticated = true;
      res.json({success: true});
    });
  },

  getUsername: (req, res) => {
    if (req.session && req.session.name) {
      res.json({name: req.session.name});
    } else {
      res.status(401).json({error: 'No authenticated'});
    }
  },
};

module.exports = authController;
