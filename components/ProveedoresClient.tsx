"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNotification } from "@/app/context/NotificationContext";
import Footer from "./Footer";
import { createApi } from "@/lib/api";

interface Proveedor {
  id: number;
  nombre: string;
  contacto: string;
  direccion: string;
}

export default function ProveedoresClient() {
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [form, setForm] = useState({ nombre: "", contacto: "", direccion: "" });
  const [loading, setLoading] = useState(true);

  const { addNotification } = useNotification();

  // Inicializamos la API solo en el cliente
  const api = createApi((msg) => alert(msg));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<Proveedor[]>("/proveedores");
        setProveedores(response.data);
      } catch (error) {
        console.error("Error al cargar proveedores", error);
        addNotification("Error al cargar proveedores", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [api, addNotification]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const agregarProveedor = async () => {
    try {
      const response = await api.post("/proveedores", form);
      setProveedores((prev) => [...prev, response.data]);
      setForm({ nombre: "", contacto: "", direccion: "" });
      addNotification("Proveedor agregado correctamente", "success");
    } catch (error) {
      console.error("Error al agregar proveedor", error);
      addNotification("Error al agregar proveedor", "error");
    }
  };

  const eliminarProveedor = async (id: number) => {
    try {
      await api.delete(`/proveedores/${id}`);
      setProveedores((prev) => prev.filter((p) => p.id !== id));
      addNotification("Proveedor eliminado correctamente", "success");
    } catch (error) {
      console.error("Error al eliminar proveedor", error);
      addNotification("Error al eliminar proveedor", "error");
    }
  };

  if (loading) return <div className="py-10 text-center text-gray-500">Cargando proveedores...</div>;

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Gestión de Proveedores</h1>

      <div className="space-y-2 rounded border border-gray-300 p-4 dark:border-gray-600">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-white">Agregar Proveedor</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <input
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleInputChange}
            className="input"
          />
          <input
            name="contacto"
            placeholder="Contacto"
            value={form.contacto}
            onChange={handleInputChange}
            className="input"
          />
          <input
            name="direccion"
            placeholder="Dirección"
            value={form.direccion}
            onChange={handleInputChange}
            className="input"
          />
        </div>
        <div className="pt-2">
          <button onClick={agregarProveedor} className="btn btn-primary">Guardar</button>
        </div>
      </div>

      <table className="w-full table-auto border-collapse border border-gray-300 dark:border-gray-600">
        <thead className="bg-gray-200 dark:bg-gray-800">
          <tr>
            <th className="px-4 py-2 text-left text-gray-800 dark:text-white">Nombre</th>
            <th className="px-4 py-2 text-left text-gray-800 dark:text-white">Contacto</th>
            <th className="px-4 py-2 text-left text-gray-800 dark:text-white">Dirección</th>
            <th className="px-4 py-2 text-left text-gray-800 dark:text-white">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.map((prov, index) => (
            <motion.tr
              key={prov.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="border-b border-gray-300 dark:border-gray-600"
            >
              <td className="px-4 py-2 text-gray-800 dark:text-white">{prov.nombre}</td>
              <td className="px-4 py-2 text-gray-800 dark:text-white">{prov.contacto}</td>
              <td className="px-4 py-2 text-gray-800 dark:text-white">{prov.direccion}</td>
              <td className="px-4 py-2 text-gray-800 dark:text-white">
                <button
                  className="mr-2 rounded bg-blue-500 px-3 py-1 text-white"
                  onClick={() => addNotification("Función de editar aún no implementada", "info")}
                >
                  Editar
                </button>
                <button
                  className="rounded bg-red-500 px-3 py-1 text-white"
                  onClick={() => eliminarProveedor(prov.id)}
                >
                  Eliminar
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>

      <Footer />
    </div>
  );
}
