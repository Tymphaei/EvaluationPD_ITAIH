/*
   Rutas para la sesión
*/

const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');
const authMiddleware = require('../middlewares/authMiddleware');
const path = require('path');

router.get('/logout', sessionController.logout);

module.exports = router;
