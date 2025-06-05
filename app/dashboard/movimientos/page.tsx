"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Footer from "../layout/Footer";
import Cookies from "js-cookie";

interface Movimiento {
  id: number;
  fecha: string; // en formato "YYYY-MM-DD"
  usuario: string;
  producto: string;
  tipo: string; // "ENTRADA" | "SALIDA"
  cantidad: number;
}

interface MovimientoBackend {
  id: number;
  fechaMovimiento: string; // fecha ISO del backend
  usuario: {
    username: string;
  };
  producto: {
    nombreProducto: string;
  };
  tipoMovimiento: string; // "ENTRADA" o "SALIDA"
  cantidad: number;
}

const MovementHistoryPage = () => {
  const [movements, setMovements] = useState<Movimiento[]>([]);
  const [filters, setFilters] = useState({ fecha: "", usuario: "", producto: "", tipo: "" });

  const token = Cookies.get("token"); // Devuelve undefined si no existe

  useEffect(() => {
    const fetchMovements = async () => {
      try {
        const res = await axios.get<MovimientoBackend[]>("http://localhost:8000/historial", {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });

        const movimientosBackend: Movimiento[] = res.data.map((m) => ({
          id: m.id,
          fecha: m.fechaMovimiento ? new Date(m.fechaMovimiento).toISOString().slice(0, 10) : "",
          usuario: m.usuario?.username || "Desconocido",
          producto: m.producto?.nombreProducto || "Desconocido",
          tipo: m.tipoMovimiento || "ENTRADA",
          cantidad: m.cantidad || 0,
        }));

        setMovements(movimientosBackend);
      } catch (error) {
        console.error("Error cargando movimientos", error);
      }
    };

    fetchMovements();
  }, [token]);

  const filteredMovements = movements.filter(
    (m) =>
      (!filters.fecha || m.fecha === filters.fecha) &&
      (!filters.usuario || m.usuario.toLowerCase().includes(filters.usuario.toLowerCase())) &&
      (!filters.producto || m.producto.toLowerCase().includes(filters.producto.toLowerCase())) &&
      (!filters.tipo || m.tipo.toUpperCase() === filters.tipo.toUpperCase()),
  );

  return (
    <div className="space-y-6 p-6">
      <h1 className="title">Historial de Movimientos</h1>
      <p className="text-gray-600 dark:text-white/50">Registros de entradas y salidas de productos.</p>

      {/* Filtros */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <input
          type="date"
          className="input"
          onChange={(e) => setFilters({ ...filters, fecha: e.target.value })}
        />
        <input
          type="text"
          placeholder="Usuario"
          className="input"
          onChange={(e) => setFilters({ ...filters, usuario: e.target.value })}
        />
        <input
          type="text"
          placeholder="Producto"
          className="input"
          onChange={(e) => setFilters({ ...filters, producto: e.target.value })}
        />
        <select
          className="input"
          onChange={(e) => setFilters({ ...filters, tipo: e.target.value })}
        >
          <option value="">Todos</option>
          <option value="ENTRADA">Entrada</option>
          <option value="SALIDA">Salida</option>
        </select>
      </div>

      {/* Tabla */}
      <div className="rounded-lg border p-4 shadow-md">
        <table className="table">
          <thead className="table-header">
            <tr className="table-row">
              <th className="table-head">Fecha</th>
              <th className="table-head">Usuario</th>
              <th className="table-head">Producto</th>
              <th className="table-head">Tipo</th>
              <th className="table-head">Cantidad</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {filteredMovements.map((movement, index) => (
              <motion.tr
                key={movement.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="border-b"
              >
                <td className="table-cell">{movement.fecha}</td>
                <td className="table-cell">{movement.usuario}</td>
                <td className="table-cell">{movement.producto}</td>
                <td className={`table-cell font-bold ${movement.tipo.toUpperCase() === "ENTRADA" ? "text-green-500" : "text-red-500"}`}>
                  {movement.tipo}
                </td>
                <td className="table-cell">{movement.cantidad}</td>
              </motion.tr>
            ))}

            {filteredMovements.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="py-4 text-center text-gray-500"
                >
                  No hay movimientos que coincidan con los filtros.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Footer />
    </div>
  );
};

export default MovementHistoryPage;
