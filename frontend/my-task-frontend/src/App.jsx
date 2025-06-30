// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import TaskList from './pages/TaskList';
import PrivateRoute from './components/PrivateRoute';
import Register from './pages/Register';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Rutas protegidas */}
      <Route element={<PrivateRoute />}>
        <Route path="/tasks" element={<TaskList />} />
      </Route>
      
      {/* Puedes agregar más rutas protegidas aquí */}
    </Routes>
  );
}

export default App;
