// src/components/EditarTarea.jsx
import React, { useState, useEffect } from 'react';
import API from '../api';

const EditarTarea = ({ isOpen, onClose, tarea, onTareaEditada }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    time: '',
    date: ''
  });

  useEffect(() => {
    if (tarea) {
      setFormData({
        title: tarea.title,
        description: tarea.description,
        time: tarea.time,
        date: tarea.date
      });
    }
  }, [tarea]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await API.put(`/tasks/${tarea._id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onTareaEditada(); // refresca la lista
      onClose();         // cierra modal
    } catch (err) {
      console.error('Error al editar tarea:', err);
    }
  };

  if (!isOpen || !tarea) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-black/60 to-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div 
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md transform transition-all duration-300 animate-in zoom-in-95 slide-in-from-bottom-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with edit icon and close button */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Editar Tarea
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200 group"
          >
            <svg className="w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div className="group">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Título de la tarea
            </label>
            <input
            style={{color: '#1f2937'}}
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 outline-none bg-gray-50/50 hover:bg-white group-hover:border-gray-300"
            />
          </div>

          {/* Description Input */}
          <div className="group">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Descripción
            </label>
            <textarea
            style={{color: '#1f2937'}}
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="3"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 outline-none bg-gray-50/50 hover:bg-white resize-none group-hover:border-gray-300"
            />
          </div>

          {/* Time and Date Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="group">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <span className="flex items-center space-x-1">
                  <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Hora</span>
                </span>
              </label>
              <input
              style={{color: '#1f2937'}}
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 outline-none bg-gray-50/50 hover:bg-white group-hover:border-gray-300"
              />
            </div>
            <div className="group">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <span className="flex items-center space-x-1">
                  <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Fecha</span>
                </span>
              </label>
              <input
              style={{color: '#1f2937'}}
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 outline-none bg-gray-50/50 hover:bg-white group-hover:border-gray-300"
              />
            </div>
          </div>

          {/* Current task info card */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span className="text-sm font-medium text-emerald-700">Editando tarea existente</span>
            </div>
            <p className="text-sm text-emerald-600">
              Los cambios se guardarán automáticamente al confirmar.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-medium shadow-lg shadow-emerald-500/25 transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/30 active:scale-95"
            >
              <span className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Guardar Cambios</span>
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarTarea;