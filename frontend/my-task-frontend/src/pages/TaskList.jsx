import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import API from '../api';
import AgregarTarea from '../components/AgregarTarea';
import EditarTarea from '../components/EditarTarea';
import EliminarTarea from '../components/EliminarTarea';

const TaskList = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [tareas, setTareas] = useState([]);

  // Leer el token y extraer los datos del usuario
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log('🔐 Token decodificado:', decoded);
        setUserName(decoded.name);
        setUserId(decoded.userId);
      } catch (error) {
        console.error('❌ Error al decodificar el token:', error);
      }
    }
  }, []);

  // Consultar tareas al obtener userId
  useEffect(() => {
    if (userId) {
      console.log('📡 Consultando tareas para userId:', userId);
      API.get('/tasks')
        .then((res) => {
          console.log('📥 Tareas recibidas del backend:', res.data);
          setTareas(res.data);
        })
        .catch((err) => {
          console.error('❌ Error al cargar tareas:', err);
        });
    }
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-6">
      <h1 className="text-3xl mb-2">Hola, {userName || 'usuario'} 👋</h1>
      <p className="mb-4 text-lg">Bienvenido a tus tareas 📝</p>

      <AgregarTarea userId={userId} onTareaAgregada={() => {
        API.get('/tasks').then((res) => setTareas(res.data));
      }} />

      <div className="mt-6 w-full max-w-2xl space-y-4">
        {Array.isArray(tareas) && tareas.length > 0 ? (
          tareas.map((tarea) => (
            <div key={tarea._id} className="bg-slate-800 p-4 rounded-lg shadow-md space-y-2">
              <h2 className="text-xl font-semibold">{tarea.title}</h2>
              <p className="text-sm text-slate-300">{tarea.description}</p>
              <p className="text-sm text-slate-400">🕒 {tarea.time} | 📅 {tarea.date}</p>
              <div className="flex justify-end gap-2">
                <EditarTarea tarea={tarea} onTareaActualizada={() => {
                  API.get('/tasks').then((res) => setTareas(res.data));
                }} />
                <EliminarTarea tareaId={tarea._id} onTareaEliminada={() => {
                  API.get('/tasks').then((res) => setTareas(res.data));
                }} />
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-slate-400">No tienes tareas aún. ¡Agrega una! 🚀</p>
        )}
      </div>

      <button
        onClick={handleLogout}
        className="mt-10 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition duration-200"
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default TaskList;
