/*
   Controladores para añadir areas y tratamientos
*/

const db = require('../config/dbConfig');

exports.getEvaluaciones = (req, res) => {
  const username = req.session.username;

  const sql = `
    SELECT f.form_ID, a.name AS area_nombre, p.name AS tratamiento_nombre, f.date
    FROM formularios f
    JOIN areas a ON f.area_ID = a.area_ID
    JOIN tratamientos p ON f.processing_ID = p.processing_ID
    WHERE f.complete = 0 AND a.user_ID = ?
  `;
  db.query(sql, [username],(err, result) => {
    if (err) {
      console.error('Error al obtener las evaluaciones:', err);
      res.status(500).json({error: 'Error al obtener las evaluaciones'});
    } else {
      res.json(result);
    }
  });
};

exports.getMaxEvaluationNumber = (req, res) => {
  const {form_ID} = req.params;

  const sql = `
    SELECT MAX(evaluation_number) AS maxEvaluationNumber
    FROM secciones
    WHERE form_ID = ?
  `;

  db.query(sql, [form_ID], (err, result) => {
    if (err) {
      console.error('Error al obtener el evaluation_number máximo:', err);
      res.status(500).json({error: 'Error al obtener el evaluation_number'});
    } else {
      res.json(result[0]);
    }
  });
};

exports.getAreas = (req, res) => {
  const username = req.session.username;

  let sql = 'SELECT area_ID, name FROM areas WHERE user_ID = ?';
  db.query(sql, [username],(err, result) => {
    if (err) throw err;
    res.json(result);
    console.log(result);
  });
};

exports.getTratamientos = (req, res) => {
  const username = req.session.username;

  let sql = 'SELECT processing_ID, name FROM tratamientos WHERE user_ID = ?';
  db.query(sql, [username],(err, result) => {
    if (err) throw err;
    res.json(result);
    console.log(result);
  });
};

exports.addArea = (req, res) => {
  const {name} = req.body;
  const username = req.session.username;

  if (!name) {
    return res.status(400).json({message: 'El nombre no puede estar vacío.'});
  }

  let checkSql = 'SELECT * FROM areas WHERE name = ?';
  db.query(checkSql, [name], (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      return res.status(409).json({message: 'El área ya existe.'});
    }

    let sql = 'INSERT INTO areas (name, user_id) VALUES (?, ?)';
    db.query(sql, [name, username], (err, result) => {
      if (err) throw err;
      res.json({message: 'Área añadida', id: result.insertId});
    });
  });
};

exports.addTratamiento = (req, res) => {
  const {name} = req.body;
  const username = req.session.username;

  if (!name) {
    return res.status(400).json({message: 'El nombre no puede estar vacío.'});
  }

  let checkSql = 'SELECT * FROM tratamientos WHERE name = ?';
  db.query(checkSql, [name], (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      return res.status(409).json({message: 'El tratamiento ya existe.'});
    }

    let sql = 'INSERT INTO tratamientos (name, user_id) VALUES (?, ?)';
    db.query(sql, [name, username], (err, result) => {
      if (err) throw err;
      res.json({message: 'Tratamiento añadido', id: result.insertId});
    });
  });
};


exports.deleteArea = (req, res) => {
  const {area_id} = req.params;

  if (!area_id) {
    return res.status(400).json({message: 'ID de area no válido'});
  }

  let sql = 'DELETE FROM areas WHERE area_id = ?';
  db.query(sql, [area_id], (err, result) => {
    if (err) {
      console.error('Error al eliminar el area:', err);
      return res.status(500).json({message: 'Error al eliminar el area'});
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({message: 'Area no encontrada'});
    }

    res.json({message: 'Area eliminada'});
  });
};


exports.deleteTratamiento = (req, res) => {
  const {processing_id} = req.params;

  if (!processing_id) {
    return res.status(400).json({message: 'ID de tratamiento no válido'});
  }

  let sql = 'DELETE FROM tratamientos WHERE processing_id = ?';
  db.query(sql, [processing_id], (err, result) => {
    if (err) {
      console.error('Error al eliminar el tratamiento:', err);
      return res.status(500).json({message: 'Error al eliminar el tratamiento'});
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({message: 'Tratamiento no encontrado'});
    }

    res.json({message: 'Tratamiento eliminado'});
  });
};

