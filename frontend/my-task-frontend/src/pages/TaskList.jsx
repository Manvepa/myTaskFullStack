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
  const [isAgregarOpen, setIsAgregarOpen] = useState(false);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        <div className="text-center mb-8 backdrop-blur-sm bg-white/5 p-8 rounded-3xl border border-white/10 shadow-2xl">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-3">
              Hola, {userName || 'usuario'} 👋
            </h1>
            <p className="text-xl text-slate-300 font-light">
              Bienvenido a tu espacio productivo ✨
            </p>
          </div>
        </div>

        {/* Tasks Grid */}
        <div className="w-full max-w-6xl">
          {Array.isArray(tareas) && tareas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tareas.map((tarea, index) => (
                <div 
                  key={tarea._id} 
                  className="group backdrop-blur-md bg-white/5 p-6 rounded-2xl border border-white/10 shadow-xl hover:shadow-2xl hover:bg-white/10 transition-all duration-300 hover:scale-105 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex-shrink-0 mt-2"></div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <EditarTarea 
                        tarea={tarea} 
                        onTareaActualizada={() => {
                          API.get('/tasks').then((res) => setTareas(res.data));
                        }} 
                      />
                      <EliminarTarea 
                        tareaId={tarea._id} 
                        onTareaEliminada={() => {
                          API.get('/tasks').then((res) => setTareas(res.data));
                        }} 
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h2 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors duration-200">
                      {tarea.title}
                    </h2>
                    <p className="text-slate-300 leading-relaxed">
                      {tarea.description}
                    </p>
                    <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span>{tarea.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>{tarea.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 animate-fade-in-up">
              <div className="backdrop-blur-md bg-white/5 p-12 rounded-3xl border border-white/10 shadow-xl">
                <div className="text-6xl mb-6">🚀</div>
                <h3 className="text-2xl font-semibold text-white mb-3">
                  ¡Hora de comenzar!
                </h3>
                <p className="text-slate-400 text-lg">
                  No tienes tareas aún. Agrega tu primera tarea y comienza a ser más productivo.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Logout button */}
        <div className="mt-12 animate-fade-in-up">
          <button
            onClick={handleLogout}
            className="group relative px-8 py-4 bg-gradient-to-r from-red-500/20 to-pink-500/20 backdrop-blur-md border border-red-400/30 text-white rounded-2xl font-semibold transition-all duration-300 hover:from-red-500/30 hover:to-pink-500/30 hover:scale-105 hover:shadow-xl hover:shadow-red-500/25"
          >
            <span className="relative z-10">Cerrar sesión</span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>

      {/* Botón flotante para abrir el modal */}
      <button
        onClick={() => setIsAgregarOpen(true)}
        className="fixed bottom-8 right-8 px-5 py-3 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-lg transition duration-300 z-50"
      >
        + Nueva tarea
      </button>

      {/* Modal de agregar tarea */}
      <AgregarTarea
        isOpen={isAgregarOpen}
        onClose={() => setIsAgregarOpen(false)}
        onTareaAgregada={() => {
          API.get('/tasks').then((res) => setTareas(res.data));
        }}
      />
    </div>
  );
};

export default TaskList;
