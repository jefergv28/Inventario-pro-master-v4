import axios from "axios";
import Cookies from "js-cookie";

const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const getCategorias = async () => {
  const res = await axios.get(`${backendUrl}/categorias`);
  return res.data;
};

export const getProveedores = async () => {
  const token = Cookies.get("token");
  const res = await axios.get(`${backendUrl}/proveedores`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const crearProducto = async (producto: FormData) => {
  const token = Cookies.get("token");
  const res = await axios.post(`${backendUrl}/productos`, producto, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
