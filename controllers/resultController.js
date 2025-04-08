/*
   Controladores para mostrar los resultados
*/

const db = require('../config/dbConfig');

exports.getResults = async (req, res) => {
  const username = req.session.username;
  const sql = `
    SELECT f.form_ID, a.name AS area_nombre, p.name AS tratamiento_nombre, f.date
    FROM formularios f
    JOIN areas a ON f.area_ID = a.area_ID
    JOIN tratamientos p ON f.processing_ID = p.processing_ID
    WHERE f.complete = 1 AND a.user_ID = ?
  `;

  try {
    const [result] = await db.query(sql,[username]);
    res.json(result);
  } catch (err) {
    console.error('Error al obtener las evaluaciones:', err);
    res.status(500).json({ error: 'Error al obtener las evaluaciones' });
  }
};

exports.getGraphs = async (req, res) => {
  const formID = req.params.formID;

  const query = `
    SELECT s.evaluation_number, r.percentage
    FROM respuestas r
    JOIN secciones s ON r.section_ID = s.section_ID
    WHERE s.form_ID = ?
    ORDER BY s.evaluation_number;
  `;

  try {
    const [results] = await db.query(query, [formID]);
    res.json(results);
  } catch (err) {
    console.error('Error al obtener los gráficos:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getResponsesByFormId = async (req, res) => {
  const formID = req.params.formID;
  const sql = `
    SELECT r.percentage, r.response, r.evidence, r.actions
    FROM respuestas r
    JOIN secciones s ON r.section_ID = s.section_ID
    WHERE s.form_ID = ?
  `;

  try {
    const [result] = await db.query(sql,[formID]);
    res.json(result);
  } catch (err) {
    console.error('Error al obtener los datos de la evaluación:', err);
    res.status(500).json({ error: 'Error al obtener los datos de la evaluación' });
  }
};

exports.getSectionProgress = async (req, res) => {
  if (!req.session || !req.session.username) {
    return res.status(401).json({ success: false, message: 'Usuario no autenticado' });
  }
  const username = req.session.username;

  try {
    const [data] = await db.query(
      `SELECT f.form_ID, f.date, s.evaluation_number AS section, r.percentage * 25 AS percentage
       FROM formularios f
       JOIN secciones s ON f.form_ID = s.form_ID
       JOIN respuestas r ON s.section_ID = r.section_ID
       JOIN areas a ON f.area_ID = a.area_ID
       WHERE a.user_ID = ?
       ORDER BY s.evaluation_number, f.date`,
      [username]
    );

    res.json({ success: true, data });

  } catch (err) {
    console.error('Error al obtener el progreso por sección:', err);
    res.status(500).json({ success: false, message: 'Error al obtener el progreso por sección' });
  }
};
