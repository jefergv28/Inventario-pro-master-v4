import axios from "axios";
import Cookie from "js-cookie";

const api = axios.create({
  baseURL: "http://localhost:8000", // Cambia al puerto de tu backend Spring Boot
});

api.interceptors.request.use(
  (config) => {
    const token = Cookie.get("token"); // Obtenemos el token JWT guardado en cookies

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn("No hay token disponible para esta solicitud.");
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
