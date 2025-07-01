import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import API from '../api';
import AgregarTarea from '../components/AgregarTarea';
import EditarTarea from '../components/EditarTarea';
import EliminarTarea from '../components/EliminarTarea';
import { Pencil, Trash2, CheckCircle, Circle } from 'lucide-react';

const TaskList = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [tareas, setTareas] = useState([]);
  const [tareaEditar, setTareaEditar] = useState(null);
  const [tareaEliminarId, setTareaEliminarId] = useState(null);
  const [showAgregar, setShowAgregar] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserName(decoded.name);
        setUserId(decoded.userId);
      } catch (error) {
        console.error('Error al decodificar token:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (userId) {
      API.get('/tasks')
        .then(res => setTareas(res.data))
        .catch(err => console.error('Error al cargar tareas:', err));
    }
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleComplete = async (tarea) => {
  try {
    const token = localStorage.getItem('token');
    await API.put(`/tasks/${tarea._id}`, {
      completed: !tarea.completed,
    }, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const res = await API.get('/tasks');
    setTareas(res.data);
  } catch (err) {
    console.error('Error al cambiar estado de tarea:', err);
  }
};



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden text-white">
      {/* Fondo animado */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        {/* Encabezado */}
        <div className="text-center mb-10 backdrop-blur-sm bg-white/5 p-8 rounded-3xl border border-white/10 shadow-2xl">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-3">
            Hola, {userName || 'usuario'} 👋
          </h1>
          <p className="text-xl text-slate-300 font-light">Bienvenido a tu espacio productivo ✨</p>
        </div>

        {/* Botón agregar */}
        <div className="mb-6">
          <button
            onClick={() => setShowAgregar(true)}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition"
          >
            + Agregar Tarea
          </button>
        </div>

        {/* Listado de tareas */}
        <div className="w-full max-w-6xl">
          {tareas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tareas.map((tarea, index) => (
                <div
                  key={tarea._id}
                  className="group backdrop-blur-md bg-white/5 p-6 rounded-2xl border border-white/10 shadow-xl hover:shadow-2xl hover:bg-white/10 transition-all duration-300 hover:scale-105 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    {tarea.completed ? (
                      <span className="text-green-400 text-sm">✔ Completada</span>
                    ) : (
                      <span className="text-yellow-400 text-sm">⏳ Pendiente</span>
                    )}
                    <div className="flex gap-2">
                      <button
                        onClick={() => setTareaEditar(tarea)}
                        className="p-2 rounded-lg bg-yellow-500/20 border border-yellow-300 hover:bg-yellow-500/30 text-yellow-200 hover:scale-105 transition"
                        title="Editar tarea"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => setTareaEliminarId(tarea._id)}
                        className="p-2 rounded-lg bg-red-500/20 border border-red-400 hover:bg-red-500/30 text-red-300 hover:scale-105 transition"
                        title="Eliminar tarea"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  <h2 className={`text-xl font-bold mb-1 ${tarea.completed ? 'line-through text-green-300' : 'text-white'}`}>
                    {tarea.title}
                  </h2>
                  <p className="text-slate-300">{tarea.description}</p>

                  <div className="flex items-center gap-4 pt-4 border-t border-white/10 mt-4">
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span>{tarea.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>{tarea.date}</span>
                    </div>
                  </div>

                  {/* Estado de tarea */}
                  <div className="mt-4">
                    <button
                      onClick={() => toggleComplete(tarea)}
                      className={`flex items-center gap-2 text-sm px-3 py-1 rounded-full ${tarea.completed ? 'bg-yellow-600 text-white' : 'bg-green-600 text-white'
                        } hover:scale-105 transition`}
                    >
                      {tarea.completed ? (
                        <>
                          <Circle size={16} /> Marcar como pendiente
                        </>
                      ) : (
                        <>
                          <CheckCircle size={16} /> Marcar como completada
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 animate-fade-in-up">
              <div className="backdrop-blur-md bg-white/5 p-12 rounded-3xl border border-white/10 shadow-xl">
                <div className="text-6xl mb-6">🚀</div>
                <h3 className="text-2xl font-semibold text-white mb-3">¡Hora de comenzar!</h3>
                <p className="text-slate-400 text-lg">
                  No tienes tareas aún. Agrega tu primera tarea y comienza a ser más productivo.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Botón cerrar sesión */}
        <div className="mt-12 animate-fade-in-up animation-delay-400">
          <button
            onClick={handleLogout}
            className="group relative px-8 py-4 bg-gradient-to-r from-red-500/20 to-pink-500/20 backdrop-blur-md border border-red-400/30 text-white rounded-2xl font-semibold transition-all duration-300 hover:from-red-500/30 hover:to-pink-500/30 hover:scale-105 hover:shadow-xl hover:shadow-red-500/25"
          >
            <span className="relative z-10">Cerrar sesión</span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>

      {/* Modales */}
      {showAgregar && (
        <AgregarTarea
          isOpen={true}
          onClose={() => setShowAgregar(false)}
          onTareaAgregada={() => {
            API.get('/tasks').then((res) => setTareas(res.data));
            setShowAgregar(false);
          }}
        />
      )}
      {tareaEditar && (
        <EditarTarea
          isOpen={true}
          tarea={tareaEditar}
          onClose={() => setTareaEditar(null)}
          onTareaEditada={() => {
            API.get('/tasks').then((res) => setTareas(res.data));
            setTareaEditar(null);
          }}
        />
      )}
      {tareaEliminarId && (
        <EliminarTarea
          isOpen={true}
          tareaId={tareaEliminarId}
          onClose={() => setTareaEliminarId(null)}
          onTareaEliminada={() => {
            API.get('/tasks').then((res) => setTareas(res.data));
            setTareaEliminarId(null);
          }}
        />
      )}
    </div>
  );
};

export default TaskList;
