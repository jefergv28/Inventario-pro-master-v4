"use client";

import { motion } from "framer-motion";
import ButtonTertiary from "./ButtonTertiary";
import { fadeInOnScroll } from "@/motion/motionVariants";

const Trial = () => {
  return (
    <section className="w-full xl:mb-32">
      <motion.div
        variants={fadeInOnScroll(0.2, 0.6)}
        initial="hidden"
        whileInView="visible"
        className="py-24 w-full xl:max-w-[1140px] mx-auto min-h-[300px] bg-gradient-to-r from-accent via-accent_secondary to-accent flex items-center xl:rounded-2xl"
      >
        <div className="flex flex-col xl:flex-row items-center justify-between w-full xl:px-24">
          {/* Texto */}
          <div className="text-center mb-12 xl:mb-0 xl:text-left">
            <h2 className="text-[40px] leading-tight font-bold mb-2">
              Comience su prueba gratuita de 30 días
            </h2>
            <p className="lead max-w-[400px] xl:max-w-[560px] mx-auto xl:mx-0">
              Descubre el potencial de Inventario Pro con una prueba gratuita de
              30 días, sin compromisos ni necesidad de tarjeta de crédito.
            </p>
          </div>
          {/* Botón */}

          <ButtonTertiary btnText="Empezar" />
        </div>
      </motion.div>
    </section>
  );
};

export default Trial;
