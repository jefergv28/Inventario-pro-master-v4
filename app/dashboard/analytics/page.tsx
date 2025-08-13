"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import Footer from "../layout/Footer";
// Importa solo los componentes que vas a usar
// import StockComparison from "./componest/StockComparison";
// import SupplierBarChart from "./componest/SupplierBarChart";
// import SupplierPieChart from "./componest/SupplierPieChart";
import { TrendStock } from "./componest/Trends";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
    },
  },
};

const AnalyticsPage = () => {
  const [mostMovedProducts, setMostMovedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const backendUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/analiticas`;
        const token = Cookies.get("token");
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        // Petición solo para Productos más movidos
        const mostMovedResponse = await axios.get(`${backendUrl}/productos-mas-movidos`, { headers });
        setMostMovedProducts(mostMovedResponse.data);

        setLoading(false);
      } catch (err) {
        console.error("Error al obtener datos de analíticas:", err);
        setError("No se pudieron cargar los datos.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-6 text-center">Cargando datos de analítica...</div>;
  if (error) return <div className="p-6 text-center text-red-500">Error: {error}</div>;

  return (
    <motion.div
      className="p-6 transition-colors"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
    >
      <h1 className="title">Analítica de Inventario</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Mantenemos solo el componente de Productos más movidos */}
        <motion.div
          className="card col-span-1 rounded-2xl p-4 shadow-md md:col-span-2"
          variants={cardVariants}
        >
          <h2 className="cart-title text-black dark:text-white">Productos más movidos</h2>
          <TrendStock data={mostMovedProducts} />
        </motion.div>

        {/* Comentamos los demás gráficos */}
        {/*
        <motion.div
          className="card rounded-2xl p-4 shadow-md"
          variants={cardVariants}
        >
          <h2 className="cart-title text-black dark:text-white">Entradas vs Salidas en el tiempo</h2>
          <TrendOverTime data={trendOverTimeData} />
        </motion.div>
        */}
        {/*
        <motion.div
          className="card col-span-1 rounded-2xl p-4 shadow-md md:col-span-2"
          variants={cardVariants}
        >
          <h2 className="cart-title text-black dark:text-white">Comparación de stock actual vs. histórico</h2>
          <StockComparison />
        </motion.div>
        */}
        {/*
        <motion.div
          className="card rounded-2xl p-4 shadow-md"
          variants={cardVariants}
        >
          <h2 className="cart-title text-black dark:text-white">Distribución de proveedores</h2>
          <SupplierPieChart />
        </motion.div>
        */}
        {/*
        <motion.div
          className="card rounded-2xl p-4 shadow-md"
          variants={cardVariants}
        >
          <h2 className="cart-title text-black dark:text-white">Productos más comprados por proveedor</h2>
          <SupplierBarChart />
        </motion.div>
        */}
      </div>
      <Footer />
    </motion.div>
  );
};

export default AnalyticsPage;
