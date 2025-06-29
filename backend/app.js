// app.js

// Instalando express, cors y mongoose
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Inicializando la aplicación Express
const app = express();

// Middlewares básicos
app.use(cors());
app.use(express.json()); // Para leer JSON en peticiones

// Importando las rutas de autenticación
const authRoutes = require('./routes/authRoutes');

// Usando las rutas de autenticación
app.use('/api/auth', authRoutes);


// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch((err) => console.error('❌ Error de conexión:', err));

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor funcionando 🎉');
});

// Puerto
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Servidor en puerto ${PORT}`));
