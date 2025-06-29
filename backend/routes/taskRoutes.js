// Este archivo define todas las rutas relacionadas con tareas.
// Cada ruta está protegida con el middleware de autenticación JWT (`authMiddleware`).
// El controlador maneja la lógica de cada operación sobre tareas.

const express = require('express');
const router = express.Router();
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

// Ruta para crear una nueva tarea
// POST /api/tasks
router.post('/', authMiddleware, createTask);

// Ruta para obtener todas las tareas del usuario autenticado
// GET /api/tasks
router.get('/', authMiddleware, getTasks);

// Ruta para actualizar una tarea específica por ID
// PUT /api/tasks/:id
router.put('/:id', authMiddleware, updateTask);

// Ruta para eliminar una tarea específica por ID
// DELETE /api/tasks/:id
router.delete('/:id', authMiddleware, deleteTask);

// Exporta el router para usarlo en app.js
module.exports = router;
