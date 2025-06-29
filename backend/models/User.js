// models/User.js

const mongoose = require('mongoose'); // Importa Mongoose

// Esquema del usuario: define qué campos tendrá cada documento en la colección "users"
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // El nombre es obligatorio
    trim: true      // Elimina espacios al inicio y fin
  },
  email: {
    type: String,
    required: true,
    unique: true,   // No se permiten correos duplicados
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6    // Seguridad mínima
  },
  createdAt: {
    type: Date,
    default: Date.now // Fecha automática de creación
  }
});

// Creamos y exportamos el modelo
module.exports = mongoose.model('User', userSchema);
// Este modelo se usará para interactuar con la colección "users" en MongoDB
// Puedes usarlo en otros archivos del backend para crear, leer, actualizar o eliminar usuarios 