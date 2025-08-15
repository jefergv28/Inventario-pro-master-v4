"use client";

import React, { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  title?: string;
  message?: React.ReactNode;
  children?: ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
  confirmText?: string;
  cancelText?: string;
  onlyMessage?: boolean;
}

const Modal = ({
  isOpen,
  title,
  message,
  children,
  onConfirm,
  onCancel,
  onClose,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  onlyMessage = false,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Fondo semitransparente */}
      <div className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm" />

      {/* Contenedor modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
          {title && <h3 className="mb-4 text-xl font-semibold">{title}</h3>}
          <div className="mb-6">{message || children}</div>

          <div className="flex justify-end space-x-3">
            {!onlyMessage && (
              <>
                <button
                  onClick={onCancel}
                  className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
                >
                  {cancelText}
                </button>
                <button
                  onClick={onConfirm}
                  className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                >
                  {confirmText}
                </button>
              </>
            )}
            {onlyMessage && (
              <button
                onClick={onClose}
                className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                OK
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
