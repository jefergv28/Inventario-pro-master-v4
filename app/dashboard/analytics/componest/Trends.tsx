// /app/dashboard/analytics/components/Trends.tsx

"use client"; // Asegúrate de incluir esto si estás trabajando con React 18 y Next.js 13

import { trendOverTimeData, trendStockData } from "@/app/constants";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";

const TrendStock = () => (
  <ResponsiveContainer
    width="100%"
    height={400}
  >
    <BarChart data={trendStockData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar
        dataKey="entradas"
        fill="#2563eb"
      />
      <Bar
        dataKey="salidas"
        fill="#3FA27C"
      />
    </BarChart>
  </ResponsiveContainer>
);

const TrendOverTime = () => (
  <ResponsiveContainer
    width="100%"
    height={400}
  >
    <LineChart data={trendOverTimeData}>
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

export { TrendStock, TrendOverTime };
