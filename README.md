# Inventario Pro

Inventario Pro es una aplicación web para la gestión eficiente de inventarios. Permite registrar productos, gestionar stock, analizar estadísticas y optimizar la administración de recursos mediante una interfaz intuitiva.

## 🚀 Características

- 📦 **Gestión de productos**: Agregar, modificar y eliminar productos.
- 🔍 **Búsqueda avanzada**: Encuentra productos fácilmente con un buscador global.
- 📊 **Estadísticas interactivas**: Gráficos de tendencias de stock y movimientos.
- 🏷 **Gestión de proveedores**: Registro y administración de proveedores.
- 🔔 **Notificaciones**: Avisos sobre stock bajo y movimientos recientes.
- 🔐 **Control de usuarios**: Roles y permisos para diferentes tipos de usuarios.

## 🛠 Tecnologías utilizadas

- **Next.js** (Framework de React para el frontend)
- **TypeScript** (Tipado estático para mayor seguridad y escalabilidad)
- **Tailwind CSS** (Estilos modernos y personalizables)
- **Recharts** (Gráficos dinámicos y visualización de datos)
- **Spring Boot** (Backend en Java para la gestión de datos)
- **MySQL** (Base de datos para almacenamiento de productos y usuarios)

## 📦 Instalación y ejecución

1. Clona este repositorio:

   ```bash
   git clone https://github.com/jefergv28/inventario-app.git
   cd inventario-pro
   Instala las dependencias:
   ```

bash
Copiar
Editar
npm install

# o

pnpm install
Inicia el servidor de desarrollo:

bash
Copiar
Editar
npm run dev
Abre http://localhost:3000 en tu navegador.

📂 Estructura del proyecto
bash
Copiar
Editar
/inventario-pro
├── app/ # Directorio principal del proyecto Next.js
│ ├── dashboard/ # Panel de administración
│ ├── settings/ # Configuración del usuario
│ ├── auth/ # Páginas de autenticación
│ └── page.tsx # Página principal
├── components/ # Componentes reutilizables
├── hooks/ # Custom hooks
├── services/ # Llamadas a API y lógica de negocio
├── styles/ # Estilos globales
├── public/ # Imágenes y recursos estáticos
├── package.json # Dependencias y configuración
└── README.md # Documentación del proyecto
🚀 Despliegue en Vercel
Para desplegar en Vercel, sigue estos pasos:

Crea una cuenta en Vercel.

Conéctate con GitHub y selecciona el repositorio del proyecto.

Configura las variables de entorno necesarias.

Haz clic en "Deploy" y espera a que Vercel genere la URL de tu aplicación.

🤝 Contribuciones
¡Las contribuciones son bienvenidas! Si deseas mejorar este proyecto, sigue estos pasos:

Haz un fork del repositorio.

Crea una rama con tu nueva funcionalidad (git checkout -b feature-nueva).

Realiza cambios y haz commit (git commit -m "Agrega nueva funcionalidad").

Sube los cambios (git push origin feature-nueva).

Abre un pull request y descríbelo.

📄 Licencia
Este proyecto está bajo la licencia MIT. Puedes usarlo, modificarlo y distribuirlo libremente.

💡 Desarrollado por Jeferson.
