// Controlador de autenticación

// Lllamamos a Mongoose y al modelo de usuario para manejar el registro de usuarios.
const User = require('../models/User');
const bcrypt = require('bcrypt');
// Llamamos a jsonwebtoken para manejar la creación de tokens JWT.
// Esto nos permitirá autenticar a los usuarios después de que se registren.
const jwt = require('jsonwebtoken');

// Registro de usuario
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verificar que todos los campos estén presentes
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Verificar si el correo ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'El correo ya está registrado' });
    }

    // Encriptar la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Crear nuevo usuario
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error('❌ Error en registro:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Controlador de login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validación básica
    if (!email || !password) {
      return res.status(400).json({ message: 'Email y contraseña requeridos' });
    }

    // Buscar usuario por email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Comparar contraseñas
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Generar token JWT
    const token = jwt.sign(
      { userId: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      token
    });

  } catch (error) {
    console.error('❌ Error en login:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = { registerUser, loginUser };
// Este controlador maneja el registro de usuarios en la aplicación.
// Utiliza Mongoose para interactuar con la base de datos MongoDB y bcrypt para encriptar contraseñas.