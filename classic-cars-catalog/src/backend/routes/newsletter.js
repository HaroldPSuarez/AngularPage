
const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Suscribirse al newsletter
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;

    const [result] = await db.query(
      'INSERT INTO newsletter_subscribers (email) VALUES (?) ON DUPLICATE KEY UPDATE is_active = TRUE',
      [email]
    );

    res.status(201).json({
      success: true,
      message: 'Suscripción exitosa'
    });
  } catch (error) {
    console.error('Error en suscripción:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al suscribirse' 
    });
  }
});

module.exports = router;