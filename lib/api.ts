// ./lib/api.ts

import axios from "axios";
import Cookie from "js-cookie";

// Usamos esta función para crear una instancia de axios
// que ya tenga el interceptor de errores configurado.
// Así, podemos pasarle la función `showModal` desde el cliente.
export const createApi = (showModal: (msg: React.ReactNode) => void) => {
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Interceptor de peticiones para añadir el token de autenticación
  api.interceptors.request.use(
    (config) => {
      const token = Cookie.get("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  // --- INTERCEPTOR DE RESPUESTAS PARA ERRORES AMIGABLES ---
  api.interceptors.response.use(
    (response) => response, // Si la respuesta es exitosa, la devolvemos sin cambios
    (error) => {
      // Si la petición falla, entramos en este bloque
      const { response } = error;

      // Un objeto para mapear códigos de error a mensajes amigables
      const errorMessages: { [key: number]: string } = {
        400: "La información que enviaste es incorrecta. Por favor, revisa los campos.",
        401: "Tu sesión ha caducado. Por favor, inicia sesión de nuevo.",
        404: "No se encontró el recurso solicitado.",
        500: "Hubo un problema en el servidor. Por favor, intenta de nuevo más tarde.",
      };

      let userMessage = "Ocurrió un error inesperado. Por favor, contacta a soporte.";

      // Si existe una respuesta del servidor, usamos su código de estado
      if (response) {
        // Obtenemos el mensaje del mapeo, o si el servidor manda uno, lo usamos
        userMessage = errorMessages[response.status] || response.data?.message || userMessage;
      } else {
        // Si no hay respuesta, es un problema de conexión
        userMessage = "No pudimos conectarnos al servidor. Revisa tu conexión a internet.";
      }

      // Mostramos el mensaje al usuario a través del modal
      showModal(userMessage);

      // Rechazamos la promesa para que el error se propague y se pueda manejar localmente
      return Promise.reject(error);
    },
  );

  return api;
};

