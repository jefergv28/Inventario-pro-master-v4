export const fadeInOnScroll = (delay: number, duration: number) => ({
  hidden: { opacity: 0 }, // Estado inicial: totalmente transparente
  visible: {
    opacity: 1, //desvanecerse hasta quedar completamente visible
    transition: {
      delay: delay, //Pequeño retraso antes de comenzar la animación.
      duration: duration, //Duración de la animación.
    },
  },
});

export const fadeInUpSpring = (delay: number, duration: number) => ({
  hidden: { opacity: 0, y: 60, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: delay,
      duration: duration,
      ease: [0.6, -0.05, 0.01, 0.99],
      type: "spring",
      stiffness: 100,
    },
  },
});
