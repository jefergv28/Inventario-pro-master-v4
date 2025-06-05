export interface ProductoBackend {
  id: number;
  nombreProducto: string;
  cantidadProducto: number;
  precioProducto: number;
  descripcionProducto: string;
  imageUrl: string;
  proveedor: {
    id: number;
    nombre: string;
    contacto: string;
  };
  categoria?: {
    id: number;
    nombre: string;  // Cambiado a "nombre"
  };
}

export interface Producto {
  id: number;
  nombreProducto: string;
  cantidadProducto: number;
  precioProducto: number;
  descripcionProducto: string;
  imageUrl: string;
  proveedor: {
    nombre: string;
  };
  categoria?: {
    id: number;
    nombre: string;  // Cambiado a "nombre"
  };
}

export function mapBackendProductoToProducto(data: ProductoBackend): Producto {
  return {
    id: data.id,
    nombreProducto: data.nombreProducto,
    cantidadProducto: data.cantidadProducto,
    precioProducto: data.precioProducto,
    descripcionProducto: data.descripcionProducto,
    imageUrl: data.imageUrl,
    proveedor: {
      nombre: data.proveedor.nombre,
    },
    categoria: data.categoria
      ? { id: data.categoria.id, nombre: data.categoria.nombre }
      : undefined,
  };
}
