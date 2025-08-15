import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Modal from "@/components/modal/Modal";
import { ModalProvider, useModal } from "./context/ModalContext";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Inventario-Pro",
  description: "Software de gestión de inventarios eficiente y fácil de usar.",
  icons: {
    icon: "/favicon.svg",
  },
};

// Componente para mostrar el modal global
const ModalWrapper = () => {
  const { isOpen, message, hideModal } = useModal();
  return (
    <Modal
      isOpen={isOpen}
      onlyMessage
      message={message}
      onClose={hideModal}
    />
  );
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
    >
      <body className={`${geistSans.variable} ${geistMono.variable} bg-body bg-cover bg-no-repeat antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <ModalProvider>
            {children}
            <ModalWrapper />
          </ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
