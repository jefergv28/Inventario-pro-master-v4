"use client";

import { motion, useScroll, useTransform } from "framer-motion";
//componenetes
import Header from "./Header";
import Button from "./Button";

const Hero = () => {
  const { scrollY } = useScroll();

  // Transformaciones para las animaciones
  const imgTopPosition = useTransform(scrollY, [0, 400], ["400px", "240px"]);
  const imgScale = useTransform(scrollY, [0, 200, 1300], [1, 1.4, 1]);
  const textOpacity = useTransform(scrollY, [0, 200], [1, 0]);
  const textScale = useTransform(scrollY, [0, 200], [1, 0.8]);
  const textDisplay = useTransform(scrollY, [0, 800], ["flex", "none"]);

  return (
    <section className="relative h-screen overflow-x-clip xl:h-[1600px]">
      <Header />
      <div className="container mx-auto h-full items-center xl:items-start">
        {/* Texto animado */}
        <motion.div
          className="fixed left-0 right-0 mt-24 flex flex-col items-center justify-center gap-6 text-center xl:mt-[160px]"
          style={{
            opacity: textOpacity,
            scale: textScale,
            display: textDisplay,
          }}
        >
          <h1 className="max-w-[800px] text-[60px] font-bold leading-none tracking-[-0.5] xl:max-w-max">
            Inventario Cero Errores: Control Total al Instante.
          </h1>
          <p className="mb-2 max-w-[680px] px-8 text-[20px] font-light text-white/80 xl:px-0">
            Simplifica la gestión de tu stock, desde entradas y salidas hasta informes detallados, todo en una sola plataforma.
          </p>
          <Button btnText={"Únete hoy"} />
        </motion.div>

        {/* Imagen animada */}
        <motion.div
          className="max-[960px] sticky left-0 right-0 mx-auto hidden h-[620px] w-full bg-no-repeat xl:flex"
          style={{
            backgroundImage: "url('/hero/img.svg')",
            backgroundSize: "contain",
            backgroundPosition: "center",
            top: imgTopPosition,
            scale: imgScale,
          }}
        ></motion.div>
      </div>
    </section>
  );
};

export default Hero;
