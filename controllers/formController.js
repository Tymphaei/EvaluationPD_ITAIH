/*
   Controladores para los formularios de las evaluaciones
*/

const db = require('../config/dbConfig');

exports.addAnswer = async (req, res) => {
  const { secDetails, respuestas } = req.body;


  const queryFormulario = 'INSERT INTO secciones (evaluation_number, form_ID) VALUES (?,?)';

  try {
    const [result] = await db.query(queryFormulario, [secDetails.evaluation_number, secDetails.form_ID]);
    const section_ID = result.insertId;

    const queryRespuestas = 'INSERT INTO respuestas (section_ID, percentage, response, evidence, actions) VALUES ?';
    const respuestasValores = respuestas.map(respuesta => [section_ID, respuesta.porcentaje, respuesta.respuesta, respuesta.evidencia, respuesta.acciones]);

    await db.query(queryRespuestas, [respuestasValores]);
    res.status(200).json({ success: true, message: 'Sección y respuestas guardados exitosamente' });
  } catch (err) {
    console.error('Error al guardar la sección o las respuestas:', err);
    res.status(500).send('Error al guardar la sección o las respuestas');
  }
};

exports.addForm = async (req, res) => {
  const { formDetails } = req.body;


  const queryFormulario = 'INSERT INTO formularios (area_ID, processing_ID, complete) VALUES (?, ?, ?)';

  try {
    const [result] = await db.query(queryFormulario, [formDetails.area_ID, formDetails.processing_ID, formDetails.complete]);
    const formID = result.insertId;
    console.log('respuestas id formController: ', formID);

    res.status(200).json({ formID });
  } catch (err) {
    console.error('Error al guardar el formulario:', err.message);
    res.status(500).send('Error al guardar el formulario: ' + err.message);
  }
};

exports.marcarFormularioCompleto = async (req, res) => {
  const form_ID = req.params.form_ID;

  const sql = 'UPDATE formularios SET complete = 1 WHERE form_ID = ?';

  try {
    const [result] = await db.query(sql, [form_ID]);
    res.json({ success: true });
  } catch (err) {
    console.error('Error al marcar el formulario como completo:', err);
    res.status(500).json({ success: false, message: 'Error al actualizar el formulario' });
  }
};

exports.eliminarFormulariosSinSecciones = async (req, res) => {
  const sql = `
    DELETE FROM formularios
    WHERE form_ID NOT IN (SELECT DISTINCT form_ID FROM secciones);
  `;

  try {
    const [result] = await db.query(sql);
    res.json({ success: true, deletedRows: result.affectedRows });
  } catch (err) {
    console.error('Error al eliminar formularios sin secciones:', err);
    res.status(500).json({ success: false, message: 'Error al eliminar formularios sin secciones' });
  }
};
