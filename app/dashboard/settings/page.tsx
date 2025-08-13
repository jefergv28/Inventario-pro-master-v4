"use client";

import Image from "next/image";
import { useState } from "react";
import { Switch } from "@headlessui/react";
import { FaUserCog, FaBell, FaGlobe, FaLock, FaKey, FaEye, FaEyeSlash } from "react-icons/fa"; // Importamos FaEye y FaEyeSlash
import { motion } from "framer-motion";
import Modal from "@/components/modal/Modal";
import { toast } from "sonner";
import api from "@/app/hooks/useApi";
import { useNetAuth } from "@/app/hooks/useNetAuth"; // Importamos el hook

const SettingsPage = () => {
  // Usamos el estado global del hook, incluyendo isLoading
  const { usuario, setUsuario, isLoading } = useNetAuth();

  const [hasChanges, setHasChanges] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false); // Nuevo estado para la visibilidad de la contraseña



  const handleProfilePictureChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("imagen", file);

      const response = await api.post("/api/usuarios/me/foto", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const imageUrl = response.data.profilePicture;

      // Actualizamos el estado global en el hook
      setUsuario((prevUsuario) =>
        prevUsuario
          ? {
              ...prevUsuario,
              profilePicture: imageUrl,
            }
          : null,
      );

      toast.success("Foto actualizada");
      setHasChanges(true);
    } catch (error) {
      console.error("Error al subir imagen:", error);
      toast.error("Error al subir foto");
    }
  };

  const handlePasswordConfirm = () => {
    // Actualizamos el estado global del usuario con la nueva contraseña
    setUsuario((prev) => (prev ? { ...prev, password: newPassword } : null));
    setNewPassword("");
    setShowPasswordModal(false);
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await api.put("/api/usuarios/configuracion", {
        name: usuario?.name,
        language: usuario?.language,
        notifications: usuario?.notifications,
        password: usuario?.password,
      });

      setShowConfirm(false);
      setShowSuccess(true);
      setHasChanges(false);
      toast.success("Configuración actualizada");
    } catch (error) {
      console.error("Error al guardar configuración:", error);
      toast.error("Hubo un error al guardar");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-3xl space-y-8 rounded-lg bg-gray-100 p-8 shadow-lg transition-colors dark:bg-gray-800"
    >
      <h1 className="title flex items-center gap-2 text-black dark:text-white">
        <FaUserCog /> Configuración
      </h1>

      {/* Renderizado condicional: Muestra el esqueleto de carga si los datos no están listos */}
      {isLoading || !usuario ? (
        <div className="space-y-8">
          {/* Esqueleto para la sección de Perfil */}
          <div className="animate-pulse space-y-6 rounded-lg bg-white p-6 shadow-md dark:bg-accent_oscuro">
            <div className="mb-4 h-6 w-1/3 rounded bg-gray-300"></div> {/* Título */}
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-full bg-gray-300"></div> {/* Foto de perfil */}
              <div className="h-10 w-2/3 rounded bg-gray-300"></div> {/* Input de archivo */}
            </div>
            <div className="h-6 w-1/2 rounded bg-gray-300 dark:bg-accent_oscuro"></div> {/* Nombre de usuario */}
            <div className="h-10 w-40 rounded bg-gray-300"></div> {/* Botón */}
          </div>

          {/* Esqueleto para la sección de Preferencias */}
          <div className="animate-pulse space-y-6 rounded-lg bg-white p-6 shadow-md dark:bg-accent_oscuro">
            <div className="mb-4 h-6 w-1/4 rounded bg-gray-300"></div> {/* Título */}
            <div className="flex items-center justify-between">
              <div className="h-6 w-1/3 rounded bg-gray-300"></div> {/* Idioma */}
              <div className="h-10 w-24 rounded bg-gray-300"></div> {/* Select */}
            </div>
            <div className="flex items-center justify-between">
              <div className="h-6 w-1/2 rounded bg-gray-300"></div> {/* Notificaciones */}
              <div className="h-6 w-11 rounded-full bg-gray-300"></div> {/* Switch */}
            </div>
          </div>

          {/* Esqueleto para la sección de Rol */}
          <div className="animate-pulse space-y-6 rounded-lg bg-white p-6 shadow-md dark:bg-accent_oscuro">
            <div className="mb-4 h-6 w-1/4 rounded bg-gray-300"></div> {/* Título */}
            <div className="h-6 w-2/3 rounded bg-gray-300"></div> {/* Rol actual */}
          </div>

          {/* Esqueleto para el botón de Guardar */}
          <div className="h-12 w-full animate-pulse rounded bg-gray-300"></div>
        </div>
      ) : (
        <>
          {/* Perfil */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="space-y-6 rounded-lg bg-white p-6 shadow-md dark:bg-accent_oscuro"
          >
            <h3 className="title">Perfil de Usuario</h3>
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 overflow-hidden rounded-full border-2 border-gray-300 dark:border-white">
                <Image
                  // AQUI ESTÁ EL CAMBIO CLAVE: Aseguramos que la URL siempre sea completa
                  src={usuario?.profilePicture ? `http://localhost:8000${usuario.profilePicture}` : `http://localhost:8000/uploads/profile-image.jpg`}
                  alt="Foto de perfil"
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                />
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
                className="rounded-md border p-2"
              />
            </div>

            <label className="block text-black dark:text-white">
              Nombre de usuario:
              <p className="bg-muted text-muted-foreground w-full py-2">{usuario?.name}</p>
            </label>

            <button
              onClick={() => setShowPasswordModal(true)}
              className="mt-4 flex items-center gap-2 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              <FaKey /> Cambiar Contraseña
            </button>
          </motion.div>

          {/* Preferencias */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="space-y-6 rounded-lg bg-white p-6 shadow-md dark:bg-accent_oscuro"
          >
            <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-700 dark:text-white">
              <FaGlobe /> Preferencias
            </h2>

            <label className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-black dark:text-white">
                <FaBell /> Recibir notificaciones
              </span>
              <Switch
                checked={usuario?.notifications ?? false}
                onChange={() => setUsuario((prev) => (prev ? { ...prev, notifications: !prev.notifications } : null))}
                className={`${usuario?.notifications ? "bg-blue-500" : "bg-gray-300"} relative inline-flex h-6 w-11 items-center rounded-full transition-all`}
              >
                <motion.span
                  layout
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className={`${usuario?.notifications ? "translate-x-6" : "translate-x-1"} inline-block h-4 w-4 transform rounded-full bg-white`}
                />
              </Switch>
            </label>
          </motion.div>

          {/* Rol */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="space-y-6 rounded-lg bg-white p-6 shadow-md dark:bg-accent_oscuro"
          >
            <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-700 dark:text-white">
              <FaLock /> Gestión de Permisos
            </h2>
            <p className="text-gray-600 dark:text-white">
              Rol actual: <strong className="text-gray-800 dark:text-white/50">{usuario?.role}</strong>
            </p>
          </motion.div>

          <button
            onClick={() => setShowConfirm(true)}
            disabled={!hasChanges || isSaving}
            className={`w-full rounded px-4 py-2 text-white ${
              hasChanges && !isSaving ? "bg-blue-600 hover:bg-blue-700" : "cursor-not-allowed bg-gray-400"
            }`}
          >
            Guardar cambios
          </button>
        </>
      )}

      {/* Modales (se renderizan siempre) */}
      <Modal
        isOpen={showPasswordModal}
        title="Cambiar Contraseña"
        message={
          <div className="relative mt-2 w-full">
            {" "}
            {/* Contenedor para el input y el icono */}
            <input
              type={showNewPassword ? "text" : "password"} // Cambia el tipo de input
              placeholder="Nueva contraseña"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full rounded border p-2 pr-10 dark:bg-gray-700 dark:text-white" // Añade padding a la derecha
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)} // Toggle la visibilidad
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              aria-label={showNewPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />} {/* Icono de ojo */}
            </button>
          </div>
        }
        confirmText="Guardar"
        onConfirm={handlePasswordConfirm}
        onCancel={() => {
          setNewPassword("");
          setShowPasswordModal(false);
          setShowNewPassword(false); // Reinicia la visibilidad al cerrar el modal
        }}
      />

      <Modal
        isOpen={showConfirm}
        title="¿Guardar cambios?"
        message="¿Estás seguro de que quieres actualizar tu configuración?"
        onConfirm={handleSave}
        onCancel={() => setShowConfirm(false)}
        confirmText="Guardar"
        cancelText="Cancelar"
      />

      <Modal
        isOpen={showSuccess}
        onlyMessage
        title="¡Éxito!"
        message="La configuración fue actualizada correctamente."
        onClose={() => setShowSuccess(false)}
      />
    </motion.div>
  );
};

export default SettingsPage;
