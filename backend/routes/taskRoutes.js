// Este archivo define las rutas relacionadas con las tareas.
// La ruta POST / crea una nueva tarea y requiere autenticación.
// La ruta GET / obtiene todas las tareas del usuario autenticado y también requiere autenticación.
// Estas rutas utilizan el middleware de autenticación para asegurar que solo los usuarios autenticados puedan acceder a ellas.
// El controlador `taskController` maneja la lógica de creación y obtención de tareas.

// Routes task
const express = require('express');
const router = express.Router();
const { createTask, getTasks } = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

// Ruta para crear una nueva tarea
// POST /api/tasks
router.post('/', authMiddleware, createTask);
// Ruta para obtener todas las tareas del usuario autenticado
// GET /api/tasks
router.get('/', authMiddleware, getTasks);

// Exportamos el router para usarlo en otros archivos
module.exports = router;
