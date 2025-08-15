"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Footer from "../layout/Footer";
import axios from "axios";
import Modal from "@/components/modal/Modal";
import { useNotification } from "@/app/context/NotificationContext";
import api from "@/lib/api";

interface Proveedor {
  id: number;
  nombre: string;
  contacto: string;
  direccion: string;
}

export default function ProveedoresPage() {
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [form, setForm] = useState({ nombre: "", contacto: "", direccion: "" });
  const [token] = useState(""); // Asegúrate de obtener el token JWT
  const [modalAbierto, setModalAbierto] = useState(false);
  const [mensajeModal, setMensajeModal] = useState("");
  const { addNotification } = useNotification();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/proveedores", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProveedores(response.data);
      } catch (error) {
        console.error("Error cargando proveedores", error);
        addNotification("Error cargando proveedores", "error");
      }
    };
    fetchData();
  }, [token, addNotification]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const agregarProveedor = async () => {
    try {
      const response = await api.post("/proveedores", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
      await api.delete(`/proveedores/${id}`, {
        withCredentials: true, // necesario si usas cookies
      });
      setProveedores((prev) => prev.filter((p) => p.id !== id));
      addNotification("Proveedor eliminado correctamente", "success");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const mensaje = error.response?.data || "Error desconocido al eliminar proveedor";
        setMensajeModal(mensaje);
        setModalAbierto(true);
        addNotification(mensaje, "error");
      } else {
        setMensajeModal("Error inesperado");
        setModalAbierto(true);
        addNotification("Error inesperado", "error");
      }
    }
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Gestión de Proveedores</h1>

      {/* Formulario */}
      <div className="space-y-2 rounded border border-gray-300 p-4 dark:border-gray-600">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-white">Agregar Proveedor</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <input
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleInputChange}
            className="rounded border p-2 text-black dark:text-white"
          />
          <input
            name="contacto"
            placeholder="Contacto"
            value={form.contacto}
            onChange={handleInputChange}
            className="rounded border p-2 text-black dark:text-white"
          />
          <input
            name="direccion"
            placeholder="Dirección"
            value={form.direccion}
            onChange={handleInputChange}
            className="rounded border p-2 text-black dark:text-white"
          />
        </div>
        <div className="pt-2">
          <button
            onClick={agregarProveedor}
            className="rounded bg-green-600 px-4 py-2 text-white"
          >
            Guardar
          </button>
        </div>
      </div>

      {/* Tabla */}
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
                  onClick={() => alert("Función de editar aún no implementada")}
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

      <Modal
        isOpen={modalAbierto}
        message={mensajeModal}
        onClose={() => setModalAbierto(false)}
        onlyMessage
      />

      <Footer />
    </div>
  );
}
