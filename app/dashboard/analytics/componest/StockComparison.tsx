import { stockComparisonData } from "@/app/constants"; // Asegúrate de importar los datos desde la ubicación correcta
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const StockComparison = () => (
  <ResponsiveContainer
    width="100%"
    height={400}
  >
    <BarChart data={stockComparisonData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar
        dataKey="currentStock"
        fill="#2563eb"
        name="Stock Actual"
      />
      <Bar
        dataKey="lastYearStock"
        fill="#3FA27C"
        name="Stock Histórico"
      />
    </BarChart>
  </ResponsiveContainer>
);

export default StockComparison;
