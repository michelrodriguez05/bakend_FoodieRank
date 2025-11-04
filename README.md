🍴 FoodieRank - Backend
📌 Descripción del Proyecto

El backend de FoodieRank es una API RESTful desarrollada con Node.js y Express, que gestiona usuarios, restaurantes, platos, reseñas y categorías.
Su objetivo es proporcionar una base sólida y segura para el frontend, permitiendo a los usuarios registrarse, calificar, crear reseñas, y consultar rankings de restaurantes.

Incluye autenticación con JWT, validaciones, roles de usuario/administrador y manejo de transacciones en MongoDB (usando el driver nativo, sin Mongoose).

🧰 Tecnologías y Librerías
Tipo	Tecnología
Lenguaje	Node.js (v22.x)
Framework	Express
Base de Datos	MongoDB (driver oficial)
Autenticación	JWT + passport-jwt
Seguridad	bcrypt, express-rate-limit, cors
Validaciones	express-validator
Configuración	dotenv
Documentación	swagger-ui-express
Versionado	semver
⚙️ Instalación y Configuración
1️⃣ Clonar el repositorio
git clone https://github.com/tu-usuario/backend_FoodieRank.git
cd backend_FoodieRank

2️⃣ Instalar dependencias
npm install

3️⃣ Configurar variables de entorno

Crea un archivo .env en la raíz del proyecto siguiendo este formato:

# .env

PORT=3000
NODE_ENV=development

MONGO_URI=mongodb://localhost:27017
MONGO_DB_NAME=foodierank

JWT_SECRET=supersecretkey
JWT_EXPIRES_IN=7d

RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100

ADMIN_EMAIL=admin@foodierank.com
ADMIN_PASSWORD=admin123

4️⃣ Ejecutar el servidor en modo desarrollo
npm run dev


(Usa nodemon para recargar automáticamente los cambios.)

🧩 Estructura del Proyecto
backend_FoodieRank/
│
├── src/
│   ├── config/             # Configuración del entorno y conexión DB

│   │   ├── db.js

│   │   └── passport.js

│   │
│   ├── controllers/        # Controladores: lógica de negocio

│   │   ├── user.controller.js

│   │   ├── restaurant.controller.js

│   │   ├── dish.controller.js

│   │   ├── review.controller.js

│   │   └── category.controller.js
│   │
│   ├── middlewares/        # Middlewares de validación y auth

│   │   ├── auth.middleware.js

│   │   ├── error.middleware.js

│   │   └── role.middleware.js
│   │
│   ├── models/             # Modelos de datos (usando driver MongoDB)

│   │   ├── user.model.js

│   │   ├── restaurant.model.js

│   │   ├── dish.model.js

│   │   ├── review.model.js

│   │   └── category.model.js
│   │
│   ├── routes/             # Rutas de la API

│   │   ├── user.routes.js

│   │   ├── restaurant.routes.js

│   │   ├── review.routes.js

│   │   ├── dish.routes.js

│   │   ├── category.routes.js

│   │   └── index.js
│   │
│   ├── services/           # Lógica auxiliar y cálculos de ranking

│   │   ├── ranking.service.js

│   │   └── transaction.service.js
│   │
│   ├── utils/              # Funciones comunes, helpers

│   │   ├── response.js

│   │   └── constants.js
│   │
│   ├── validation/         # Validadores personalizados

│   │   ├── user.validation.js

│   │   ├── restaurant.validation.js

│   │   ├── review.validation.js

│   │   └── category.validation.js
│   │
│   ├── app.js              # Configuración principal de Express

│   └── server.js           # Punto de entrada del servidor
│
├── .gitignore

├── package.json

├── package-lock.json

├── seed.js                 # Script para insertar datos iniciales

└── README.md

🔐 Autenticación y Roles

El backend usa JWT (JSON Web Token) junto con passport-jwt.
Cada usuario recibe un token al iniciar sesión, el cual se valida en cada petición protegida.

Roles:

Usuario: puede crear reseñas, calificar, dar like/dislike.

Administrador: puede gestionar categorías, aprobar restaurantes/platos y administrar usuarios.

📊 Funcionalidades Clave
👤 Usuarios

Registro e inicio de sesión con contraseña cifrada (bcrypt)

Verificación y autenticación JWT

Roles diferenciados (usuario / admin)

🍽️ Restaurantes y Platos

CRUD completo

Aprobación de restaurantes por administradores

Evita nombres duplicados

Asociación con categorías y platos

📝 Reseñas

Crear, editar, eliminar reseñas

Calificación 1–5 estrellas

Likes/dislikes entre usuarios

Ranking ponderado de restaurantes

🧩 Categorías

CRUD completo (solo administradores)

Asociación con restaurantes

⚙️ Seguridad y Buenas Prácticas

Rate limiting con express-rate-limit

Validaciones con express-validator

Transacciones MongoDB para operaciones críticas

Manejo centralizado de errores

📘 Documentación Swagger

Una vez el servidor esté corriendo, puedes acceder a la documentación completa de la API en:

🔗 http://localhost:3000/api-docs

🧠 Versionado

El backend sigue versionado semántico (semver):

/api/v1/users
/api/v1/restaurants
/api/v1/reviews

🧾 SCRUM y Planeación

Este proyecto se desarrolló bajo la metodología SCRUM con dos sprints principales.

Roles del equipo:

Scrum Master: [Michel Rodriguez]

Product Owner: [Cristian Perez]

Herramienta de seguimiento: GitHub Projects / Trello / ClickUp
Documento de planeación SCRUM: /docs/SCRUM_Plan.pdf

🎥 Video de Presentación

🔗 Enlace al video: [Agregar link al video]

🔗 Repositorio del Frontend

👉 [Frontend de FoodieRank](https://github.com/cristian20252025/Proyecto-FoodieRank)

👨‍💻 Créditos

Equipo de desarrollo:

[Michel Rodriguez] – Scrum Master

[Cristian Perez] – Product Owner

🏁 Estado del Proyecto

✅ Estructura modular completa
✅ Conexión funcional a MongoDB
✅ JWT y roles implementados
✅ Documentación Swagger activa
✅ Validaciones y rate limiting operativos
