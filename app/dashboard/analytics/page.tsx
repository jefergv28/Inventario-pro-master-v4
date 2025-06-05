"use client";

import Footer from "../layout/Footer";
import StockComparison from "./componest/StockComparison";
import SupplierBarChart from "./componest/SupplierBarChart";
import SupplierPieChart from "./componest/SupplierPieChart";
import { TrendOverTime, TrendStock } from "./componest/Trends";
import { motion } from "framer-motion";

// Variantes de animación para las tarjetas
const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 }, // Inicialmente oculto, más abajo y más pequeño
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const AnalyticsPage = () => (
  <motion.div
    className="p-6 transition-colors"
    initial="hidden"
    animate="visible"
    variants={{ visible: { transition: { staggerChildren: 0.2 } } }} // Anima de forma escalonada
  >
    <h1 className="title">Analítica de Inventario</h1>

    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {/* Productos más movidos */}
      <motion.div
        className="card rounded-2xl p-4 shadow-md"
        variants={cardVariants}
      >
        <h2 className="cart-title text-black dark:text-white">Productos más movidos</h2>
        <TrendStock />
      </motion.div>

      {/* Entradas vs Salidas en el tiempo */}
      <motion.div
        className="card rounded-2xl p-4 shadow-md"
        variants={cardVariants}
      >
        <h2 className="cart-title text-black dark:text-white">Entradas vs Salidas en el tiempo</h2>
        <TrendOverTime />
      </motion.div>

      {/* Comparación de stock actual vs. histórico */}
      <motion.div
        className="card col-span-1 rounded-2xl p-4 shadow-md md:col-span-2"
        variants={cardVariants}
      >
        <h2 className="cart-title text-black dark:text-white">Comparación de stock actual vs. histórico</h2>
        <StockComparison />
      </motion.div>

      {/* Distribución de proveedores */}
      <motion.div
        className="card rounded-2xl p-4 shadow-md"
        variants={cardVariants}
      >
        <h2 className="cart-title text-black dark:text-white">Distribución de proveedores</h2>
        <SupplierPieChart />
      </motion.div>

      {/* Productos más comprados por proveedor */}
      <motion.div
        className="card rounded-2xl p-4 shadow-md"
        variants={cardVariants}
      >
        <h2 className="cart-title text-black dark:text-white">Productos más comprados por proveedor</h2>
        <SupplierBarChart />
      </motion.div>
    </div>
    <Footer />
  </motion.div>
);

export default AnalyticsPage;
