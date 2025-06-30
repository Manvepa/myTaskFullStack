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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-slate-800">Editar Tarea</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarTarea;
