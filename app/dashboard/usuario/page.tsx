"use client";

import { Button } from "@/components/ui/button";
import { Edit, Trash2, UserPlus, Loader2 } from "lucide-react";
import Footer from "../layout/Footer";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Modal from "@/components/modal/Modal";
import { toast } from "sonner";
import NewUserForm from "@/components/NewUserForm";
import { createApi } from "@/lib/api";

// Interfaz del usuario que viene del backend
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: Record<string, boolean>;
}

// Interfaz para edición en formulario
interface UserToEditForForm extends User {
  permissionsJson: string;
}

const UsersPage = () => {
  const [filter, setFilter] = useState("Todos");
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [userToDeleteId, setUserToDeleteId] = useState<string | null>(null);
  const [userToEdit, setUserToEdit] = useState<UserToEditForForm | null>(null);

  // Inicializa el cliente API con showModal
  const showModal = (msg: React.ReactNode = "Ocurrió un error") => {
    toast.error(msg?.toString());
  };

  const api = createApi(showModal);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get<User[]>("/api/usuarios/empleados");
      setUsers(response.data);
    } catch (error: unknown) {
      console.error("Error al cargar usuarios:", error);

      let message = "No se pudieron cargar los usuarios.";

      // Validamos si error es un objeto con la propiedad response
      if (typeof error === "object" && error !== null && "response" in error) {
        const e = error as { response?: { data?: { message?: string } } };
        message = e.response?.data?.message || message;
      }

      toast.error(message);
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  }, [api]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Crear usuario
  const handleCreateUser = () => {
    setUserToEdit(null);
    setIsFormModalOpen(true);
  };

  // Editar usuario
  const handleEditClick = (user: User) => {
    setUserToEdit({
      ...user,
      permissionsJson: JSON.stringify(user.permissions || {}),
    });
    setIsFormModalOpen(true);
  };

  // Iniciar eliminación
  const handleInitiateDelete = (userId: string) => {
    setUserToDeleteId(userId);
    setIsConfirmModalOpen(true);
  };

  // Confirmar eliminación
  const handleDeleteConfirmed = async () => {
    if (!userToDeleteId) return;
    try {
      await api.delete(`/api/usuarios/${userToDeleteId}`);
      toast.success("Usuario eliminado correctamente.");
      setUsers(users.filter((u) => u.id !== userToDeleteId));
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      toast.error("No se pudo eliminar el usuario. Revisa tus permisos.");
    } finally {
      setIsConfirmModalOpen(false);
      setUserToDeleteId(null);
    }
  };

  // Cerrar modal de formulario
  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setUserToEdit(null);
  };

  // Cerrar modal de confirmación
  const handleCloseConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setUserToDeleteId(null);
  };

  // Filtrar usuarios
  const filteredUsers = filter === "Todos" ? users : users.filter((u) => u.role === filter);

  return (
    <div className="mt-0 space-y-6 p-6">
      {/* Header */}
      <div className="card-header flex items-center justify-between">
        <p className="title">Usuarios</p>
        <Button onClick={handleCreateUser}>
          <UserPlus className="mr-2 h-5 w-5" /> Crear Usuario
        </Button>
      </div>

      {/* Filtro */}
      <div className="flex items-center gap-4">
        <select
          className="rounded border p-2 text-black dark:text-white"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="Todos">Todos</option>
          <option value="ADMIN">Administradores</option>
          <option value="EMPLOYEE">Empleados</option>
        </select>
      </div>

      {/* Tabla o Loader */}
      {isLoading ? (
        <div className="flex items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="p-8 text-center text-gray-500 dark:text-gray-400">
          <p>No hay usuarios registrados.</p>
        </div>
      ) : (
        <div className="card">
          <div className="card-body p-0">
            <div className="relative h-[500px] w-full overflow-auto">
              <table className="table">
                <thead className="table-header">
                  <tr className="table-row">
                    <th className="table-head">Nombre</th>
                    <th className="table-head">Email</th>
                    <th className="table-head">Rol</th>
                    <th className="table-head">Acciones</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {filteredUsers.map((user, index) => (
                    <motion.tr
                      key={user.id}
                      className="table-row"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
                    >
                      <td className="table-cell">{user.name}</td>
                      <td className="table-cell">{user.email}</td>
                      <td className="table-cell">{user.role}</td>
                      <td className="table-cell">
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            onClick={() => handleEditClick(user)}
                          >
                            <Edit className="mr-2 h-5 w-5" /> Editar
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => handleInitiateDelete(user.id)}
                          >
                            <Trash2 className="mr-2 h-5 w-5" /> Eliminar
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <Footer />

      {/* Modal de formulario */}
      <Modal
        isOpen={isFormModalOpen}
        title={userToEdit ? "Editar Usuario" : "Registrar Nuevo Usuario"}
        onCancel={handleCloseFormModal}
        confirmText="Guardar"
        cancelText="Cancelar"
        onlyMessage={false}
      >
        <NewUserForm
          onClose={handleCloseFormModal}
          onUserCreated={fetchUsers}
          userToEdit={userToEdit}
        />
      </Modal>

      {/* Modal de confirmación */}
      <Modal
        isOpen={isConfirmModalOpen}
        title="Confirmar Eliminación"
        message="¿Estás seguro de que quieres eliminar este usuario? Esta acción es irreversible."
        onConfirm={handleDeleteConfirmed}
        onCancel={handleCloseConfirmModal}
        confirmText="Eliminar"
        cancelText="Cancelar"
        onlyMessage={false}
      />
    </div>
  );
};

export default UsersPage;
