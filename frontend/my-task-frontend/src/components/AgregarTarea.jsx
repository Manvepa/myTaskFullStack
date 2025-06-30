// src/components/AgregarTarea.jsx
import React, { useState } from 'react';
import API from '../api';

const AgregarTarea = ({ isOpen, onClose, onTareaAgregada }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    time: '',
    date: ''
  });

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
      await API.post('/tasks', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onTareaAgregada(); // actualiza lista
      onClose();         // cierra modal
    } catch (err) {
      console.error('Error al agregar tarea:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-black/60 to-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div 
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md transform transition-all duration-300 animate-in zoom-in-95 slide-in-from-bottom-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with close button */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Nueva Tarea
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
              type="text"
              name="title"
              placeholder="Ej: Revisar documentos importantes"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 outline-none bg-gray-50/50 hover:bg-white group-hover:border-gray-300"
            />
          </div>

          {/* Description Input */}
          <div className="group">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Descripción
            </label>
            <textarea
              name="description"
              placeholder="Describe los detalles de tu tarea..."
              value={formData.description}
              onChange={handleChange}
              required
              rows="3"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 outline-none bg-gray-50/50 hover:bg-white resize-none group-hover:border-gray-300"
            />
          </div>

          {/* Time and Date Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="group">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Hora
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 outline-none bg-gray-50/50 hover:bg-white group-hover:border-gray-300"
              />
            </div>
            <div className="group">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Fecha
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 outline-none bg-gray-50/50 hover:bg-white group-hover:border-gray-300"
              />
            </div>
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
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-medium shadow-lg shadow-blue-500/25 transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30 active:scale-95"
            >
              <span className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Crear Tarea</span>
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgregarTarea;