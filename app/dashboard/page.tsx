"use client";

import { AlertTriangle, List, Package, TrendingUp, Layers } from "lucide-react";
import { useTheme } from "../hooks/use-theme";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Image from "next/image";
import Footer from "./layout/Footer";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { createApi } from "@/lib/api";

interface JwtPayload {
  exp: number;
}

interface Product {
  id: number;
  // Cambia 'name' por 'nombreProducto'
  nombreProducto: string;
  // Cambia 'price' por 'precioProducto'
  precioProducto: number;
  // Cambia 'quantity' por 'cantidadProducto'
  cantidadProducto: number;
  // Cambia 'description' por 'descripcionProducto'
  descripcionProducto: string;
  imageUrl: string;
  category: {
    id: number;
    nombre: string;
  };
}

export default function Dashboard() {
  const router = useRouter();
  const { theme } = useTheme();

  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [lowStockProducts, setLowStockProducts] = useState(0);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const token = Cookies.get("token");

  useEffect(() => {
    if (!token) {
      router.push("/auth/login?expired=1");
      return;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const now = Date.now() / 1000;
      if (decoded.exp < now) {
        Cookies.remove("token");
        router.push("/auth/login?expired=1");
      } else {
        // Llama a la función principal que carga todos los datos
        fetchDashboardData();
      }
    } catch {
      Cookies.remove("token");
      router.push("/auth/login?expired=1");
    }
  }, [router, token]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Usando el hook de la API para todas las peticiones
      const dashboardResponse = await api.get("/api/v1/dashboard");
      const productsResponse = await api.get("/productos");
      const recentProductsResponse = await api.get("/productos/recientes");

      setTotalProducts(dashboardResponse?.data?.totalProductos ?? 0);
      setTotalCategories(dashboardResponse?.data?.totalCategorias ?? 0);
      setLowStockProducts(dashboardResponse?.data?.stockBajo ?? 0);
      setAllProducts(productsResponse.data);
      setRecentProducts(recentProductsResponse.data);
    } catch (error) {
      console.error("Error al obtener los datos del dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center">Cargando datos del dashboard...</p>;
  }

  return (
    <div className="flex flex-col gap-y-4">
      <h1 className="title">Dashboard</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* Usando los datos de la API */}
        <Card
          icon={<Package size={26} />}
          title="Productos Totales"
          value={totalProducts.toString()}
          percentage="25%"
        />
        <Card
          icon={<AlertTriangle size={26} />}
          title="Stock Bajo"
          value={lowStockProducts.toString()}
          percentage="6%"
        />
        <Card
          icon={<List size={26} />}
          title="Últimos Movimientos"
          value="15,400"
          percentage=""
        />
        <Card
          icon={<Layers size={26} />}
          title="Categorías de Productos"
          value={`${totalCategories} categorías`}
          percentage=""
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="card col-span-1 md:col-span-2 lg:col-span-4">
          <div className="card-header">
            <p className="card-title">Descripción general</p>
          </div>
          <div className="card-body p-0">
            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <AreaChart
                data={overviewData}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="colorTotal"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="#2563eb"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="#2563eb"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <Tooltip
                  cursor={false}
                  formatter={(value) => `$${value}`}
                />
                <XAxis
                  dataKey="name"
                  strokeWidth={0}
                  stroke={theme === "light" ? "#475569" : "#94a3b8"}
                  tickMargin={6}
                />
                <YAxis
                  dataKey="total"
                  strokeWidth={0}
                  stroke={theme === "light" ? "#475569" : "#94a3b8"}
                  tickFormatter={(value) => `$${value}`}
                  tickMargin={6}
                />
                <Area
                  type="monotone"
                  dataKey="total"
                  stroke="#2563eb"
                  fillOpacity={1}
                  fill="url(#colorTotal)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card col-span-1 md:col-span-2 lg:col-span-3">
          <div className="card-header">
            <p className="card-title">Últimos Productos Agregados</p>
          </div>
          <div className="card-body h-[300px] overflow-auto p-0">
            {Array.isArray(recentProducts) &&
              recentProducts.map((product: Product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between gap-x-4 py-2 pr-2"
                >
                  <Image
                    src={product.imageUrl || "/uploads/default.jpg"}
                    alt={product.nombreProducto || "Imagen de producto"}
                    width={40}
                    height={40}
                    className="size-10 flex-shrink-0 rounded-full object-cover"
                  />
                  <div className="flex flex-col gap-y-2">
                    <p className="font-medium text-slate-900 dark:text-slate-50">{product.nombreProducto}</p>
                    <p className="font-sm text-slate-600 dark:text-slate-400">{product.category?.nombre}</p>
                  </div>
                  <p className="font-medium text-slate-900 dark:text-slate-50">Cantidad: {product.cantidadProducto}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header">
          <p className="card-title">Productos</p>
        </div>
        <div className="card-body p-0">
          <div className="relative h-[500px] w-full flex-shrink-0 overflow-auto rounded-none [scrollbar-width:_thin]">
            <table className="table">
              <thead className="table-header">
                <tr className="table-row">
                  <th className="table-head">#</th>
                  <th className="table-head">Imagen</th>
                  <th className="table-head">Producto</th>
                  <th className="table-head">Precio</th>
                  <th className="table-head">Cantidad</th>
                  <th className="table-head">Descripción</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {Array.isArray(allProducts) &&
                  allProducts.map((product, index) => (
                    <motion.tr
                      key={product.id}
                      className="table-row"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <td className="table-cell">{product.id}</td>
                      <td className="table-cell">
                        {" "}
                        {/* Nueva celda para la imagen */}
                        <Image
                          src={product.imageUrl || "/uploads/default.jpg"}
                          alt={product.nombreProducto || "Imagen de producto"}
                          width={40}
                          height={40}
                          className="size-10 flex-shrink-0 rounded-full object-cover"
                        />
                      </td>
                      <td className="table-cell">
                        <div className="flex w-max gap-x-4">
                          <div className="flex flex-col">
                            <p>{product.nombreProducto}</p>
                            <p className="font-normal text-slate-600 dark:text-slate-400">{product.category?.nombre}</p>
                          </div>
                        </div>
                      </td>
                      <td className="table-cell">${product.precioProducto}</td>
                      <td className="table-cell">{product.cantidadProducto} unds</td>
                      <td className="table-cell">
                        <div className="flex items-center gap-x-2">{product.descripcionProducto}</div>
                      </td>
                      {/* La columna de acciones ha sido eliminada */}
                    </motion.tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// ... (El componente Card se mantiene igual)
interface CardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  percentage?: string;
}

function Card({ icon, title, value, percentage }: CardProps) {
  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="card-header">
        <div className="w-fit rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">{icon}</div>
        <p className="card-title">{title}</p>
      </div>
      <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
        <p className="text-3xl font-bold text-slate-900 transition-colors dark:text-slate-50">{value}</p>
        {percentage && (
          <span className="flex w-fit items-center gap-x-2 rounded-full border border-blue-400 px-2 py-1 font-medium text-blue-500 dark:border-blue-600 dark:text-blue-600">
            <TrendingUp size={18} />
            {percentage}
          </span>
        )}
      </div>
    </motion.div>
  );
}

const overviewData = [
  { name: "Enero", total: 100 },
  { name: "Febrero", total: 200 },
  { name: "Marzo", total: 150 },
  { name: "Abril", total: 300 },
  { name: "Mayo", total: 250 },
  { name: "Junio", total: 400 },
];
