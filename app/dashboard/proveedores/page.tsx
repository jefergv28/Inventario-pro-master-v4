"use client"; // Esto lo hace un componente cliente

import LoadingPage from "@/components/LoadingPage";
import dynamic from "next/dynamic";


const ProveedoresClient = dynamic(
  () => import("@/components/ProveedoresClient"),
  {
    ssr: false,
    loading: () => <LoadingPage />,
  }
);

export default function ProveedoresWrapper() {
  return <ProveedoresClient />;
}
