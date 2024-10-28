/*
   Middleware de autenticación
*/

const authMiddleware = {
  isAuthenticated: (req, res, next) => {
    if (req.session.authenticated) {
      return next();
    } else {
      res.redirect('/');
    }
  },
};

module.exports = authMiddleware;
