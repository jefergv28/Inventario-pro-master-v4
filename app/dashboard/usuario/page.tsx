"use client";

import { Button } from "@/components/ui/button";
import { Edit, Trash2, UserPlus, Loader2 } from "lucide-react";
import Footer from "../layout/Footer";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Modal from "@/components/modal/Modal";
import { toast } from "sonner";
import NewUserForm from "@/components/NewUserForm";
import api from "@/lib/api";


// Define la interfaz del usuario que llega desde el backend
type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  // Asumimos que el backend envía un OBJETO de permisos, no un string
  permissions: {
    add?: boolean;
    editUser?: boolean;
    deleteUser?: boolean;
    createUser?: boolean;
    viewProduct?: boolean;
    addProduct?: boolean;
    editProduct?: boolean;
    deleteProduct?: boolean;
    viewCategory?: boolean;
    addCategory?: boolean;
    editCategory?: boolean;
    deleteCategory?: boolean;
    viewProvider?: boolean;
    addProvider?: boolean;
    editProvider?: boolean;
    deleteProvider?: boolean;
  };
};

// Interfaz para el usuario que se pasa al NewUserForm para edición
// Contiene el 'permissions' del backend convertido a 'permissionsJson'
interface UserToEditForForm extends User {
  permissionsJson: string;
}

const UsersPage = () => {
  const [filter, setFilter] = useState("Todos");
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [userToDeleteId, setUserToDeleteId] = useState<string | null>(null);
  const [userToEdit, setUserToEdit] = useState<UserToEditForForm | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/api/usuarios/empleados");
      setUsers(response.data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
      toast.error("No se pudieron cargar los usuarios.");
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = () => {
    setUserToEdit(null);
    setIsFormModalOpen(true);
  };

  // Lógica para preparar los datos del usuario antes de pasarlos al formulario
  const handleEditClick = (user: User) => {
    const userForForm: UserToEditForForm = {
      ...user,
      // Convertimos el objeto 'permissions' a un string JSON para el formulario
      permissionsJson: JSON.stringify(user.permissions || {}),
    };
    setUserToEdit(userForForm);
    setIsFormModalOpen(true);
  };

  const handleInitiateDelete = (userId: string) => {
    setUserToDeleteId(userId);
    setIsConfirmModalOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    if (userToDeleteId) {
      try {
        await api.delete(`/api/usuarios/${userToDeleteId}`);
        toast.success("Usuario eliminado correctamente.");
        fetchUsers();
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
        toast.error("No se pudo eliminar el usuario. Revisa tus permisos.");
      } finally {
        setIsConfirmModalOpen(false);
        setUserToDeleteId(null);
      }
    }
  };

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setUserToEdit(null);
    fetchUsers();
  };

  const handleCloseConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setUserToDeleteId(null);
  };

  const filteredUsers = filter === "Todos" ? users : users.filter((user) => user.role === filter);

  return (
    <div className="mt-0 space-y-6 p-6">
      <div className="card-header flex items-center justify-between">
        <p className="title">Usuarios</p>
        <Button onClick={handleCreateUser}>
          <UserPlus className="mr-2 h-5 w-5" />
          Crear Usuario
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <select
          className="rounded border p-2 text-black dark:text-white"
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
        >
          <option value="Todos">Todos</option>
          <option value="ADMIN">Administradores</option>
          <option value="EMPLOYEE">Empleados</option>
        </select>
        <Button variant="outline">Filtrar</Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      ) : users.length === 0 ? (
        <div className="p-8 text-center text-gray-500 dark:text-gray-400">
          <p>No hay usuarios registrados.</p>
        </div>
      ) : (
        <div className="card">
          <div className="card-body p-0">
            <div className="relative h-[500px] w-full flex-shrink-0 overflow-auto rounded-none [scrollbar-width:_thin]">
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
                      transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
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
                            <Edit className="mr-2 h-5 w-5" />
                            Editar
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => handleInitiateDelete(user.id)}
                          >
                            <Trash2 className="mr-2 h-5 w-5" />
                            Eliminar
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
