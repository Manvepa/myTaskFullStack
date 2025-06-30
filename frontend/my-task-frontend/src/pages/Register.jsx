import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const res = await API.post('/auth/register', formData);
      setSuccess('Registro exitoso, redirigiendo...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrar');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex justify-center items-center px-4">
      <form onSubmit={handleSubmit} className="bg-white/10 p-8 rounded-3xl shadow-2xl backdrop-blur-xl w-full max-w-md space-y-6 relative border border-white/20">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 mb-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Shield className="text-white w-8 h-8" />
          </div>
          <h2 className="text-3xl text-white font-bold">Crea tu cuenta</h2>
          <p className="text-white/70 text-sm mt-2">Regístrate para comenzar a organizar tus tareas</p>
        </div>

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        {success && <p className="text-green-400 text-sm text-center">{success}</p>}

        <div className="space-y-4">
          <div className="relative">
            <User className="absolute left-4 top-3 text-white/50 w-5 h-5" />
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/50 focus:bg-white/20 focus:border-white/40 focus:outline-none"
              required
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-4 top-3 text-white/50 w-5 h-5" />
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/50 focus:bg-white/20 focus:border-white/40 focus:outline-none"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-3 text-white/50 w-5 h-5" />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/50 focus:bg-white/20 focus:border-white/40 focus:outline-none"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-xl font-semibold flex justify-center items-center gap-2"
        >
          <span>Registrarse</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="text-center pt-2">
          <p className="text-white/70 text-sm">
            ¿Ya tienes una cuenta?{' '}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-purple-300 hover:text-purple-200 font-medium"
            >
              Inicia sesión
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
