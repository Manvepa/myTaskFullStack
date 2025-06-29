// Archivo de rutas de autenticación

// Importamos express para crear el router
const express = require('express');
// y manejar las rutas de autenticación
const router = express.Router();
// Importamos el controlador de autenticación
const { registerUser, loginUser } = require('../controllers/authController');
// Importamos el middleware de autenticación
const authMiddleware = require('../middleware/authMiddleware');

// Definimos las rutas de autenticación
// Ruta para verificar si el usuario está autenticado
// Ruta: GET /api/auth/profile
router.get('/profile', authMiddleware, (req, res) => {
  res.json({
    message: 'Ruta protegida',
    user: req.user // Esto viene del token decodificado
  });
});
// Esta ruta es para registrar un nuevo usuario
// y se encargará de recibir los datos del usuario, validarlos,

// Ruta para registrar un nuevo usuario
// Ruta: POST /api/auth/register
router.post('/register', registerUser); 
// Ruta para iniciar sesión
router.post('/login', loginUser);

// Exportamos el router para usarlo en otros archivos
module.exports = router;