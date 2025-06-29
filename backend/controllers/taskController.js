// Este controlador maneja la creación y obtención de tareas.
// La función `createTask` permite a un usuario autenticado crear una nueva tarea,
// mientras que `getTasks` recupera todas las tareas del usuario autenticado.

const Task = require('../models/Task'); // Importa el modelo de Tarea

// Función para crear una nueva tarea
const createTask = async (req, res) => {
  try {
    // Extrae los datos de la tarea del cuerpo de la solicitud
    const { title, description, time, date } = req.body;

    // Verifica que todos los campos necesarios estén presentes
    if (!title || !description || !time || !date) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Obtiene el ID del usuario autenticado desde req.user
    // (este valor es proporcionado por el middleware de autenticación JWT)
    const userId = req.user.id;

    // Crea una nueva tarea con los datos proporcionados
    const newTask = new Task({
      user: userId,       // Relación con el usuario que crea la tarea
      title,              // Título de la tarea
      description,        // Descripción de la tarea
      time,               // Hora asignada
      date                // Fecha asignada
    });

    await newTask.save(); // Guarda la tarea en la base de datos

    // Responde con éxito y la tarea creada
    res.status(201).json({ message: 'Tarea creada exitosamente', task: newTask });
  } catch (error) {
    console.error('❌ Error al crear tarea:', error);
    // Maneja errores internos
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Función para obtener todas las tareas del usuario autenticado
const getTasks = async (req, res) => {
  try {
    // Obtiene el ID del usuario autenticado desde req.user
    const userId = req.user.id;

    // Busca todas las tareas del usuario autenticado
    // `.populate()` permite incluir datos del usuario (nombre y correo) en cada tarea
    const tasks = await Task.find({ user: userId }).populate('user', 'name email');

    // Responde con las tareas encontradas
    res.status(200).json(tasks);
  } catch (error) {
    console.error('❌ Error al obtener tareas:', error);
    // Maneja errores internos
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Exporta las funciones del controlador para usarlas en las rutas
module.exports = { createTask, getTasks };
