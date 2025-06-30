import React, { useState, useEffect } from 'react';
import { Eye, Mail, Lock, ArrowRight, Shield, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import { jwtDecode } from 'jwt-decode';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded && decoded.exp * 1000 > Date.now()) {
          navigate('/tasks'); // Redirige si el token es válido
        }
      } catch (err) {
        console.error('Token inválido:', err);
      }
    }
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await API.post('/auth/login', {
        email,
        password,
      });

      // Guardar el token en localStorage
      localStorage.setItem('token', res.data.token);

      // Redireccionar al dashboard o página protegida
      navigate('/tasks');
    } catch (err) {
      setError(err.response?.data?.message || 'Credenciales incorrectas');
    }
  };

  return (
  <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
    {/* Fondos decorativos con pointer-events-none */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl animate-spin pointer-events-none" style={{ animationDuration: '20s' }}></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
    </div>

    <div className="absolute inset-0 pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full animate-twinkle pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        ></div>
      ))}
    </div>

    <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-3xl pointer-events-none"></div>

          {/* Encabezado */}
          <div className="relative z-10 text-center mb-8">
            <div className="relative mx-auto w-20 h-20 mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-lg opacity-75 animate-pulse pointer-events-none"></div>
              <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl w-full h-full flex items-center justify-center shadow-xl">
                <Shield className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Bienvenido</h1>
            <p className="text-white/70 text-sm">Ingresa a tu cuenta para continuar</p>
          </div>

          {/* Inputs */}
          <div className="space-y-6 relative z-10">
            {error && <div className="text-sm text-red-400 text-center">{error}</div>}

            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/90 pl-1">Correo electrónico</label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                <div className="relative flex items-center">
                  <div className="absolute left-4 z-10">
                    <Mail className="w-5 h-5 text-white/50" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-4 text-white placeholder-white/50 focus:bg-white/20 focus:border-white/40 focus:outline-none transition-all duration-300"
                    placeholder="tu@email.com"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/90 pl-1">Contraseña</label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                <div className="relative flex items-center">
                  <div className="absolute left-4 z-10">
                    <Lock className="w-5 h-5 text-white/50" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-12 py-4 text-white placeholder-white/50 focus:bg-white/20 focus:border-white/40 focus:outline-none transition-all duration-300"
                    placeholder="••••••••"
                    required
                  />
                  <div className="absolute right-4 z-10">
                    <Eye className="w-5 h-5 text-white/50 cursor-pointer hover:text-white/80 transition-colors duration-200" />
                  </div>
                </div>
              </div>
            </div>

            {/* Recordarme y Olvidé contraseña */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer group">
                <input type="checkbox" className="sr-only" />
                <div className="w-4 h-4 bg-white/20 border border-white/30 rounded group-hover:bg-white/30 transition-colors duration-200"></div>
                <span className="text-white/70 group-hover:text-white/90 transition-colors duration-200">Recordarme</span>
              </label>
              <a href="#" className="text-purple-300 hover:text-purple-200 transition-colors duration-200 font-medium">¿Olvidaste tu contraseña?</a>
            </div>

            {/* Botón de inicio */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur group-hover:blur-lg transition-all duration-300 pointer-events-none"></div>
              <button type="submit" className="relative w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center space-x-2">
                <span>Iniciar sesión</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          </div>

          {/* Enlace a registro */}
          <div className="mt-6 text-center">
            <p className="text-white/70 text-sm">
              ¿No tienes una cuenta?{' '}
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="text-purple-300 hover:text-purple-200 font-medium"
              >
                Regístrate
              </button>
            </p>
          </div>
        </div>

        {/* Información al pie */}
        <div className="mt-8 flex items-center justify-center space-x-6">
          <div className="flex items-center space-x-2 text-white/60">
            <Shield className="w-4 h-4" /><span className="text-xs">Seguro</span>
          </div>
          <div className="flex items-center space-x-2 text-white/60">
            <Star className="w-4 h-4" /><span className="text-xs">Confiable</span>
          </div>
          <div className="flex items-center space-x-2 text-white/60">
            <Lock className="w-4 h-4" /><span className="text-xs">Privado</span>
          </div>
        </div>

        <div className="mt-6 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-white/70 text-xs">Conexión segura SSL</span>
          </div>
        </div>
      </form>
    </div>
  </div>
);

}

export default Login;
