"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Button from "./Button";
import { fadeInOnScroll } from "@/motion/motionVariants";

const icons = [
  {
    src: "/integrations/google_drive.svg",
  },
  {
    src: "/integrations/dropbox.svg",
  },

  {
    src: "/integrations/whatsapp.svg",
  },

  {
    src: "/integrations/zapier.svg",
  },
];
const iconAnimation = {
  initial: {
    opacity: 0,
    y: 60,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.05 * index },
  }),
};

const Integration = () => {
  return (
    <section className="py-4 xl:py-32 min-h[720px] xl:mt-32">
      <div className="container mx-auto flex flex-col justify-center items-center gap-8 xl:gap-16">
        {/* texto */}
        <motion.div
          variants={fadeInOnScroll(0.2, 0.6)}
          initial="hidden"
          whileInView="visible"
          className="text-center"
        >
          <h2 className="h2 mb-3">Flujos de trabajo de Inventario Pro</h2>
          <p className="lead">
            Integra las mejores aplicaciones para una gestión de inventarios
            conectada y eficiente
          </p>
        </motion.div>
        {/* lista de iconos */}
        <div className="flex flex-wrap gap-8 w-full max-w-[1024px] mx-auto place-content-center mb-8">
          {icons.map((icon, index) => {
            return (
              <motion.div
                className="relative w-[80px] h-[80px] "
                key={index}
                custom={index}
                variants={iconAnimation}
                initial="initial"
                whileInView="animate"
              >
                <Image src={icon.src} fill alt="" />
              </motion.div>
            );
          })}
        </div>
        {/* btn */}
        <motion.div
          initial={{ y: 60, opacity: 0, scale: 0.8 }}
          whileInView={{ y: 0, opacity: 1, scale: 1 }}
          transition={{
            delay: 0.6,
            duration: 0.4,
            ease: [0.6, -0.05, 0.01, 0.99],
            type: "spring",
            stiffness: 100,
          }}
        >
          <Button btnText={"Ver todo"} />
        </motion.div>
      </div>
    </section>
  );
};

export default Integration;
