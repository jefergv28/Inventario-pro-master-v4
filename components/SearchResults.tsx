"use client";

import React, { useMemo } from "react";

export interface Producto {
  id: number;
  nombreProducto: string;
  descripcionProducto?: string;
  precio_producto?: number;
}

export interface Categoria {
  id: number;
  nombreCategoria: string;
}

export interface Funcion {
  id: number;
  nombre_funcion: string;
  path: string;
}

export interface SearchResults {
  productos: Producto[];
  categorias: Categoria[];
  funciones: Funcion[];
}

interface SearchResultsProps {
  results: SearchResults | null;
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
  onSelectResult: (item: Producto | Categoria | Funcion, type: string) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, setIsFocused, onSelectResult }) => {
  // Añadimos el campo type para identificar cada resultado
  const allResults = useMemo(() => {
    return [
      ...(results?.productos?.map((p) => ({ ...p, type: "producto" })) || []),
      ...(results?.categorias?.map((c) => ({ ...c, type: "categoria" })) || []),
      ...(results?.funciones?.map((f) => ({ ...f, type: "funcion" })) || []),
    ];
  }, [results]);

  if (!results || allResults.length === 0) {
    return null;
  }
  console.log("SearchResults props:", results);
  console.log("allResults:", allResults);

  return (
    <div className="max-h-64 overflow-y-auto rounded-md bg-white shadow-lg dark:bg-slate-900">
      {allResults.map((item, index) => (
        <div
          key={`${item.type}-${item.id}-${index}`}
          className="cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700"
          onClick={() => {
            onSelectResult(item, item.type);
            setIsFocused(false);
          }}
        >
          {/* AÑADIDA: Clases de color para que el texto sea visible en ambos modos */}
          <span className="font-medium text-gray-800 dark:text-white">
            {
              // Mostramos el nombre según tipo
              item.type === "producto"
                ? (item as Producto).nombreProducto
                : item.type === "categoria"
                ? (item as Categoria).nombreCategoria
                : (item as Funcion).nombre_funcion
            }
          </span>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
