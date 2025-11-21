const express = require('express');
const router = express.Router();
const db = require('../config/database');
const authMiddleware = require('../middleware/auth');

// Obtener favoritos del usuario
router.get('/', authMiddleware, async (req, res) => {
  try {
    const [favorites] = await db.query(
      `SELECT v.*, f.id as favorite_id, f.created_at as favorited_at
       FROM favorites f
       JOIN vehicles v ON f.vehicle_id = v.id
       WHERE f.user_id = ?
       ORDER BY f.created_at DESC`,
      [req.user.id]
    );

    res.json({
      success: true,
      data: favorites
    });
  } catch (error) {
    console.error('Error al obtener favoritos:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener favoritos' 
    });
  }
});

// Agregar a favoritos
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { vehicleId } = req.body;

    const [result] = await db.query(
      'INSERT INTO favorites (user_id, vehicle_id) VALUES (?, ?)',
      [req.user.id, vehicleId]
    );

    res.status(201).json({
      success: true,
      message: 'Vehículo agregado a favoritos',
      favoriteId: result.insertId
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ 
        success: false, 
        message: 'Este vehículo ya está en favoritos' 
      });
    }
    console.error('Error al agregar favorito:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al agregar favorito' 
    });
  }
});

// Eliminar de favoritos
router.delete('/:vehicleId', authMiddleware, async (req, res) => {
  try {
    const [result] = await db.query(
      'DELETE FROM favorites WHERE user_id = ? AND vehicle_id = ?',
      [req.user.id, req.params.vehicleId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Favorito no encontrado' 
      });
    }

    res.json({
      success: true,
      message: 'Vehículo eliminado de favoritos'
    });
  } catch (error) {
    console.error('Error al eliminar favorito:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al eliminar favorito' 
    });
  }
});

// Verificar si es favorito
router.get('/check/:vehicleId', authMiddleware, async (req, res) => {
  try {
    const [favorites] = await db.query(
      'SELECT id FROM favorites WHERE user_id = ? AND vehicle_id = ?',
      [req.user.id, req.params.vehicleId]
    );

    res.json({
      success: true,
      isFavorite: favorites.length > 0
    });
  } catch (error) {
    console.error('Error al verificar favorito:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al verificar favorito' 
    });
  }
});

module.exports = router;