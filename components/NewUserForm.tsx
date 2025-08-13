"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button"; // Este Button sí es de shadcn/ui y lo mantenemos
import { toast } from "sonner";
import api from "@/app/hooks/useApi";
import { Loader2 } from "lucide-react";

// Define las props que el componente puede recibir
type Permissions = {
  add?: boolean;
  editUser?: boolean;
  deleteUser?: boolean;
  createUser?: boolean; // Permiso para crear otros usuarios/empleados
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
  // Añade aquí cualquier otro permiso que tengas en tu backend
};

type UserToEdit = {
  id: string;
  name: string;
  email: string;
  role: string;
  permissionsJson: string; // El JSON de permisos como string
};

interface NewUserFormProps {
  onClose: () => void;
  onUserCreated?: () => void;
  userToEdit?: UserToEdit | null; // El usuario que se va a editar (opcional)
}

const NewUserForm = ({ onClose, onUserCreated, userToEdit }: NewUserFormProps) => {
  const isEditing = userToEdit !== null && userToEdit !== undefined;
  // Parsear el JSON de permisos si estamos editando
  const initialPermissions: Permissions = isEditing
    ? JSON.parse(userToEdit.permissionsJson || "{}")
    : {
        // Permisos por defecto para un nuevo usuario (empleado)
        add: false,
        editUser: false,
        deleteUser: false,
        createUser: false,
        viewProduct: true,
        addProduct: false,
        editProduct: false,
        deleteProduct: false,
        viewCategory: true,
        addCategory: false,
        editCategory: false,
        deleteCategory: false,
        viewProvider: true,
        addProvider: false,
        editProvider: false,
        deleteProvider: false,
      };

  const [name, setName] = useState(isEditing ? userToEdit.name : "");
  const [email, setEmail] = useState(isEditing ? userToEdit.email : "");
  const [password, setPassword] = useState("");
  // Aseguramos que el estado del rol use los mismos valores que el backend (ADMIN/EMPLOYEE)
  const [role, setRole] = useState(isEditing ? userToEdit.role : "EMPLOYEE");
  const [permissions, setPermissions] = useState<Permissions>(initialPermissions);
  const [isLoading, setIsLoading] = useState(false);

  // Lista COMPLETA de todos los permisos posibles (debe coincidir con el backend)
  const allPermissions: Array<keyof Permissions> = [
    "add",
    "editUser",
    "deleteUser",
    "createUser",
    "viewProduct",
    "addProduct",
    "editProduct",
    "deleteProduct",
    "viewCategory",
    "addCategory",
    "editCategory",
    "deleteCategory",
    "viewProvider",
    "addProvider",
    "editProvider",
    "deleteProvider",
  ];

  // Lógica para manejar el cambio de permisos
  const handlePermissionChange = (permission: keyof Permissions, checked: boolean) => {
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [permission]: checked,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const userData = {
      name,
      email,
      role: role, // El estado 'role' ya tiene el valor correcto (ADMIN/EMPLOYEE)
      password: isEditing ? undefined : password,
      permissionsJson: JSON.stringify(permissions), // <-- ¡CAMBIO CRÍTICO AQUÍ!
    };

    try {
      if (isEditing) {
        await api.put(`/api/usuarios/${userToEdit.id}`, userData);
        toast.success("Usuario actualizado correctamente.");
      } else {
        await api.post("/api/usuarios/crear-empleado", userData);
        toast.success("Usuario creado correctamente. ¡Ya puede iniciar sesión!");
      }
      onClose();
      if (onUserCreated) onUserCreated();
    } catch (error) {
      console.error("Error al guardar usuario:", error);
      toast.error("Error al guardar el usuario. Revisa los datos y los permisos.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4"
    >
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">{isEditing ? "Editar Usuario" : "Crear Usuario"}</h2>

      {/* Campo Nombre */}
      <div className="space-y-1">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Nombre
        </label>
        <input
          id="name"
          type="text"
          placeholder="Nombre Completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 w-full rounded-md border p-2 text-black focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
      </div>
      {/* Campo Email */}
      <div className="space-y-1">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Correo Electrónico
        </label>
        <input
          id="email"
          type="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 w-full rounded-md border p-2 text-black focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
      </div>

      {/* Campo Contraseña (solo para creación) */}
      {!isEditing && (
        <div className="space-y-1">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Contraseña Inicial
          </label>
          <input
            id="password"
            type="password"
            placeholder="Contraseña Inicial"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 w-full rounded-md border p-2 text-black focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>
      )}

      {/* Campo Rol */}
      <div className="space-y-1">
        <label
          htmlFor="role"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Rol
        </label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 bg-white p-2 text-gray-900 focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
        >
          <option value="EMPLOYEE">Empleado</option>
          <option value="ADMIN">Administrador</option>
        </select>
      </div>

      {/* Sección de Permisos */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Permisos</label>
        <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2">
          {allPermissions.map((permKey) => (
            <label
              key={permKey}
              htmlFor={permKey}
              className="flex cursor-pointer items-center space-x-2"
            >
              <input
                type="checkbox"
                id={permKey}
                name={permKey}
                checked={!!permissions[permKey]} // Usar !! para asegurar booleano
                onChange={(e) => handlePermissionChange(permKey, e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:checked:border-blue-600 dark:checked:bg-blue-600"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {/* Formatear el nombre del permiso para que sea más legible */}
                {permKey.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
              </span>
            </label>
          ))}
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : isEditing ? "Guardar Cambios" : "Crear Usuario"}
      </Button>
    </form>
  );
};

export default NewUserForm;
