"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { getCategorias, getProveedores, crearProducto } from "@/app/services/api";
import Modal from "@/components/modal/Modal";
import { AxiosError } from "axios";

interface Categoria {
  id: number;
  nombre: string;
}
interface Proveedor {
  id: number;
  nombre: string;
}

const NewProductPage = () => {
  const router = useRouter();

  const [product, setProduct] = useState({
    name: "",
    quantity: 0,
    description: "",
    category: 0,
    provider: 0,
    price: 0,
    image: null as File | null,
  });

  const [errors, setErrors] = useState({
    name: "",
    quantity: "",
    category: "",
    provider: "",
    price: "",
    image: "",
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCategorias().then(setCategorias).catch(console.error);
  }, []);
  useEffect(() => {
    getProveedores().then(setProveedores).catch(console.error);
  }, []);

  const validate = () => {
    const newErrors = {
      name: !product.name.trim() ? "El nombre es obligatorio." : "",
      quantity: product.quantity < 0 ? "La cantidad no puede ser negativa." : "",
      category: product.category === 0 ? "La categoría es obligatoria." : "",
      provider: product.provider === 0 ? "El proveedor es obligatorio." : "",
      price: product.price <= 0 ? "El precio debe ser un número positivo." : "",
      image: !product.image ? "La imagen es obligatoria." : "",
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((e) => !e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: ["quantity", "price", "category", "provider"].includes(name) ? Number(value) || 0 : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setProduct((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const archivo = product.image;
    if (archivo && !["image/png", "image/jpeg", "image/jpg"].includes(archivo.type)) {
      setError("Solo se permiten imágenes PNG, JPG o JPEG.");
      return;
    }

    const formData = new FormData();
    Object.entries(product).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (value instanceof File ) {
          formData.append(key, value); // Imagen o archivo
        } else {
          formData.append(key, String(value)); // Texto o número
        }
      }
    });

    setLoading(true);
    try {
      await crearProducto(formData);
      setSuccessMessage("¡Producto agregado correctamente!");
      setTimeout(() => router.push("/dashboard/productos"), 1500);
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      setError(err.response?.data?.message || "Error al agregar producto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl rounded-lg bg-white p-6 shadow-lg dark:bg-[#16033A]">
      <h1 className="title mt-4">Agregar Nuevo Producto</h1>

      {successMessage && <div className="mb-4 rounded-md bg-green-500 p-3 text-white">{successMessage}</div>}
      {error && <div className="mb-4 rounded-md bg-red-500 p-3 text-white">{error}</div>}

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        {/* Campos de formulario */}
        <input
          type="text"
          name="name"
          placeholder="Nombre del producto"
          value={product.name}
          onChange={handleChange}
          className={`input w-full ${errors.name ? "border-red-500" : ""}`}
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}

        <input
          type="number"
          name="quantity"
          placeholder="Cantidad"
          value={product.quantity}
          onChange={handleChange}
          className={`input w-full ${errors.quantity ? "border-red-500" : ""}`}
        />
        {errors.quantity && <p className="mt-1 text-sm text-red-500">{errors.quantity}</p>}

        <select
          name="category"
          value={product.category}
          onChange={handleChange}
          className={`input w-full ${errors.category ? "border-red-500" : ""}`}
        >
          <option value={0}>Selecciona una categoría</option>
          {categorias.map((c) => (
            <option
              key={c.id}
              value={c.id}
            >
              {c.nombre}
            </option>
          ))}
        </select>
        {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}

        <select
          name="provider"
          value={product.provider}
          onChange={handleChange}
          className={`input w-full ${errors.provider ? "border-red-500" : ""}`}
        >
          <option value={0}>Selecciona un proveedor</option>
          {proveedores.map((p) => (
            <option
              key={p.id}
              value={p.id}
            >
              {p.nombre}
            </option>
          ))}
        </select>
        {errors.provider && <p className="mt-1 text-sm text-red-500">{errors.provider}</p>}

        <input
          type="number"
          name="price"
          placeholder="Precio"
          step="0.01"
          value={product.price}
          onChange={handleChange}
          className={`input w-full ${errors.price ? "border-red-500" : ""}`}
        />
        {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}

        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          onChange={handleImageChange}
          className={`input w-full ${errors.image ? "border-red-500" : ""}`}
        />
        {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image}</p>}

        <textarea
          name="description"
          placeholder="Descripción (opcional)"
          value={product.description}
          onChange={handleChange}
          className="input w-full"
          rows={3}
        />

        <Button
          type="submit"
          variant="secondary"
          disabled={loading}
          className="w-full"
        >
          {loading ? "Agregando..." : "Agregar Producto"}
        </Button>
      </form>

      <Modal
        isOpen={!!error}
        title="Error al agregar producto"
        message={error}
        onlyMessage
        onClose={() => setError(null)}
      />
    </div>
  );
};

export default NewProductPage;
