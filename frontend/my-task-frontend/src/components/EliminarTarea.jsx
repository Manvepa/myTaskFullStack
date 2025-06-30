// src/components/EliminarTarea.jsx
import React from 'react';
import API from '../api';

const EliminarTarea = ({ isOpen, onClose, tareaId, onTareaEliminada }) => {
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await API.delete(`/tasks/${tareaId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onTareaEliminada(); // refresca la lista
      onClose();           // cierra modal
    } catch (err) {
      console.error('Error al eliminar tarea:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">¿Eliminar esta tarea?</h2>
        <p className="text-slate-600 mb-6">Esta acción no se puede deshacer.</p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EliminarTarea;
