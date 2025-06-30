// src/pages/TaskList.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


const TaskList = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      console.log('Token JWT guardado:', token); // <-- Consola para verificación
      try {
        const decoded = jwtDecode(token);
        setUserName(decoded.name); // <-- Usamos el campo "name" del token
      } catch (error) {
        console.error('Error al decodificar el token:', error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white">
      <h1 className="text-3xl mb-4">Hola, {userName || 'usuario'} 👋</h1>
      <p className="mb-6 text-lg">Bienvenido a tus tareas 📝</p>
      <button
        onClick={handleLogout}
        className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition duration-200"
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default TaskList;
