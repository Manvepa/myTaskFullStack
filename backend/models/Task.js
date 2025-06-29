// Creacion modelo de Tarea
// Este modelo define cómo se almacenarán las tareas en la base de datos MongoDB.

const mongoose = require('mongoose');
// Definimos el esquema de la tarea
const taskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Referencia al modelo User
        required: true // Cada tarea debe pertenecer a un usuario
    },
    title: {
        type: String,
        required: true, // El título es obligatorio
        trim: true      // Elimina espacios al inicio y fin
    },
    description: {
        type: String,
        required: true, // La descripción es obligatoria
        trim: true      // Elimina espacios al inicio y fin
    },
    time: {
    type: String, // Hora en formato "5am", "6:30pm", etc.
    required: true
    },
    date: {
    type: String, // Fecha como string (opcionalmente podrías usar Date)
    required: true
    },
    completed: {
        type: Boolean,
        default: false // Por defecto, la tarea no está completada
    },
    createdAt: {
        type: Date,
        default: Date.now // Fecha automática de creación
    }
    });

// Creamos y exportamos el modelo
module.exports = mongoose.model('Task', taskSchema);