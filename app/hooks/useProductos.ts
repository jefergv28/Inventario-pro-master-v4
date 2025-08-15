import { useEffect, useState } from "react";

import { mapBackendProductoToProducto, Producto } from "../dashboard/utils/transform";
import { createApi } from "@/lib/api";

const useProductos = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Instancia de la API
  const api = createApi((msg) => alert(msg));

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await api.get("/productos");
        const productosBackend = response.data;
        const productosTransformados = productosBackend.map(mapBackendProductoToProducto);

        setProductos(productosTransformados);
      } catch (err) {
        console.error("Error al obtener productos:", err);
        setError("No se pudieron cargar los productos.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, [api]);

  return { productos, loading, error };
};

export default useProductos;
