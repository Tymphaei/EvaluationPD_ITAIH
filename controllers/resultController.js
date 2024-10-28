/*
   Controladores para mostrar los resultados
*/

const db = require('../config/dbConfig');

exports.getResults = (req, res) => {
  const sql = `
    SELECT f.form_ID, a.name AS area_nombre, p.name AS tratamiento_nombre, f.date
    FROM formularios f
    JOIN areas a ON f.area_ID = a.area_ID
    JOIN tratamientos p ON f.processing_ID = p.processing_ID
    WHERE f.complete = 1
  `;
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error al obtener las evaluaciones:', err);
      res.status(500).json({error: 'Error al obtener las evaluaciones'});
    } else {
      res.json(result);
    }
  });
};

exports.getGraphs = (req, res) => {
  const formID = req.params.formID;

  const query = `
    SELECT s.evaluation_number, r.percentage
    FROM respuestas r
    JOIN secciones s ON r.section_ID = s.section_ID
    WHERE s.form_ID = ?
    ORDER BY s.evaluation_number;
  `;

  db.query(query, [formID], (err, results) => {
    if (err) {
      return res.status(500).json({error: err.message});
    }
    res.json(results);
  });
};

