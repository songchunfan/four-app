import Products from "@/components/Products"
import { productsActions } from "@/actions/products"
import type { Product } from "@/types/global"
import Sort from "@/components/Sort"

// 模拟商品数据（作为后备数据）
const fallbackProducts: Product[] = [
  {
    id: 1,
    name: "Modern Sofa",
    price: 299.99,
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop",
    createdAt: new Date("2024-03-01"),
    description:
      "A sleek and comfortable sofa with premium upholstery and clean lines.",
    variant: ["Charcoal", "Beige"],
  },
  {
    id: 2,
    name: "Wooden Chair",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=300&fit=crop",
    createdAt: new Date("2024-03-10"),
    description:
      "A sturdy wooden chair with a natural finish, perfect for dining rooms.",
    variant: ["Oak", "Walnut"],
  },
  {
    id: 3,
    name: "Desk Lamp",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=300&fit=crop",
    createdAt: new Date("2024-02-15"),
    description:
      "An adjustable desk lamp with soft light and a modern metal frame.",
    variant: ["Black", "White"],
  },
  {
    id: 4,
    name: "Coffee Table",
    price: 199.99,
    image:
      "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=400&h=300&fit=crop",
    createdAt: new Date("2024-03-20"),
    description:
      "A contemporary coffee table with a durable wood top and sleek legs.",
    variant: ["Natural", "Espresso"],
  },
  {
    id: 5,
    name: "Bookshelf",
    price: 159.99,
    image:
      "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=400&h=300&fit=crop",
    createdAt: new Date("2024-01-25"),
    description:
      "A tall bookshelf with multiple shelves to organize books and decor.",
    variant: ["White", "Maple"],
  },
  {
    id: 6,
    name: "Floor Lamp",
    price: 75.99,
    image:
      "https://images.unsplash.com/photo-1513506003901-1e6a35fd4b50?w=400&h=300&fit=crop",
    createdAt: new Date("2024-03-05"),
    description:
      "A stylish floor lamp that adds ambient lighting to any living room.",
    variant: ["Brass", "Matte Black"],
  },
  {
    id: 7,
    name: "Dining Chair",
    price: 65.0,
    image:
      "https://images.unsplash.com/photo-1551298370-9d3d53740c72?w=400&h=300&fit=crop",
    createdAt: new Date("2024-02-28"),
    description:
      "A comfortable dining chair with cushioned seating and modern styling.",
    variant: ["Grey", "Blue"],
  },
  {
    id: 8,
    name: "Wall Mirror",
    price: 120.0,
    image:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?w=400&h=300&fit=crop",
    createdAt: new Date("2024-03-18"),
    description:
      "A decorative wall mirror that brightens spaces and enhances room depth.",
    variant: ["Gold", "Silver"],
  },
]

export default async function HomePage() {
  let products: Product[] = fallbackProducts

  try {
    // 尝试从数据库获取商品数据
    const result = await productsActions()
    if (result.status === 200 && result.data && result.data.length > 0) {
      products = result.data as Product[]
    }
  } catch (error) {
    console.error("Failed to fetch products from database:", error)
    // 使用后备数据
  }

  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* 左侧排序筛选区域 */}
        <Sort />

        {/* 右侧商品列表区域 */}
        <Products products={products} />
      </div>
    </div>
  )
}
