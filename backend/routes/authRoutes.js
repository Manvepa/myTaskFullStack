// Archivo de rutas de autenticación

// Importamos express para crear el router
const express = require('express');
// y manejar las rutas de autenticación
const router = express.Router();
// Importamos el controlador de autenticación
const { registerUser, loginUser } = require('../controllers/authController');

// Ruta para registrar un nuevo usuario
// Ruta: POST /api/auth/register
router.post('/register', registerUser); 
// Ruta para iniciar sesión
router.post('/login', loginUser);

// Exportamos el router para usarlo en otros archivos
module.exports = router;