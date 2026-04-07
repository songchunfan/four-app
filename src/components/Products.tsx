"use client"

import Image from "next/image"
import type { Product, SortOption } from "@/types/global"
import { useSortStore } from "@/store"
import { useRouter } from "next/navigation"
import { ProductsTitle } from "@/lib/constants"

interface ProductsProps {
  products: Product[]
}

function sortProducts(items: Product[], sort: SortOption) {
  const sorted = [...items]
  if (sort === "latest") {
    return sorted.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
  } else if (sort === "low") {
    return sorted.sort((a, b) => a.price - b.price)
  } else {
    return sorted.sort((a, b) => b.price - a.price)
  }
}

export default function Products({ products }: ProductsProps) {
  const { value } = useSortStore()
  const router = useRouter()
  // const [selectedSort, setSelectedSort] = useState<SortOption>("latest")

  const sortedProducts = sortProducts(products, value)

  const handleClick = (id: number) => {
    router.push(`/detail/${id}`)
  }

  return (
    <main className="flex-1">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{ProductsTitle}</h1>
        <span className="text-sm text-gray-500">
          {sortedProducts.length} items
        </span>
      </div>

      {/* 响应式商品卡片网格 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 cursor-pointer group"
            onClick={() => handleClick(product.id)}
          >
            {/* 商品图片 */}
            <div className="relative w-full h-48 overflow-hidden bg-gray-50">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>

            {/* 商品信息 */}
            <div className="p-4">
              <h3 className="text-gray-800 font-medium text-sm mb-1 truncate">
                {product.name}
              </h3>
              <p className="text-purple-600 font-bold text-base">
                ${Number(product.price).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
