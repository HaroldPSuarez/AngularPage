const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Crear cotización
router.post('/', async (req, res) => {
  try {
    const { service, name, email, phone, carModel, message } = req.body;

    const [result] = await db.query(
      'INSERT INTO quotes (service, name, email, phone, car_model, message) VALUES (?, ?, ?, ?, ?, ?)',
      [service, name, email, phone, carModel || null, message]
    );

    res.status(201).json({
      success: true,
      message: 'Cotización enviada exitosamente',
      quoteId: result.insertId
    });
  } catch (error) {
    console.error('Error al crear cotización:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al enviar cotización' 
    });
  }
});

// Obtener todas las cotizaciones
router.get('/', async (req, res) => {
  try {
    const [quotes] = await db.query(
      'SELECT * FROM quotes ORDER BY created_at DESC'
    );

    res.json({
      success: true,
      data: quotes
    });
  } catch (error) {
    console.error('Error al obtener cotizaciones:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener cotizaciones' 
    });
  }
});

module.exports = router;