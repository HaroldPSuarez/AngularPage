const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Crear contacto
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message, interestedCar } = req.body;

    const [result] = await db.query(
      'INSERT INTO contacts (name, email, phone, message, interested_car) VALUES (?, ?, ?, ?, ?)',
      [name, email, phone, message, interestedCar || null]
    );

    res.status(201).json({
      success: true,
      message: 'Contacto enviado exitosamente',
      contactId: result.insertId
    });
  } catch (error) {
    console.error('Error al crear contacto:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al enviar contacto' 
    });
  }
});

// Obtener todos los contactos (admin)
router.get('/', async (req, res) => {
  try {
    const [contacts] = await db.query(
      'SELECT * FROM contacts ORDER BY created_at DESC'
    );

    res.json({
      success: true,
      data: contacts
    });
  } catch (error) {
    console.error('Error al obtener contactos:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener contactos' 
    });
  }
});

module.exports = router;