"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Footer from "../layout/Footer";
import Cookies from "js-cookie";

interface Movimiento {
  id: number;
  fecha: string;
  nombreUsuario: string; // <-- Corregido
  nombreProducto: string; // <-- Corregido
  tipo: string;
  cantidad: number;
}

interface MovimientoBackend {
  id: number;
  fecha: string;
  nombreUsuario: string; // <-- Corregido
  nombreProducto: string; // <-- Corregido
  tipoMovimiento: string;
  cantidad: number;
}

const MovementHistoryPage = () => {
  const [movements, setMovements] = useState<Movimiento[]>([]);

  // CORRECCIÓN: El estado del filtro debe usar los nombres de las propiedades correctas
  const [filters, setFilters] = useState({ fecha: "", nombreUsuario: "", nombreProducto: "", tipo: "" });

  const token = Cookies.get("token");

  // CORRECCIÓN: El useEffect ahora tiene la estructura correcta.
  useEffect(() => {
    const fetchMovements = async () => {
      try {
        const res = await axios.get<MovimientoBackend[]>("http://localhost:8000/historial", {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });

        const movimientosMapeados: Movimiento[] = res.data.map((m) => ({
          id: m.id,
          fecha: m.fecha ? new Date(m.fecha).toISOString().slice(0, 10) : "",
          nombreUsuario: m.nombreUsuario || "Desconocido",
          nombreProducto: m.nombreProducto || "Desconocido",
          tipo: m.tipoMovimiento || "ENTRADA",
          cantidad: m.cantidad || 0,
        }));

        setMovements(movimientosMapeados);
      } catch (error) {
        console.error("Error cargando movimientos", error);
      }
    };

    fetchMovements(); // <-- Ahora sí se llama la función dentro del useEffect
  }, [token]); // <-- El useEffect se cierra correctamente aquí.

  // Ahora, el filtrado es una variable local en el renderizado del componente.
  const filteredMovements = movements.filter(
    (m) =>
      (!filters.fecha || m.fecha === filters.fecha) &&
      // CORRECCIÓN: Usar los nombres de propiedades correctos del DTO
      (!filters.nombreUsuario || m.nombreUsuario.toLowerCase().includes(filters.nombreUsuario.toLowerCase())) &&
      (!filters.nombreProducto || m.nombreProducto.toLowerCase().includes(filters.nombreProducto.toLowerCase())) &&
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
          // CORRECCIÓN: Actualizar el estado del filtro con el nombre de la propiedad correcta
          onChange={(e) => setFilters({ ...filters, nombreUsuario: e.target.value })}
        />
        <input
          type="text"
          placeholder="Producto"
          className="input"
          // CORRECCIÓN: Actualizar el estado del filtro con el nombre de la propiedad correcta
          onChange={(e) => setFilters({ ...filters, nombreProducto: e.target.value })}
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
                key={movement.id || index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="border-b"
              >
                <td className="table-cell">{movement.fecha}</td>
                {/* CORRECCIÓN: Usar los nombres de propiedades correctos del DTO */}
                <td className="table-cell">{movement.nombreUsuario}</td>
                <td className="table-cell">{movement.nombreProducto}</td>
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