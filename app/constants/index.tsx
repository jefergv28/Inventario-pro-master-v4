import { Home, Package, PackagePlus, ShoppingBag, Users, UserCheck, Settings, NotepadText, ChartColumn, AlertTriangle, List } from "lucide-react"; // Asegúrate de importar todos los íconos necesarios

export const navbarLinks = [
  {
    title: "Dashboard",
    links: [
      {
        label: "Dashboard",
        icon: Home,
        path: "/dashboard",
      },
      {
        label: "Analítica",
        icon: ChartColumn,
        path: "/dashboard/analytics",
      },
      {
        label: "Informes",
        icon: NotepadText,
        path: "/dashboard/informes",
      },
    ],
  },
  {
    title: "Usuarios",
    links: [
      {
        label: "Usuario",
        icon: Users,
        path: "/dashboard/usuario",
      },
      {
        label: "Usuarios Verificados",
        icon: UserCheck,
        path: "/dashboard/usuarioVerif",
      },
    ],
  },
  {
    title: "Productos",
    links: [
      {
        label: "Productos",
        icon: Package,
        path: "/dashboard/productos",
      },
      {
        label: "Nuevo producto",
        icon: PackagePlus,
        path: "/dashboard/newProductos",
      },
    ],
  },

  {
    title: "Gestión de Inventario",
    links: [
      {
        label: "Proveedores",
        icon: ShoppingBag,
        path: "/dashboard/proveedores",
      },
      {
        label: "Gestión de Stock",
        icon: AlertTriangle,
        path: "/dashboard/stock",
      },
      {
        label: "Movimientos",
        icon: List,
        path: "/dashboard/movimientos",
      },
    ],
  },
  {
    title: "Settings",
    links: [
      {
        label: "Settings",
        icon: Settings,
        path: "/dashboard/settings",
      },
    ],
  },
];

export const overviewData = [
  {
    name: "Jan",
    total: 1500,
  },
  {
    name: "Feb",
    total: 2000,
  },
  {
    name: "Mar",
    total: 1000,
  },
  {
    name: "Apr",
    total: 5000,
  },
  {
    name: "May",
    total: 2000,
  },
  {
    name: "Jun",
    total: 5900,
  },
  {
    name: "Jul",
    total: 2000,
  },
  {
    name: "Aug",
    total: 5500,
  },
  {
    name: "Sep",
    total: 2000,
  },
  {
    name: "Oct",
    total: 4000,
  },
  {
    name: "Nov",
    total: 1500,
  },
  {
    name: "Dec",
    total: 2500,
  },
];

export const recentProductsData = [
  {
    id: 1,
    name: "Laptop HP ProBook",
    category: "Electrónica",
    image: "/recentProductsData/lapto.jpg",
    quantity: 10,
    addedAt: "2025-03-08",
  },
  {
    id: 2,
    name: "Teclado Mecánico RGB",
    category: "Accesorios",
    image: "/recentProductsData/teclado.png",
    quantity: 15,
    addedAt: "2025-03-07",
  },
  {
    id: 3,
    name: "Monitor Dell 24”",
    category: "Monitores",
    image: "/recentProductsData/monitor.jpg",
    quantity: 5,
    addedAt: "2025-03-07",
  },
  {
    id: 4,
    name: "Mouse Logitech G502",
    category: "Accesorios",
    image: "/recentProductsData/mouse.png",
    quantity: 20,
    addedAt: "2025-03-06",
  },
  {
    id: 5,
    name: "Disco Duro SSD 1TB",
    category: "Almacenamiento",
    image: "/recentProductsData/discoDuro.jpg",
    quantity: 8,
    addedAt: "2025-03-06",
  },
  {
    id: 6,
    name: "Silla Ergonómica",
    category: "Mobiliario",
    image: "/recentProductsData/discoDuro.jpg",
    quantity: 3,
    addedAt: "2025-03-05",
  },
  {
    id: 7,
    name: "Cámara Web Full HD",
    category: "Accesorios",
    image: "/recentProductsData/camara.png",
    quantity: 12,
    addedAt: "2025-03-05",
  },
];
export const ProductosData = [
  {
    id: 1,
    name: "Laptop HP Pavilion",
    quantity: 15,
    price: 3200000,
    description: "Laptop con procesador Intel Core i7 y 16GB RAM.",
    category: "Tecnología",
    image: "/inventory/laptop.jpg",
  },
  {
    id: 2,
    name: "Escritorio Ejecutivo",
    quantity: 8,
    price: 750000,
    description: "Escritorio de madera con acabados premium.",
    category: "Muebles",
    image: "/inventory/desk.jpg",
  },
  {
    id: 3,
    name: "Cajas de Papel A4",
    quantity: 50,
    price: 150000,
    description: "Paquete de 500 hojas de papel tamaño A4.",
    category: "Papelería",
    image: "/inventory/paper.jpg",
  },
  {
    id: 4,
    name: "Mouse Gaming Razer",
    quantity: 30,
    price: 15000,
    description: "Mouse gaming con botón de apertura y 3 botones de acción.",
    category: "Accesorios",
    image: "/inventory/mouse.jpg",
  },
  {
    id: 5,
    name: "Monitor Samsung 27",
    quantity: 10,
    price: 1000000,
    description: "Monitor de pantalla plana con 27 pulgadas.",
    category: "Monitores",
    image: "/inventory/monitor.jpg",
  },
  {
    id: 6,
    name: "Mouse Logitech G502",
    quantity: 20,
    price: 15000,
    description: "Mouse gaming con botón de apertura y 3 botones de acción.",
    category: "Accesorios",
    image: "/inventory/mouse.jpg",
  },
  {
    id: 7,
    name: "Disco Duro SSD 1TB",
    quantity: 8,
    price: 1000000,
    description: "Disco duro de 1TB con velocidad de 500 MB/s.",
    category: "Almacenamiento",
    image: "/inventory/discoDuro.jpg",
  },
  {
    id: 8,
    name: "Silla Ergonómica",
    quantity: 3,
    price: 750000,
    description: "Silla de madera con acabados premium.",
    category: "Mobiliario",
    image: "/inventory/desk.jpg",
  },
  {
    id: 9,
    name: "Cámara Web Full HD",
    quantity: 12,
    price: 150000,
    description: "Cámara web con resolución Full HD.",
    category: "Accesorios",
    image: "/inventory/camara.jpg",
  },
  {
    id: 10,
    name: "Teclado Mecánico RGB",
    quantity: 15,
    price: 10000,
    description: "Teclado mecánico con 100% RGB.",
    category: "Accesorios",
    image: "/inventory/teclado.png",
  },
  {
    id: 11,
    name: "Monitor Dell 24",
    quantity: 5,
    price: 1200000,
    description: "Monitor de pantalla plana con 24 pulgadas.",
    category: "Monitores",
    image: "/inventory/monitor.jpg",
  },
  {
    id: 12,
    name: "Mouse Logitech G502",
    quantity: 20,
    price: 15000,
    description: "Mouse gaming con botón de apertura y 3 botones de acción.",
    category: "Accesorios",
    image: "/inventory/mouse.jpg",
  },
  {
    id: 13,
    name: "Disco Duro SSD 1TB",
    quantity: 8,
    price: 1000000,
    description: "Disco duro de 1TB con velocidad de 500 MB/s.",
    category: "Almacenamiento",
    image: "/inventory/discoDuro.jpg",
  },
  {
    id: 14,
    name: "Silla Ergonómica",
    quantity: 3,
    price: 750000,
    description: "Silla de madera con acabados premium.",
    category: "Mobiliario",
    image: "/inventory/desk.jpg",
  },
  {
    id: 15,
    name: "Cámara Web Full HD",
    quantity: 12,
    price: 150000,
    description: "Cámara web con resolución Full HD.",
    category: "Accesorios",
    image: "/inventory/camara.jpg",
  },
];

// Datos para los gráficos
export const trendStockData = [
  { name: "Producto A", entradas: 150, salidas: 120 },
  { name: "Producto B", entradas: 200, salidas: 180 },
  { name: "Producto C", entradas: 80, salidas: 70 },
  { name: "Producto D", entradas: 300, salidas: 250 },
  { name: "Producto E", entradas: 400, salidas: 350 },
];

export const trendOverTimeData = [
  { date: "2023-01-01", entradas: 30, salidas: 20 },
  { date: "2023-01-02", entradas: 45, salidas: 40 },
  { date: "2023-01-03", entradas: 55, salidas: 50 },
  { date: "2023-01-04", entradas: 60, salidas: 60 },
  { date: "2023-01-05", entradas: 70, salidas: 65 },
];
// Datos de ejemplo para comparación de stock
export const stockComparisonData = [
  {
    name: "Producto A",
    currentStock: 120,
    lastYearStock: 150,
  },
  {
    name: "Producto B",
    currentStock: 80,
    lastYearStock: 100,
  },
  {
    name: "Producto C",
    currentStock: 200,
    lastYearStock: 180,
  },
  {
    name: "Producto D",
    currentStock: 50,
    lastYearStock: 70,
  },
];

// Datos mock de proveedores y productos comprados
export const suppliersData = [
  {
    name: "Proveedor A",
    totalProducts: 350, // Total de productos comprados a este proveedor
    products: [
      { productName: "Producto X", quantity: 120 },
      { productName: "Producto Y", quantity: 230 },
    ],
  },
  {
    name: "Proveedor B",
    totalProducts: 150,
    products: [{ productName: "Producto Z", quantity: 150 }],
  },
  {
    name: "Proveedor C",
    totalProducts: 300,
    products: [
      { productName: "Producto W", quantity: 150 },
      { productName: "Producto X", quantity: 150 },
    ],
  },
];

export const mockReports = [
  {
    id: 1,
    date: "2025-03-10",
    type: "Entradas y Salidas",
  },
  {
    id: 2,
    date: "2025-03-08",
    type: "Stock Actual",
  },
  {
    id: 3,
    date: "2025-03-05",
    type: "Movimientos por Proveedor",
  },
  {
    id: 4,
    date: "2025-03-03",
    type: "Comparación de Stock",
  },
  {
    id: 5,
    date: "2025-03-01",
    type: "Estadísticas de Stock",
  },
  {
    id: 6,
    date: "2025-02-28",
    type: "Reporte de Ventas",
  },
  {
    id: 7,
    date: "2025-02-25",
    type: "Reporte de Inventario",
  },
  {
    id: 8,
    date: "2025-02-22",
    type: "Reporte de Ingresos",
  },
  {
    id: 9,
    date: "2025-02-19",
    type: "Reporte de Gastos",
  },
  {
    id: 10,
    date: "2025-02-16",
    type: "Reporte de Stock",
  },
];
