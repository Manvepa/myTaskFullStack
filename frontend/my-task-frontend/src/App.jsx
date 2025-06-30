// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import TaskList from './pages/TaskList';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />
      {/* Rutas protegidas */}
      <Route element={<PrivateRoute />}>
        <Route path="/tasks" element={<TaskList />} />
      </Route>
      
      {/* Puedes agregar más rutas protegidas aquí */}
    </Routes>
  );
}

export default App;
