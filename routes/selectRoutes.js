/*
   Rutas para las areas y tratamientos
*/

const express = require('express');
const router = express.Router();
const selectController = require('../controllers/selectController');

router.get('/areas', selectController.getAreas);
router.get('/tratamientos', selectController.getTratamientos);
router.get('/evaluaciones', selectController.getEvaluaciones)
router.get('/obtener-max-evaluacion/:form_ID', selectController.getMaxEvaluationNumber);

router.post('/areas', selectController.addArea);
router.post('/tratamientos', selectController.addTratamiento);

router.delete('/areas/:area_id', selectController.deleteArea);
router.delete('/tratamientos/:processing_id', selectController.deleteTratamiento);


module.exports = router;

