"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Filter, Edit, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import useProductos from "@/app/hooks/useProductos";
import Cookies from "js-cookie";
import api from "@/app/hooks/useApi";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Componente Modal con Tailwind
const Modal = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  onClose,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  onlyMessage = false,
}: {
  isOpen: boolean;
  title?: string;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
  confirmText?: string;
  cancelText?: string;
  onlyMessage?: boolean;
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm" />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
          {title && <h3 className="mb-4 text-xl font-semibold">{title}</h3>}
          <p className="mb-6">{message}</p>

          <div className="flex justify-end space-x-3">
            {!onlyMessage && (
              <>
                <button
                  onClick={onCancel}
                  className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
                >
                  {cancelText}
                </button>
                <button
                  onClick={onConfirm}
                  className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                >
                  {confirmText}
                </button>
              </>
            )}
            {onlyMessage && (
              <button
                onClick={onClose}
                className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                OK
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const ProductsPage = () => {
  const { productos = [], loading, error } = useProductos();
  const [filterCategory, setFilterCategory] = useState("Todos");
  const [filterProvider, setFilterProvider] = useState("Todos");
  const [localProductos, setLocalProductos] = useState(productos);
  const router = useRouter();

  // Nuevos estados para modal
  const [modalOpen, setModalOpen] = useState(false);
  const [productoAEliminar, setProductoAEliminar] = useState<number | null>(null);
  const [modalMensajeOpen, setModalMensajeOpen] = useState(false);
  const [mensaje, setMensaje] = useState("");

  // Actualizar localProductos cuando cambien productos de hook
  useEffect(() => {
    setLocalProductos(productos);
  }, [productos]);

  const categorias = ["Todos", ...Array.from(new Set(localProductos.map((p) => p.categoria?.nombre || "Desconocida")))];

  const proveedores = ["Todos", ...Array.from(new Set(localProductos.map((p) => p.proveedor?.nombre || "Desconocido")))];

  const filteredProducts = localProductos.filter(
    (product) =>
      (filterCategory === "Todos" || product.categoria?.nombre === filterCategory) &&
      (filterProvider === "Todos" || product.proveedor?.nombre === filterProvider),
  );

  console.log("Productos filtrados:", filteredProducts);

  const handleEdit = (id: number) => {
    router.push(`/dashboard/productos/editar/${id}`);
  };

  // En lugar de eliminar directamente, abrimos modal para confirmar
  const abrirConfirmacionEliminar = (id: number) => {
    setProductoAEliminar(id);
    setModalOpen(true);
  };

  const confirmarEliminar = async () => {
    if (productoAEliminar === null) return;
    setModalOpen(false);

    try {
      const token = Cookies.get("token");
      if (!token) throw new Error("Usuario no autenticado");

      await api.delete(`/productos/${productoAEliminar}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setLocalProductos((prev) => prev.filter((p) => p.id !== productoAEliminar));
      setMensaje("Producto eliminado con éxito.");
      setModalMensajeOpen(true);
      setProductoAEliminar(null);
    } catch (err) {
      console.error("Error eliminando producto:", err);
      setMensaje("No se pudo eliminar el producto.");
      setModalMensajeOpen(true);
    }
  };

  const cerrarModalMensaje = () => {
    setModalMensajeOpen(false);
  };

  if (loading) return <p aria-live="polite">Cargando productos...</p>;
  if (error) return <p className="text-red-500">Error al cargar productos: {error}</p>;

  return (
    <div className="space-y-6 p-6">
      <div className="card-header">
        <p className="title">Productos</p>
      </div>

      <div className="flex items-center gap-4">
        <select
          className="rounded border p-2 text-black dark:text-white"
          onChange={(e) => setFilterCategory(e.target.value)}
          value={filterCategory}
        >
          {categorias.map((categoria) => (
            <option
              key={categoria}
              value={categoria}
            >
              {categoria}
            </option>
          ))}
        </select>

        <select
          className="rounded border p-2 text-black dark:text-white"
          onChange={(e) => setFilterProvider(e.target.value)}
          value={filterProvider}
        >
          {proveedores.map((proveedor) => (
            <option
              key={proveedor}
              value={proveedor}
            >
              {proveedor}
            </option>
          ))}
        </select>

        <Button
          variant="outline"
          onClick={() => {
            setFilterCategory("Todos");
            setFilterProvider("Todos");
          }}
        >
          <Filter className="mr-2 h-5 w-5" />
          Limpiar Filtros
        </Button>
      </div>

      <div className="card">
        <div className="card-body p-0">
          <div className="relative h-[500px] w-full flex-shrink-0 overflow-auto rounded-none [scrollbar-width:_thin]">
            {filteredProducts.length === 0 ? (
              <p className="text-center text-gray-500">No hay productos disponibles con los filtros seleccionados.</p>
            ) : (
              <table className="table">
                <thead className="table-header">
                  <tr className="table-row">
                    <th className="table-head">Imagen</th>
                    <th className="table-head">Nombre</th>
                    <th className="table-head">Cantidad</th>
                    <th className="table-head">Precio</th>
                    <th className="table-head">Categoría</th>
                    <th className="table-head">Proveedor</th>
                    <th className="table-head">Acciones</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {filteredProducts.map((product, index) => (
                    <motion.tr
                      key={product.id}
                      className="table-row"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <td className="table-cell">
                        {product.imageUrl && product.imageUrl.startsWith("/uploads") ? (
                          <Image
                            src={`http://localhost:8000${product.imageUrl}`} // ✅ Usa "product", que sí está definido
                            alt={product.nombreProducto}
                            width={48} // 12 * 4 (tailwind 12 = 3rem = 48px)
                            height={48}
                            className="rounded object-cover"
                          />
                        ) : (
                          <span className="text-gray-400">Sin imagen</span>
                        )}
                      </td>
                      <td className="table-cell">{product.nombreProducto}</td>
                      <td className="table-cell">{product.cantidadProducto}</td>
                      <td className="table-cell">
                        {typeof product.precioProducto === "number" ? `$${product.precioProducto.toLocaleString()}` : "—"}
                      </td>
                      <td className="table-cell">{product.categoria?.nombre || "Desconocida"}</td>
                      <td className="table-cell">{product.proveedor?.nombre || "Desconocido"}</td>
                      <td className="table-cell">
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            onClick={() => handleEdit(product.id)}
                          >
                            <Edit className="mr-2 h-5 w-5" />
                            Editar
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => abrirConfirmacionEliminar(product.id)}
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
            )}
          </div>
        </div>
      </div>

      {/* Modal para confirmar eliminación */}
      <Modal
        isOpen={modalOpen}
        title="Confirmar eliminación"
        message="¿Estás seguro de eliminar este producto?"
        onConfirm={confirmarEliminar}
        onCancel={() => setModalOpen(false)}
        confirmText="Eliminar"
        cancelText="Cancelar"
      />

      {/* Modal para mensaje de éxito o error */}
      <Modal
        isOpen={modalMensajeOpen}
        message={mensaje}
        onlyMessage={true}
        onClose={cerrarModalMensaje}
      />
    </div>
  );
};

export default ProductsPage;
