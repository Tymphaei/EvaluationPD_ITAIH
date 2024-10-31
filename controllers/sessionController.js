/*
   Controlador para la sesión
*/

const sessionController = {
  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error al cerrar la sesión:', err);
        return res.status(500).json({ error: 'Error al cerrar la sesión' });
      }
      res.redirect('/index.html');
    });
  },
};

module.exports = sessionController;
