"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { Producto } from "@/app/services/agregarProducto";
import useEditarProducto from "@/app/hooks/useEditarProducto";

interface Categoria {
  id: number;
  nombre: string;
}

interface Proveedor {
  id: number;
  nombre: string;
  contacto: string;
  usuario: {
    id: number;
    name: string;
    email: string;
  };
}

const EditProductPage = () => {
  const router = useRouter();
  const { id: productId } = useParams();
  const productIdString = Array.isArray(productId) ? productId[0] : productId;

  const { editarProducto, loading, error } = useEditarProducto();

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

  useEffect(() => {
    if (!productIdString) return;

    const fetchProducto = async () => {
      try {
        const token = Cookies.get("token");
        console.log("Token en fetchProducto:", token);
        if (!token) {
          console.error("No hay token disponible");
          throw new Error("Usuario no autenticado");
        }

        const response = await fetch(`http://localhost:8000/productos/${productIdString}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Error al obtener el producto");

        const data = await response.json();

        setProduct({
          name: data.nombreProducto,
          quantity: data.cantidadProducto,
          description: data.descripcionProducto,
          category: data.categoria.id,
          provider: data.proveedor.id,
          price: data.precioProducto,
          image: null,
        });
      } catch (err) {
        console.error("Error al cargar producto:", err);
      }
    };

    fetchProducto();
  }, [productIdString]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await fetch("http://localhost:8000/categorias");
        if (!res.ok) throw new Error("Error al obtener categorías");
        const data = await res.json();
        setCategorias(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCategorias();
  }, []);

  useEffect(() => {
    const fetchProveedores = async () => {
      try {
        const token = Cookies.get("token");
        const res = await fetch("http://localhost:8000/proveedores", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Error al obtener proveedores");
        const data = await res.json();
        setProveedores(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProveedores();
  }, []);

  const validate = () => {
    const newErrors = {
      name: !product.name.trim() ? "El nombre es obligatorio." : "",
      quantity: product.quantity < 0 ? "La cantidad no puede ser negativa." : "",
      category: product.category === 0 ? "La categoría es obligatoria." : "",
      provider: product.provider === 0 ? "El proveedor es obligatorio." : "",
      price: product.price <= 0 ? "El precio debe ser un número positivo." : "",
      image: "", // No obligamos a subir nueva imagen
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
    if (e.target.files && e.target.files.length > 0) {
      setProduct((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || !productIdString) return;

    const producto: Producto = {
      id: Number(productIdString),
      name: product.name,
      quantity: product.quantity,
      description: product.description,
      category: product.category,
      provider: product.provider,
      price: product.price,
      image: product.image,
    };

    await editarProducto(productIdString, producto);
    setSuccessMessage("¡Producto actualizado correctamente!");
    setTimeout(() => {
      router.push("/dashboard/productos");
    }, 1500);
  };

  return (
    <div className="mx-auto max-w-xl rounded-lg bg-white p-6 shadow-lg dark:bg-[#16033A]">
      <h1 className="title mt-4">Editar Producto</h1>

      {successMessage && <div className="mb-4 rounded-md bg-green-500 p-3 text-white">{successMessage}</div>}
      {error && <div className="mb-4 rounded-md bg-red-500 p-3 text-white">{error}</div>}

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
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
          value={product.price}
          onChange={handleChange}
          step="0.01"
          className={`input w-full ${errors.price ? "border-red-500" : ""}`}
        />
        {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className={`input w-full`}
        />

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
          variant="default"
          disabled={loading}
          className="w-full"
        >
          {loading ? "Actualizando..." : "Actualizar Producto"}
        </Button>
      </form>
    </div>
  );
};

export default EditProductPage;
