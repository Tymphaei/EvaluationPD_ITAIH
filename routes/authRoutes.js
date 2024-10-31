/*
   Rutas para la autenticación
*/

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/validate', authController.validateUser);
router.get('/get-form-data', authController.getFormData);
router.get('/get-name', authController.getUsername);

module.exports = router;
