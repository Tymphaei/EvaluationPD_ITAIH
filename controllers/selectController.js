/*
   Controladores para añadir areas y tratamientos
*/

const db = require('../config/dbConfig');

exports.getEvaluaciones = async (req, res) => {
  const username = req.session.username;

  const sql = `
    SELECT f.form_ID, a.name AS area_nombre, p.name AS tratamiento_nombre, f.date
    FROM formularios f
    JOIN areas a ON f.area_ID = a.area_ID
    JOIN tratamientos p ON f.processing_ID = p.processing_ID
    WHERE f.complete = 0 AND a.user_ID = ?
  `;
  try {
    const [result] = await db.query(sql, [username]);
    res.json(result);
  } catch (err) {
    console.error('Error al obtener las evaluaciones:', err);
    res.status(500).json({ error: 'Error al obtener las evaluaciones' });
  }
};

exports.getMaxEvaluationNumber = async (req, res) => {
  const { form_ID } = req.params;

  const sql = `
    SELECT MAX(evaluation_number) AS maxEvaluationNumber
    FROM secciones
    WHERE form_ID = ?
  `;

  try {
    const [result] = await db.query(sql, [form_ID]);
    res.json(result[0]);
  } catch (err) {
    console.error('Error al obtener el evaluation_number máximo:', err);
    res.status(500).json({ error: 'Error al obtener el evaluation_number' });
  }
};

exports.getAreas = async (req, res) => {
  const username = req.session.username;

  const sql = 'SELECT area_ID, name FROM areas WHERE user_ID = ?';
  try {
    const [result] = await db.query(sql, [username]);
    res.json(result);
    console.log(result);
  } catch (err) {
    console.error('Error al obtener áreas:', err);
    res.status(500).json({ error: 'Error al obtener áreas' });
  }
};

exports.getTratamientos = async (req, res) => {
  const username = req.session.username;

  const sql = 'SELECT processing_ID, name FROM tratamientos WHERE user_ID = ?';
  try {
    const [result] = await db.query(sql, [username]);
    res.json(result);
    console.log(result);
  } catch (err) {
    console.error('Error al obtener tratamientos:', err);
    res.status(500).json({ error: 'Error al obtener tratamientos' });
  }
};

exports.addArea = async (req, res) => {
  const { name } = req.body;
  const username = req.session.username;

  if (!name) {
    return res.status(400).json({ message: 'El nombre no puede estar vacío.' });
  }

  const checkSql = 'SELECT * FROM areas WHERE name = ? AND user_ID = ?';
  try {
    const [result] = await db.query(checkSql, [name, username]);

    if (result.length > 0) {
      return res.status(409).json({ message: 'El área ya existe.' });
    }

    const insertSql = 'INSERT INTO areas (name, user_id) VALUES (?, ?)';
    const [insertResult] = await db.query(insertSql, [name, username]);
    res.json({ message: 'Área añadida', id: insertResult.insertId });
  } catch (err) {
    console.error('Error al añadir área:', err);
    res.status(500).json({ error: 'Error al añadir área' });
  }
};

exports.addTratamiento = async (req, res) => {
  const { name } = req.body;
  const username = req.session.username;

  if (!name) {
    return res.status(400).json({ message: 'El nombre no puede estar vacío.' });
  }

  const checkSql = 'SELECT * FROM tratamientos WHERE name = ? AND user_ID = ?';
  try {
    const [result] = await db.query(checkSql, [name, username]);

    if (result.length > 0) {
      return res.status(409).json({ message: 'El tratamiento ya existe.' });
    }

    const insertSql = 'INSERT INTO tratamientos (name, user_id) VALUES (?, ?)';
    const [insertResult] = await db.query(insertSql, [name, username]);
    res.json({ message: 'Tratamiento añadido', id: insertResult.insertId });
  } catch (err) {
    console.error('Error al añadir tratamiento:', err);
    res.status(500).json({ error: 'Error al añadir tratamiento' });
  }
};

exports.deleteArea = async (req, res) => {
  const { area_id } = req.params;

  if (!area_id) {
    return res.status(400).json({ message: 'ID de area no válido' });
  }

  const sql = 'DELETE FROM areas WHERE area_id = ?';
  try {
    const [result] = await db.query(sql, [area_id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Área no encontrada' });
    }

    res.json({ message: 'Área eliminada' });
  } catch (err) {
    console.error('Error al eliminar área:', err);
    res.status(500).json({ error: 'Error al eliminar área' });
  }
};

exports.deleteTratamiento = async (req, res) => {
  const { processing_id } = req.params;

  if (!processing_id) {
    return res.status(400).json({ message: 'ID de tratamiento no válido' });
  }

  const sql = 'DELETE FROM tratamientos WHERE processing_id = ?';
  try {
    const [result] = await db.query(sql, [processing_id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Tratamiento no encontrado' });
    }

    res.json({ message: 'Tratamiento eliminado' });
  } catch (err) {
    console.error('Error al eliminar tratamiento:', err);
    res.status(500).json({ error: 'Error al eliminar tratamiento' });
  }
};
