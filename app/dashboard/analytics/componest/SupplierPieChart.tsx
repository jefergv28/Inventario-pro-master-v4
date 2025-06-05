import { suppliersData } from "@/app/constants"; // Asegúrate de importar los datos desde la ubicación correcta
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const SupplierPieChart = () => {
  const data = suppliersData.map((supplier) => ({
    name: supplier.name,
    value: supplier.totalProducts,
  }));

  // Colores para cada proveedor
  const COLORS = ["#2563eb", "#3FA27C", "#BF2722"];

  return (
    <ResponsiveContainer
      width="100%"
      height={400}
    >
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={150}
          fill="#2563eb"
          label
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default SupplierPieChart;
