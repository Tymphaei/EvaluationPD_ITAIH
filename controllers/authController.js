/*
   Controladores para la autenticación y obtención de datos del usuario autenticado
*/

const bcrypt = require('bcryptjs');
const db = require('../config/dbConfig');

const authController = {
  validateUser: async (req, res) => {
    const { username, password } = req.body;

    try {
      const [userResults] = await db.query('SELECT * FROM usuarios WHERE username = ?', [username]);

      if (userResults.length === 0) {
        return res.json({ success: false, field: 'username', message: 'Usuario no encontrado' });
      }

      const user = userResults[0];
      if (!bcrypt.compareSync(password, user.password)) {
        return res.json({ success: false, field: 'password', message: 'Contraseña incorrecta' });
      }

      // Establece la sesión
      req.session.name = user.name;
      req.session.username = user.username;
      req.session.authenticated = true;
      res.json({ success: true });

    } catch (err) {
      console.error('Error en la consulta:', err);
      res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
  },

  getUsername: (req, res) => {
    if (req.session && req.session.name) {
      res.json({ name: req.session.name });
    } else {
      res.status(401).json({ error: 'No authenticated' });
    }
  },

  getUserProfile: async (req, res) => {
    if (!req.session || !req.session.username) {
      return res.status(401).json({ success: false, message: 'Usuario no autenticado' });
    }

    try {
      const [results] = await db.query(
        'SELECT name, username, address, email FROM usuarios WHERE username = ?',
        [req.session.username]
      );

      if (results.length === 0) {
        return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
      }

      res.json({ success: true, data: results[0] });

    } catch (err) {
      console.error('Error en la consulta del perfil:', err);
      res.status(500).json({ success: false, message: 'Error del servidor' });
    }
  },

  getFormData: async (req, res) => {
    const { form_ID } = req.query;

    try {
      const [formResults] = await db.query(
        `SELECT f.date, a.name AS area, t.name AS tratamiento
         FROM formularios f
         JOIN areas a ON f.area_ID = a.area_ID
         JOIN tratamientos t ON f.processing_ID = t.processing_ID
         WHERE f.form_ID = ?`,
        [form_ID]
      );


      if (formResults.length === 0) {
        return res.status(404).json({ success: false, message: 'Formulario no encontrado' });
      }

      res.json({ success: true, data: formResults[0] });

    } catch (err) {
      console.error('Error en la consulta:', err);
      res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
  },
};

module.exports = authController;
