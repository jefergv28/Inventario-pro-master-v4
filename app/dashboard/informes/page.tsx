"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Footer from "../layout/Footer";
import { AxiosRequestConfig } from "axios"; // <-- Importa el tipo de configuración de Axios
import { createApi } from "@/lib/api";
import { useModal } from "@/app/context/ModalContext";

// Se usan para la animación de los botones
const buttonVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

// Esta es la ruta base para tu API de reportes.
const backendUrl = "/api/inventory-reports";

// Define la estructura de la respuesta de tu backend
interface ReportDTO {
  id: number;
  reportName: string;
  filename: string;
  reportType: "pdf" | "excel";
  createdAt: string;
}

const InformesPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // Declaramos el hook del modal para usar la función showModal

  const { showModal } = useModal();
  const api = createApi(showModal); // Creamos la instancia de api con el modal
  // Función para descargar archivos

  const handleDownload = (data: Blob, filename: string) => {
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  }; // Función genérica para generar y descargar reportes

  const generateAndDownloadReport = async (reportType: "pdf" | "excel") => {
    setLoading(true);
    setError(null);

    try {
      const generateResponse = await api.post<ReportDTO>(`${backendUrl}/generate-${reportType}`, {});

      const filename = generateResponse.data.filename; // Se tipifica la constante con 'AxiosRequestConfig' para resolver el error

      const downloadConfig: AxiosRequestConfig = {
        responseType: "blob", // El tipo 'blob' es aceptado ahora
      };

      const downloadResponse = await api.get(`${backendUrl}/download/${filename}`, downloadConfig);

      handleDownload(downloadResponse.data, filename);

      setLoading(false);
    } catch (err) {
      console.error(`Error al generar o descargar el informe de ${reportType}:`, err);
      setError(`Ocurrió un error al generar el informe de ${reportType}.`);
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="flex min-h-screen flex-col items-center justify-center bg-white p-6 dark:bg-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
     {" "}
      <div className="card w-full max-w-lg rounded-2xl p-8 shadow-2xl dark:shadow-none">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800 dark:text-white">Generar Informes</h1>{" "}
        <p className="mb-8 text-center text-gray-600 dark:text-gray-400">Selecciona el tipo de informe que deseas generar.</p>{" "}
        <div className="flex flex-col space-y-4">
         {" "}
          <motion.button
            className="w-full rounded-full bg-red-600 px-6 py-3 text-lg font-semibold text-white shadow-lg transition-colors hover:bg-red-700 disabled:opacity-50 dark:bg-red-700 dark:hover:bg-red-800"
            onClick={() => generateAndDownloadReport("pdf")}
            disabled={loading}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            {loading ? "Generando PDF..." : "Generar PDF"}{" "}
          </motion.button>
         {" "}
          <motion.button
            className="w-full rounded-full bg-green-600 px-6 py-3 text-lg font-semibold text-white shadow-lg transition-colors hover:bg-green-700 disabled:opacity-50 dark:bg-green-700 dark:hover:bg-green-800"
            onClick={() => generateAndDownloadReport("excel")}
            disabled={loading}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            {loading ? "Generando Excel..." : "Generar Excel"}{" "}
          </motion.button>
         {" "}
        </div>
        {error && <div className="mt-6 rounded-lg bg-red-100 p-4 text-center text-red-700 dark:bg-red-900 dark:text-red-300">{error}</div>}
       {" "}
      </div>
      <Footer />{" "}
    </motion.div>
  );
};

export default InformesPage;
