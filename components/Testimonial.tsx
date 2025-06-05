"use client";

import { fadeInOnScroll } from "@/motion/motionVariants";
import { motion } from "framer-motion";
import { BiSolidQuoteLeft } from "react-icons/bi";

const testimonial = [
  {
    name: "Carlos Mendoza",
    message:
      "Desde que implementamos Inventario Pro, la gestión de nuestro stock ha sido más eficiente. Ahora tenemos un control preciso de nuestras entradas y salidas de productos, lo que nos ha permitido reducir pérdidas y optimizar nuestro inventario. ¡Totalmente recomendado!",
  },
  {
    name: "Juan Perez",
    message:
      "Inventario Pro es una herramienta muy útil para nuestros clientes. Nos ha permitido optimizar nuestros procesos de compra y venta, lo que ha generado un aumento en nuestras ventas. ��Muy recomendado!",
  },
  {
    name: "Maria Garcia",
    message:
      "Nuestro sistema de Inventario Pro ha sido una gran ayuda para mejorar nuestros procesos de compra y venta. Ahora, tenemos un control preciso de nuestro stock, lo que ha permitido reducir pérdidas y optimizar nuestro inventario. ��Totalmente recomendado!",
  },
  {
    name: "Pedro Sanzio",
    message:
      "Inventario Pro es una herramienta muy útil para nuestros clientes. Nos ha permitido optimizar nuestros procesos de compra y venta, lo que ha generado un aumento en nuestras ventas. ��Muy recomendado!",
  },
  {
    name: "Luis Martinez",
    message:
      "Inventario Pro es una herramienta muy útil para nuestros clientes. Nos ha permitido optimizar nuestros procesos de compra y venta, lo que ha generado un aumento en nuestras ventas. ��Muy recomendado!",
  },
  {
    name: "Carlos Lozada",
    message:
      "Desde que implementamos Inventario Pro, la gestión de nuestro stock ha sido más eficiente. Ahora tenemos un control preciso de nuestras entradas y salidas de productos, lo que nos ha permitido reducir pérdidas y optimizar nuestro inventario. ��Totalmente recomendado!",
  },
  {
    name: "Laura Gomez",
    message:
      "Antes de usar Inventario Pro, perdíamos mucho tiempo actualizando nuestro inventario manualmente. Ahora, con su interfaz intuitiva y las integraciones con herramientas como Google Drive y WhatsApp, todo es más rápido y organizado. ¡Es una solución imprescindible para cualquier negocio!",
  },
  {
    name: "David Rodriguez",
    message:
      "Inventario Pro es una herramienta muy útil para nuestros clientes. Nos ha permitido optimizar nuestros procesos de compra y venta, lo que ha generado un aumento en nuestras ventas. ��Muy recomendado!",
  },
  {
    name: "Sofia Santiago",
    message:
      "Inventario Pro es una herramienta muy útil para nuestros clientes. Nos ha permitido optimizar nuestros procesos de compra y venta, lo que ha generado un aumento en nuestras ventas. ��Muy recomendado!",
  },
  {
    name: "David Aguirrez",
    message:
      "Desde que implementamos Inventario Pro, el control de nuestro stock ha sido mucho más preciso. La integración con WhatsApp nos permite recibir notificaciones en tiempo real, lo que ha mejorado nuestra gestión y evitado pérdidas por falta de productos.",
  },
];
const Testimonial = () => {
  return (
    <section className="w-full  mb-24 flex justify-center items-center ">
      <div className="overflow-hidden">
        {/* text */}
        <motion.div
          variants={fadeInOnScroll(0.2, 0.4)}
          initial="hidden"
          whileInView="visible"
        >
          <h2 className="h2 mb-4 text-center">
            Lo que opinan nuestros usuarios
          </h2>
          <p className="lead text-center mb-24">
            Descubre lo que dicen quienes han optimizado su gestión con
            Inventario Pro
          </p>
        </motion.div>
        {/* lista de card */}
        <motion.div>
          <motion.div
            variants={fadeInOnScroll(0.2, 0.6)}
            initial="hidden"
            whileInView="visible"
            className="flex"
          >
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: "-100%" }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="flex "
            >
              {testimonial.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="relative w-[460px] h-[300px] bg-[#0e11354e] mr-12 rounded-2xl flex flex-col justify-center px-14"
                  >
                    <BiSolidQuoteLeft className="text-accent_secondary mb-3 text-3xl" />
                    <p className="mb-4 text-lg text-white/80 ">
                      {item.message}
                    </p>
                    <p className="text-xl">{item.name}</p>
                  </div>
                );
              })}
            </motion.div>

            <motion.div
              initial={{ x: 0 }}
              animate={{ x: "-100%" }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="flex "
            >
              {testimonial.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="relative w-[460px] h-[300px] bg-[#0e11354e] mr-12 rounded-2xl flex flex-col justify-center px-14"
                  >
                    <BiSolidQuoteLeft className="text-accent_secondary mb-3 text-3xl" />
                    <p className="mb-4 text-lg text-white/80 ">
                      {item.message}
                    </p>
                    <p className="text-xl">{item.name}</p>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonial;
