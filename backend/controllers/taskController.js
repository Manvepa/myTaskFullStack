// Este controlador maneja la creación, obtención, actualización y eliminación de tareas.
// Todas las funciones requieren que el usuario esté autenticado.
// El middleware `authMiddleware` debe haberse ejecutado antes para que `req.user` esté disponible.

const Task = require('../models/Task'); // Importa el modelo de Tarea

// Función para crear una nueva tarea
const createTask = async (req, res) => {
  try {
    // Extrae los datos de la tarea del cuerpo de la solicitud
    const { title, description, time, date, completed = false } = req.body;

    // Verifica que todos los campos necesarios estén presentes
    if (!title || !description || !time || !date) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Obtiene el ID del usuario autenticado desde req.user (lo coloca el middleware JWT)
    const userId = req.user.id;

    // Crea una nueva tarea con los datos proporcionados
    const newTask = new Task({
      user: userId,
      title,
      description,
      time,
      date,
      completed
    });

    await newTask.save(); // Guarda la tarea en la base de datos

    // Responde con éxito y la tarea creada
    res.status(201).json({ message: 'Tarea creada exitosamente', task: newTask });
  } catch (error) {
    console.error('❌ Error al crear tarea:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Función para obtener todas las tareas del usuario autenticado
const getTasks = async (req, res) => {
  try {
    const userId = req.user.id;

    // Busca todas las tareas del usuario y muestra info básica del usuario
    const tasks = await Task.find({ user: userId }).populate('user', 'name email');

    res.status(200).json(tasks);
  } catch (error) {
    console.error('❌ Error al obtener tareas:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Función para actualizar una tarea específica por ID (requiere que sea del usuario autenticado)
const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.id;

    // Solo se permite actualizar campos válidos
    const allowedFields = ['title', 'description', 'time', 'date', 'completed'];
    const updateData = {};

    for (const key of allowedFields) {
      if (req.body[key] !== undefined) {
        updateData[key] = req.body[key];
      }
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: 'No se proporcionaron campos válidos para actualizar' });
    }

    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, user: userId },
      updateData,
      { new: true }
    ).populate('user', 'name email');

    if (!updatedTask) {
      return res.status(404).json({ message: 'Tarea no encontrada o no autorizada' });
    }

    res.status(200).json({ message: 'Tarea actualizada exitosamente', task: updatedTask });
  } catch (error) {
    console.error('❌ Error al actualizar tarea:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};


// Función para eliminar una tarea específica por ID (requiere que sea del usuario autenticado)
const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.id;

    // Busca y elimina solo si la tarea pertenece al usuario
    const deletedTask = await Task.findOneAndDelete({ _id: taskId, user: userId });

    if (!deletedTask) {
      return res.status(404).json({ message: 'Tarea no encontrada o no autorizada' });
    }

    res.status(200).json({ message: 'Tarea eliminada exitosamente' });
  } catch (error) {
    console.error('❌ Error al eliminar tarea:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Exporta todas las funciones del controlador
module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask
};
