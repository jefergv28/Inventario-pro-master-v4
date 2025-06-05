import React from "react";

interface ModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
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
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40" />

      {/* Contenedor modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6">
          {title && <h3 className="text-xl font-semibold mb-4">{title}</h3>}
          <p className="mb-6">{message}</p>

          <div className="flex justify-end space-x-3">
            {!onlyMessage && (
              <>
                <button
                  onClick={onCancel}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  {cancelText}
                </button>
                <button
                  onClick={onConfirm}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  {confirmText}
                </button>
              </>
            )}
            {onlyMessage && (
              <button
                onClick={onClose}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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
