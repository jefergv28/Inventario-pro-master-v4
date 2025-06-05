import { motion } from "framer-motion";
const AuthSkeleton = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex w-full max-w-md flex-col items-center justify-center rounded-lg bg-accent/60 p-8 shadow-lg"
      >
        {/* Logo */}
        <div className="h-20 w-52 animate-pulse rounded-md bg-gray-300"></div>

        {/* Inputs Skeleton */}
        <div className="mt-6 w-full space-y-4">
          <div className="h-10 animate-pulse rounded-md bg-gray-300"></div>
          <div className="h-10 animate-pulse rounded-md bg-gray-300"></div>
        </div>

        {/* Botón de Iniciar Sesión */}
        <div className="mt-4 h-12 w-full animate-pulse rounded-md bg-gray-300"></div>

        {/* Separador */}
        <div className="my-4 h-[1px] w-full bg-gray-400"></div>

        {/* Botones de Google y GitHub */}
        <div className="w-full space-y-3">
          <div className="h-12 animate-pulse rounded-md bg-gray-300"></div>
          <div className="h-12 animate-pulse rounded-md bg-gray-300"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthSkeleton;
