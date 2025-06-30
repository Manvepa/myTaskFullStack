# myTaskFullStack
Application for task daily


# 📝 MyTaskFullStack - Backend

Este es el backend de la aplicación de tareas sincronizadas **MyTaskFullStack**, desarrollado con Node.js, Express y MongoDB Atlas.

## 📁 Estructura del Proyecto

```
MyTaskFullStack/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   └── app.js
├── frontend/ (se creará con Vite + React)
```

## ⚙️ Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express.js**: Framework minimalista para construir APIs.
- **MongoDB Atlas**: Base de datos NoSQL en la nube.
- **Mongoose**: ODM para modelar datos de MongoDB.
- **JWT**: JSON Web Token para autenticación.
- **Bcrypt**: Encriptación segura de contraseñas.

## 🔐 Autenticación

- El sistema permite registrar e iniciar sesión mediante endpoints.
- Al iniciar sesión se entrega un token JWT que debe usarse en las siguientes peticiones.
- Rutas protegidas mediante middleware (`authMiddleware.js`).

## 🔗 Rutas Disponibles

### Auth (`/api/auth`)
- `POST /register`: Registro de usuario.
- `POST /login`: Inicio de sesión.

### Tareas (`/api/tasks`)
- `GET /`: Obtener todas las tareas del usuario.
- `POST /`: Crear una nueva tarea.
- `PUT /:id`: Editar una tarea por ID.
- `DELETE /:id`: Eliminar una tarea por ID.

## 🛡️ Middleware

- **authMiddleware**: Verifica el token JWT y agrega el ID del usuario en `req.user`.

## 🔐 Variables de Entorno (.env)

Debes crear un archivo `.env` en la carpeta `backend/` con las siguientes variables:

```
MONGO_URI=mongodb+srv://<usuario>:<contraseña>@<cluster>.mongodb.net/?retryWrites=true&w=majority
JWT_SECRET=tu_clave_secreta
PORT=4000
```

## ✅ Estado Actual

- [x] Registro e inicio de sesión de usuarios
- [x] Protección con JWT
- [x] CRUD de tareas
- [x] Validación de campos
- [x] MongoDB conectado y funcional
- [x] Probado con Postman

---

## 🧪 Probar en Postman

1. Registrar o iniciar sesión para obtener el token.
2. En cada ruta protegida, agrega el token en los headers:

```
Authorization: Bearer <TOKEN>
```

---

> Desarrollado por Manuel Parra como parte del proyecto formativo personal.
