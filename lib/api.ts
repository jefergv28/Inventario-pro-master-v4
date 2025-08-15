import axios from "axios";
import Cookie from "js-cookie";


// Función para crear la instancia de Axios con modal
export const createApi = (showModal: (msg: React.ReactNode) => void) => {
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
    headers: { "Content-Type": "application/json" },
  });

  // Interceptor de request para enviar token si existe
  api.interceptors.request.use(
    (config) => {
      const token = Cookie.get("token");
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    (error) => Promise.reject(error),
  );

  // Interceptor de response para capturar errores y mostrarlos en modal
  api.interceptors.response.use(
    (res) => res,
    (error) => {
      if (!error.response) {
        showModal("¡Ups! No pudimos conectarnos al servidor. Intenta más tarde.");
      } else {
        showModal(error.response.data?.message || "Ocurrió un error en la petición.");
      }
      return Promise.reject(error);
    },
  );

  return api;
};
