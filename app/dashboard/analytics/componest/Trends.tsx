// /app/dashboard/analytics/components/Trends.tsx
"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";

// Tipo para el gráfico de productos movidos
type ProductoMovido = {
  nombreProducto: string;
  totalMovimientos: number;
};

// Tipo para el gráfico de entradas y salidas en el tiempo
type MovimientoPorTiempo = {
  date: string;
  entradas: number;
  salidas: number;
};

// Modificamos el componente TrendStock para aceptar la prop 'data'
const TrendStock = ({ data }: { data: ProductoMovido[] }) => {
    // Si no hay datos, muestra un mensaje de fallback
    if (!data || data.length === 0) {
        return <div className="text-center p-4 text-gray-500">No hay datos de productos movidos para mostrar.</div>;
    }

    return (
        <ResponsiveContainer
            width="100%"
            height={400}
        >
            <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nombreProducto" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                    dataKey="totalMovimientos"
                    name="Total de Movimientos"
                    fill="#2563eb"
                />
            </BarChart>
        </ResponsiveContainer>
    );
};

// Modificamos el componente TrendOverTime para aceptar la prop 'data'
const TrendOverTime = ({ data }: { data: MovimientoPorTiempo[] }) => {

    if (!data || data.length === 0) {
        return <div className="text-center p-4 text-gray-500">No hay datos de movimientos para mostrar.</div>;
    }

    return (
        <ResponsiveContainer
            width="100%"
            height={400}
        >
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="entradas"
                    stroke="#2563eb"
                />
                <Line
                    type="monotone"
                    dataKey="salidas"
                    stroke="#3FA27C"
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

export { TrendStock, TrendOverTime };