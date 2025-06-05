"use client";

import { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

interface BarcodeScannerProps {
  onScan: (barcode: string) => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onScan }) => {
  useEffect(() => {
    const scannerInstance = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      },
      false,
    ); // Se agrega el tercer argumento "verbose"

    scannerInstance.render(
      (decodedText) => {
        onScan(decodedText);
        scannerInstance.clear();
      },
      (errorMessage) => {
        console.warn("Error al escanear:", errorMessage);
      },
    );

    return () => {
      scannerInstance.clear();
    };
  }, [onScan]);

  return (
    <div
      id="reader"
      className="mx-auto w-full max-w-md text-black dark:text-white"
    ></div>
  );
};

export default BarcodeScanner;
