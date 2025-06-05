import { suppliersData } from "@/app/constants"; // Asegúrate de importar los datos desde la ubicación correcta
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const SupplierBarChart = () => (
  <ResponsiveContainer
    width="100%"
    height={400}
  >
    <BarChart
      data={suppliersData.flatMap((supplier) =>
        supplier.products.map((product) => ({
          supplier: supplier.name,
          product: product.productName,
          quantity: product.quantity,
        })),
      )}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="product" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar
        dataKey="quantity"
        fill="#82ca9d"
        name="Cantidad de productos comprados"
      />
    </BarChart>
  </ResponsiveContainer>
);

export default SupplierBarChart;
