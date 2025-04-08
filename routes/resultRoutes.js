/*
   Rutas para los resultados
*/

const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController');

router.get('/resultados', resultController.getResults);
router.get('/graficas/:formID', resultController.getGraphs)
router.get('/responses/:formID', resultController.getResponsesByFormId)
router.get('/progreso-secciones', resultController.getSectionProgress);

module.exports = router;
