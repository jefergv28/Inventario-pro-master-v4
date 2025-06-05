import { useState } from "react";
import Cookie from "js-cookie";
import agregarProducto from "../services/agregarProducto";
import { Producto } from "../services/agregarProducto";

const useAgregarProducto = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Obtener el token desde cookie directamente
  const token = Cookie.get("token");

  const agregarProductoHandler = async (producto: Producto) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (!token) {
        throw new Error("No se encontró el token de autenticación.");
      }

      const response = await agregarProducto(producto, token);
      setSuccess("Producto agregado correctamente!");
      return response;
    } catch (err: unknown) {
      console.error("Error al agregar producto:", err);
      setError("Hubo un error al agregar el producto.");
    } finally {
      setLoading(false);
    }
  };

  return {
    agregarProducto: agregarProductoHandler,
    loading,
    error,
    success,
  };
};

export default useAgregarProducto;
