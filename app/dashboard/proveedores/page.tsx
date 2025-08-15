import dynamic from "next/dynamic";

// Un componente de carga básico que puedes usar mientras se carga el cliente
const LoadingPage = () => (
  <div className="flex items-center justify-center min-h-screen">
    <p className="text-xl text-gray-500 animate-pulse">Cargando...</p>
  </div>
);

// Importamos el componente del cliente de forma dinámica con SSR desactivado.
// Esto evita el error "useModal() from server"
const ProveedoresClient = dynamic(
  () => import("@/components/ProveedoresClient"),
  {
    ssr: false,
    loading: () => <LoadingPage />,
  },
);

// Este es el componente principal de la página, un Server Component.
// Su única responsabilidad es renderizar el componente cliente.
export default function ProveedoresPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <ProveedoresClient />
    </main>
  );
}
