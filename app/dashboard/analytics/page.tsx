"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api"; // 👈 Usamos el cliente centralizado
import Footer from "../layout/Footer";
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
        // Usamos el cliente `api` que ya incluye token y baseURL
        const mostMovedResponse = await api.get("/api/analiticas/productos-mas-movidos");
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
        <motion.div
          className="card col-span-1 rounded-2xl p-4 shadow-md md:col-span-2"
          variants={cardVariants}
        >
          <h2 className="cart-title text-black dark:text-white">Productos más movidos</h2>
          <TrendStock data={mostMovedProducts} />
        </motion.div>
      </div>
      <Footer />
    </motion.div>
  );
};

export default AnalyticsPage;
