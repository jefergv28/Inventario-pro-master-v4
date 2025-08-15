// app/hooks/useProductos.ts

import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import { mapBackendProductoToProducto, Producto } from "../dashboard/utils/transform";
import api from "@/lib/api";


const useProductos = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const token = Cookies.get("token");
        const response = await api.get("/productos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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
  }, []);

  return { productos, loading, error };
};

export default useProductos;
