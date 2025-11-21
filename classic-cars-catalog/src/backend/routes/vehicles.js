const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Obtener todos los vehículos
router.get('/', async (req, res) => {
  try {
    const [vehicles] = await db.query('SELECT * FROM vehicles ORDER BY year DESC');

    res.json({
      success: true,
      data: vehicles
    });
  } catch (error) {
    console.error('Error al obtener vehículos:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener vehículos' 
    });
  }
});

// Obtener vehículo por ID
router.get('/:id', async (req, res) => {
  try {
    const [vehicles] = await db.query(
      'SELECT * FROM vehicles WHERE id = ?',
      [req.params.id]
    );

    if (vehicles.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Vehículo no encontrado' 
      });
    }

    res.json({
      success: true,
      data: vehicles[0]
    });
  } catch (error) {
    console.error('Error al obtener vehículo:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener vehículo' 
    });
  }
});

module.exports = router;