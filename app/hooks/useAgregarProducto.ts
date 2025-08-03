import { useState } from "react";
import Cookie from "js-cookie";
import agregarProducto from "../services/agregarProducto";
import { Producto } from "../services/agregarProducto";

// Tipo para errores del backend
interface BackendError {
  response: {
    status: number;
    data?: {
      message?: string;
    };
  };
}

const useAgregarProducto = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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

      if (isBackendError(err)) {
        const status = err.response.status;
        const backendMessage = err.response.data?.message || "";

        if (status === 400) {
          if (backendMessage.includes("tipo de archivo no permitido")) {
            setError("Solo se permiten imágenes PNG, JPG o JPEG.");
          } else {
            setError(backendMessage || "Error de validación del producto.");
          }
        } else if (status === 404) {
          setError("No se encontró el recurso solicitado.");
        } else {
          setError("Error inesperado al agregar el producto.");
        }
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Hubo un error al agregar el producto.");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    agregarProducto: agregarProductoHandler,
    loading,
    error,
    success,
    setError,
  };
};

// Función para verificar si el error tiene el tipo BackendError
function isBackendError(error: unknown): error is BackendError {
  return (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    typeof (error as any).response?.status === "number"
  );
}

export default useAgregarProducto;
