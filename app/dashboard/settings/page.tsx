"use client";

import Image from "next/image";
import { useState } from "react";
import { Switch } from "@headlessui/react";
import { FaUserCog, FaBell, FaGlobe, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";

const SettingsPage = () => {
  const [user, setUser] = useState({
    profilePicture: "",
    password: "",
    language: "es",
    notifications: true,
    role: "Usuario",
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target;
    const { name, value } = target;
    const checked = "checked" in target ? target.checked : undefined;

    setUser((prev) => ({
      ...prev,
      [name]: checked !== undefined ? checked : value,
    }));
  };


const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    setUser((prev) => ({ ...prev, profilePicture: URL.createObjectURL(file) }));
  }
};


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-3xl space-y-8 rounded-lg bg-gray-100 p-8 shadow-lg transition-colors dark:bg-gray-800"
    >
      <h1 className="title flex items-center gap-2">
        <FaUserCog /> Configuración
      </h1>

      {/* Perfil de Usuario */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="space-y-6 rounded-lg bg-white p-6 shadow-md dark:bg-accent_oscuro"
      >
        <h3 className="title">Perfil de Usuario</h3>
        <div className="flex items-center gap-4 text-black transition-colors dark:text-white">
          <motion.div whileHover={{ scale: 1.1 }}>
            <Image
              src={user.profilePicture || "/profile-image.jpg"}
              alt="Foto de perfil"
              width={80}
              height={80}
              className="rounded-full border"
            />
          </motion.div>
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
            className="rounded-md border p-2"
          />
        </div>
        <motion.input
          type="password"
          name="password"
          placeholder="Nueva contraseña"
          value={user.password}
          onChange={handleChange}
          whileFocus={{ scale: 1.05 }}
          className="mt-2 w-full rounded border p-2"
        />
      </motion.div>

      {/* Preferencias */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="space-y-6 rounded-lg bg-white p-6 shadow-md dark:bg-accent_oscuro"
      >
        <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-700 dark:text-white">
          <FaGlobe /> Preferencias
        </h2>
        <label className="flex items-center gap-2 text-black dark:text-white">
          <span>Idioma:</span>
          <motion.select
            name="language"
            value={user.language}
            onChange={handleChange}
            whileFocus={{ scale: 1.05 }}
            className="rounded border p-2"
          >
            <option value="es">Español</option>
            <option value="en">Inglés</option>
          </motion.select>
        </label>
        <label className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-black dark:text-white">
            <FaBell /> Recibir notificaciones
          </span>
          <Switch
            checked={user.notifications}
            onChange={() => setUser((prev) => ({ ...prev, notifications: !prev.notifications }))}
            className={`${user.notifications ? "bg-blue-500" : "bg-gray-300"} relative inline-flex h-6 w-11 items-center rounded-full transition-all`}
          >
            <motion.span
              layout
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={`${user.notifications ? "translate-x-6" : "translate-x-1"} inline-block h-4 w-4 transform rounded-full bg-white`}
            />
          </Switch>
        </label>
      </motion.div>

      {/* Gestión de Permisos */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="space-y-6 rounded-lg bg-white p-6 shadow-md dark:bg-accent_oscuro"
      >
        <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-700 dark:text-white">
          <FaLock /> Gestión de Permisos
        </h2>
        <p className="text-gray-600 dark:text-white">
          Rol actual: <strong className="text-gray-800 dark:text-white/50">{user.role}</strong>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default SettingsPage;