"use client";

import { Button } from "@/components/ui/button";
import { Filter, Loader2, Eye } from "lucide-react";
import Footer from "../layout/Footer";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Modal from "@/components/modal/Modal";
import { createApi } from "@/lib/api";

type User = {
  id: string;
  name: string;
  email: string;
  status: "PENDING" | "APPROVED" | "DENIED";
  permissionsJson: string;
};

type Permissions = {
  [key: string]: boolean;
};

const VerifiedUsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPermissionsModalOpen, setIsPermissionsModalOpen] = useState(false);
  const [permissionsToView, setPermissionsToView] = useState<Permissions | null>(null);

  const showModal = (msg: React.ReactNode) => {
    alert(msg); // o un toast/modal personalizado
  };

  const api = createApi(showModal); // ✅ ahora sí se usa

  const fetchApprovedUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/api/usuarios/empleados");
      const approvedUsers = response.data.filter((user: User) => user.status === "APPROVED");
      setUsers(approvedUsers);
    } catch (error: unknown) {
      console.error("Error al cargar usuarios aprobados:", error);

      let message = "No se pudieron cargar los usuarios.";
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
    fetchApprovedUsers();
  }, [fetchApprovedUsers]);

  const handleViewPermissions = (permissionsJson: string) => {
    try {
      setPermissionsToView(JSON.parse(permissionsJson));
      setIsPermissionsModalOpen(true);
    } catch (error) {
      console.error("Error al parsear permisos:", error);
      toast.error("No se pudieron cargar los permisos de este usuario.");
    }
  };

  const handleClosePermissionsModal = () => {
    setIsPermissionsModalOpen(false);
    setPermissionsToView(null);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Encabezado */}
      <div className="card-header">
        <p className="title">Usuarios Aprobados</p>
      </div>

      {/* Filtro (opcional) */}
      <div className="flex items-center gap-4">
        <Button variant="outline">
          <Filter className="mr-2 h-5 w-5" />
          Filtrar
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      ) : users.length === 0 ? (
        <div className="p-8 text-center text-gray-500 dark:text-gray-400">
          <p>No hay usuarios aprobados.</p>
        </div>
      ) : (
        <div className="card">
          <div className="card-body p-0">
            <div className="relative h-[500px] w-full overflow-auto rounded-none [scrollbar-width:_thin]">
              <table className="table">
                <thead className="table-header">
                  <tr className="table-row">
                    <th className="table-head">Nombre</th>
                    <th className="table-head">Correo</th>
                    <th className="table-head">Permisos</th>
                    <th className="table-head">Estado</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {users.map((user, index) => (
                    <motion.tr
                      key={user.id}
                      className="table-row"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <td className="table-cell">{user.name}</td>
                      <td className="table-cell">{user.email}</td>
                      <td className="table-cell">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewPermissions(user.permissionsJson)}
                        >
                          <Eye className="mr-1 h-4 w-4" /> Ver Permisos
                        </Button>
                      </td>
                      <td className="table-cell">
                        <span className="font-medium text-green-600 dark:text-green-400">Aprobado</span>
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

      {/* Modal para ver permisos */}
      <Modal
        isOpen={isPermissionsModalOpen}
        title="Permisos del Usuario"
        onClose={handleClosePermissionsModal}
        onlyMessage
        confirmText="OK"
      >
        {permissionsToView && (
          <div className="grid grid-cols-2 gap-2 text-gray-900 dark:text-gray-200">
            {Object.entries(permissionsToView).map(([permKey, permValue]) => (
              <div
                key={permKey}
                className="flex items-center space-x-2"
              >
                <span className={`font-medium ${permValue ? "text-green-500" : "text-red-500"}`}>{permValue ? "✓" : "✗"}</span>
                <span>{permKey.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}</span>
              </div>
            ))}
            {Object.keys(permissionsToView).length === 0 && (
              <p className="col-span-2 text-center text-gray-500">No hay permisos definidos para este usuario.</p>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default VerifiedUsersPage;
