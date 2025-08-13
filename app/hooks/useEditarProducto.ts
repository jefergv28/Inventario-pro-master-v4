import { useState } from "react";
import { Producto } from "@/app/services/agregarProducto";
import Cookies from "js-cookie";

interface UseEditarProductoResult {
  editarProducto: (id: string, producto: Producto) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const useEditarProducto = (): UseEditarProductoResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editarProducto = async (id: string, producto: Producto) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("name", producto.name);
      formData.append("quantity", producto.quantity.toString());
      formData.append("description", producto.description);
      formData.append("categoryId", producto.category.toString()); // <-- Aquí cambia
      formData.append("providerId", producto.provider.toString()); // <-- Aquí cambia
      formData.append("price", producto.price.toString());

      if (producto.image) {
        formData.append("image", producto.image);
      }

      const token = Cookies.get("token");
      if (!token) throw new Error("No se encontró token de autenticación");

      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

      const response = await fetch(`${API_URL}/productos/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          // NO pongas 'Content-Type' aquí porque fetch pone el correcto cuando usas FormData
        },
        body: formData,
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Error al actualizar producto: ${response.status} - ${text}`);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error desconocido");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { editarProducto, loading, error };
};

export default useEditarProducto;
