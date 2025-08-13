import api from "../hooks/useApi";

export interface Producto {
  id?: number;
  name: string;
  quantity: number;
  description: string;
  category: number;
  provider: number;
  price: number;
  image: File | null;
}

const agregarProducto = async (producto: Producto, token: string) => {
  try {
    const formData = new FormData();
    formData.append("name", producto.name);
    formData.append("quantity", producto.quantity.toString());
    formData.append("description", producto.description);
    formData.append("categoryId", producto.category.toString());
    formData.append("providerId", producto.provider.toString());

    formData.append("price", producto.price.toString());

    if (producto.image instanceof File) {
      formData.append("image", producto.image);
    }

    const response = await api.post("/productos", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (err) {

    throw err;
  }
};

export default agregarProducto;