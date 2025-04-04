/*
   Rutas para los formularios de la evaluación
*/

const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');

router.post('/guardar-evaluacion', formController.addAnswer);
router.post('/crear-formulario', formController.addForm);
router.put('/marcar-formulario-completo/:form_ID', formController.marcarFormularioCompleto);
router.delete('/eliminar-formularios-huerfanos', formController.eliminarFormulariosSinSecciones);


module.exports = router;
