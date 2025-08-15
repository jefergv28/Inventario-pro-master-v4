"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import Footer from "../layout/Footer";
import { createApi } from "@/lib/api";

interface Producto {
  id: number;
  nombreProducto: string;
}

interface Stock {
  id: number;
  cantidadDisponible: number;
  cantidadMinima: number;
  cantidadMaxima: number;
  productoId: number;
  productoNombre: string;
}

interface FormData {
  productoId: string;
  cantidadDisponible: string;
  cantidadMinima: string;
  cantidadMaxima: string;
}

export default function StockPage() {
  const [token, setToken] = useState<string | null>(null);
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);

  const [form, setForm] = useState<FormData>({
    productoId: "",
    cantidadDisponible: "",
    cantidadMinima: "",
    cantidadMaxima: "",
  });

  const [stockEditando, setStockEditando] = useState<Stock | null>(null);

  useEffect(() => {
    const t = Cookies.get("token");
    setToken(t || null);
  }, []);

  const showModal = (msg: React.ReactNode) => {
    alert(msg); // o un toast/modal personalizado
  };

  const api = createApi(showModal); // ✅ ahora sí se usa

  useEffect(() => {
    if (!token) return;

    const fetchAll = async () => {
      try {
        const [stocksRes, productosRes] = await Promise.all([
          api.get("/stocks", { headers: { Authorization: `Bearer ${token}` } }),
          api.get("/productos", { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        setStocks(stocksRes.data);
        setProductos(productosRes.data);
      } catch (error) {
        console.error("Error cargando datos", error);
      }
    };

    fetchAll();
  }, [api, token]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const cargarParaEditar = (stock: Stock) => {
    console.log("Editando stock:", stock);

    setStockEditando(stock);

    setForm({
      productoId: stock.productoId.toString(),
      cantidadDisponible: stock.cantidadDisponible.toString(),
      cantidadMinima: stock.cantidadMinima.toString(),
      cantidadMaxima: stock.cantidadMaxima.toString(),
    });
  };

  const guardarStock = async () => {
    if (!token) return;

    const { productoId, cantidadDisponible, cantidadMinima, cantidadMaxima } = form;

    if (!productoId || !cantidadDisponible || !cantidadMinima || !cantidadMaxima) {
      alert("Por favor completa todos los campos");
      return;
    }

    const stockData = {
      producto: { id: parseInt(productoId) },
      cantidadDisponible: parseInt(cantidadDisponible),
      cantidadMinima: parseInt(cantidadMinima),
      cantidadMaxima: parseInt(cantidadMaxima),
    };

    if (Object.values(stockData).some((v) => Number.isNaN(v))) {
      alert("Todos los valores deben ser numéricos válidos");
      return;
    }

    try {
      if (stockEditando) {
        // Editar stock existente: enviar POST con id incluido
        const stockDataConId = { ...stockData, id: stockEditando.id };

        const response = await api.post("/stocks", stockDataConId, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setStocks((prev) =>
          prev.map((s) =>
            s.id === stockEditando.id
              ? {
                  ...response.data,
                  productoNombre: productos.find((p) => p.id === response.data.producto.id)?.nombreProducto || "Desconocido",
                }
              : s,
          ),
        );

        setStockEditando(null);
      } else {
        // Crear nuevo stock
        const response = await api.post("/stocks", stockData, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const nuevoStock = {
          ...response.data,
          productoNombre: productos.find((p) => p.id === response.data.producto.id)?.nombreProducto || "Desconocido",
        };

        setStocks((prev) => [...prev, nuevoStock]);
      }

      setForm({ productoId: "", cantidadDisponible: "", cantidadMinima: "", cantidadMaxima: "" });
    } catch (error) {
      console.error("Error al guardar stock", error);
    }
  };

  const eliminarStock = async (id: number) => {
    if (!token) return;

    try {
      await api.delete(`/stocks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStocks((prev) => prev.filter((s) => s.id !== id));
    } catch (error) {
      console.error("Error al eliminar stock", error);
    }
  };

  const cancelarEdicion = () => {
    setStockEditando(null);
    setForm({ productoId: "", cantidadDisponible: "", cantidadMinima: "", cantidadMaxima: "" });
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Gestión de Stock</h1>

      {/* Formulario para agregar/editar stock */}
      <div className="max-w-md space-y-3 rounded border border-gray-300 p-4 dark:border-gray-600">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-white">{stockEditando ? "Editar Stock" : "Agregar Stock"}</h2>

        <select
          name="productoId"
          value={form.productoId}
          onChange={handleInputChange}
          className="w-full rounded border border-gray-400 p-2 text-black dark:bg-gray-900 dark:text-white"
          disabled={!!stockEditando} // No permitir cambiar producto al editar
        >
          <option
            value=""
            disabled
          >
            Selecciona un producto
          </option>
          {productos.map((p) => (
            <option
              key={p.id}
              value={p.id}
            >
              {p.nombreProducto}
            </option>
          ))}
        </select>

        <input
          name="cantidadDisponible"
          type="number"
          placeholder="Cantidad Disponible"
          value={form.cantidadDisponible}
          onChange={handleInputChange}
          className="w-full rounded border border-gray-400 p-2 text-black dark:bg-gray-900 dark:text-white"
        />
        <input
          name="cantidadMinima"
          type="number"
          placeholder="Cantidad Mínima"
          value={form.cantidadMinima}
          onChange={handleInputChange}
          className="w-full rounded border border-gray-400 p-2 text-black dark:bg-gray-900 dark:text-white"
        />
        <input
          name="cantidadMaxima"
          type="number"
          placeholder="Cantidad Máxima"
          value={form.cantidadMaxima}
          onChange={handleInputChange}
          className="w-full rounded border border-gray-400 p-2 text-black dark:bg-gray-900 dark:text-white"
        />

        <div className="flex space-x-2">
          <button
            onClick={guardarStock}
            className="flex-1 rounded bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
          >
            {stockEditando ? "Actualizar" : "Guardar"}
          </button>

          {stockEditando && (
            <button
              onClick={cancelarEdicion}
              className="flex-1 rounded bg-gray-500 px-4 py-2 text-white transition hover:bg-gray-600"
            >
              Cancelar
            </button>
          )}
        </div>
      </div>

      {/* Tabla de stocks */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="overflow-x-auto"
      >
        <table className="w-full max-w-4xl table-auto border-collapse border border-gray-300 dark:border-gray-600">
          <thead className="bg-gray-200 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-2 text-left text-gray-800 dark:text-white">Producto</th>
              <th className="px-4 py-2 text-left text-gray-800 dark:text-white">Disponible</th>
              <th className="px-4 py-2 text-left text-gray-800 dark:text-white">Mínimo</th>
              <th className="px-4 py-2 text-left text-gray-800 dark:text-white">Máximo</th>
              <th className="px-4 py-2 text-left text-gray-800 dark:text-white">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock, index) => (
              <motion.tr
                key={stock.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-gray-300 dark:border-gray-600"
              >
                <td className="px-4 py-2 text-gray-800 dark:text-white"> {stock.productoNombre}</td>
                <td className="px-4 py-2 text-gray-800 dark:text-white">{stock.cantidadDisponible}</td>
                <td className="px-4 py-2 text-gray-800 dark:text-white">{stock.cantidadMinima}</td>
                <td className="px-4 py-2 text-gray-800 dark:text-white">{stock.cantidadMaxima}</td>
                <td className="px-4 py-2 text-gray-800 dark:text-white">
                  <button
                    onClick={() => cargarParaEditar(stock)}
                    className="mr-2 rounded bg-blue-500 px-3 py-1 text-white transition hover:bg-blue-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => eliminarStock(stock.id)}
                    className="rounded bg-red-500 px-3 py-1 text-white transition hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <Footer />
    </div>
  );
}
