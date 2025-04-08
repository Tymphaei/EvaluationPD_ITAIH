/*
   Rutas para la sesión
*/

const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');

router.get('/logout', sessionController.logout);

module.exports = router;
