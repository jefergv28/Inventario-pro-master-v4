"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Footer from "../layout/Footer";

const NewUserPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "employee",
    permissions: {
      add: false,
      edit: false,
      delete: false,
      view: true,
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement | HTMLSelectElement;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        permissions: {
          ...prev.permissions,
          [name]: (e.target as HTMLInputElement).checked,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Usuario registrado:", formData);
  };

  return (
    <div className="flex min-h-screen flex-col transition-colors">
      <div className="flex-grow space-y-6 p-6">
        {/* Animación de entrada con Fade In y Slide */}
        <motion.div
          initial={{ opacity: 0, y: 50 }} // Empieza invisible y desplazado hacia abajo
          animate={{ opacity: 1, y: 0 }} // Se hace visible y sube a su posición
          transition={{ duration: 0.5, ease: "easeOut" }} // Duración y suavidad de la animación
          className="mx-auto max-w-lg space-y-4 rounded-lg bg-white p-6 shadow-md transition-colors dark:bg-gray-900"
        >
          <h2 className="title">Registrar Nuevo Usuario</h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {/* Animación de entrada en los campos */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="transition-colors"
            >
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border p-2 text-black focus:ring-2 focus:ring-blue-500 dark:text-white"
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="transition-colors"
            >
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border p-2 text-black focus:ring-2 focus:ring-blue-500 dark:text-white"
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="transition-colors"
            >
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Rol</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border p-2 text-black focus:ring-2 focus:ring-blue-500 dark:text-white"
              >
                <option value="admin">Administrador</option>
                <option value="employee">Empleado</option>
              </select>
            </motion.div>

            {/* Animación de Checkboxes */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="transition-colors"
            >
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Permisos</label>
              <div className="mt-2 space-y-2">
                {["add", "edit", "delete", "view"].map((perm) => (
                  <label
                    key={perm}
                    className="flex items-center space-x-2"
                  >
                    <motion.input
                      type="checkbox"
                      name={perm}
                      checked={formData.permissions[perm as keyof typeof formData.permissions]}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600"
                      whileTap={{ scale: 1.2 }} // Efecto de clic en el checkbox
                    />
                    <span className="capitalize text-gray-700 dark:text-gray-300">{perm}</span>
                  </label>
                ))}
              </div>
            </motion.div>

            {/* Botón sin animaciones de hover/tap */}
            <button
              type="submit"
              className="w-full rounded-md bg-blue-600 py-2 text-white transition hover:bg-blue-700"
            >
              Registrar Usuario
            </button>
          </form>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default NewUserPage;
