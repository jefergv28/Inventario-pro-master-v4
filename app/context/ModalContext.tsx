// context/ModalContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextProps {
  showModal: (message: ReactNode) => void;
  hideModal: () => void;
  message: ReactNode;
  isOpen: boolean;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState<ReactNode>("");

  const showModal = (msg: ReactNode) => {
    setMessage(msg);
    setIsOpen(true);
  };

  const hideModal = () => {
    setMessage("");
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal, message, isOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal debe usarse dentro de ModalProvider");
  return context;
};
