/*
   Controlador para la sesión
*/

const sessionController = {
  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error al cerrar la sesión:', err);
      }
      res.redirect('/index.html');
    });
  },
};

module.exports = sessionController;
