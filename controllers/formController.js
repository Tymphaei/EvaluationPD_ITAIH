/*
   Controladores para los formularios de las evaluaciones
*/

const db = require('../config/dbConfig');

exports.addAnswer = (req, res) => {
  const {secDetails, respuestas} = req.body;
  console.log(req.body);

  const queryFormulario = 'INSERT INTO secciones (evaluation_number, form_ID) VALUES (?,?)';
  db.query(queryFormulario, [secDetails.evaluation_number, secDetails.form_ID], (err, result) => {
    if (err) {
      console.error('Error al guardar la sección:', err);
      return res.status(500).send('Error al guardar la sección');
    }

    const section_ID = result.insertId;

    const queryRespuestas = 'INSERT INTO respuestas (section_ID, percentage, response, evidence, actions) VALUES ?';
    const respuestasValores = respuestas.map(respuesta => [section_ID, respuesta.porcentaje, respuesta.respuesta, respuesta.evidencia, respuesta.acciones]);

    db.query(queryRespuestas, [respuestasValores], (err, result) => {
      if (err) {
        console.error('Error al guardar las respuestas:', err);
        return res.status(500).send('Error al guardar las respuestas');
      }
      res.status(200).json({success: true, message: 'Sección y respuestas guardados exitosamente'});
    });
  });
};

exports.addForm = (req, res) => {
  const {formDetails} = req.body;
  console.log(req.body);

  const queryFormulario = 'INSERT INTO formularios (area_ID, processing_ID, complete) VALUES (?, ?, ?)';
  db.query(queryFormulario, [formDetails.area_ID, formDetails.processing_ID, formDetails.complete], (err, result) => {
    if (err) {
      console.error('Error al guardar el formulario:', err.message, err.sql);
      return res.status(500).send('Error al guardar el formulario: ' + err.message);
    }

    const formID = result.insertId;
    console.log('respuestas id formController: ', formID);

    res.status(200).json({formID});
  });
};

exports.marcarFormularioCompleto = (req, res) => {
  const form_ID = req.params.form_ID;

  const sql = 'UPDATE formularios SET complete = 1 WHERE form_ID = ?';

  db.query(sql, [form_ID], (err, result) => {
    if (err) {
      console.error('Error al marcar el formulario como completo:', err);
      res.status(500).json({success: false, message: 'Error al actualizar el formulario'});
    } else {
      res.json({success: true});
    }
  });
};
