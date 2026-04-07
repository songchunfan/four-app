// "use client"
import Image from "next/image"
import { productActions, productsActions } from "@/actions/products"
import AddCart from "@/components/AddCart"

export async function generateStaticParams() {
  const result = await productsActions()
  return result.data.map((item) => ({
    id: item.id + "",
  }))
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const res = await productActions(+id)
  const product = res.data
  return (
    <div className="container flex py-6">
      <div className="w-64">
        <h1 className="font-sans text-3xl leading-10 font-bold my-8">
          {product.name}
        </h1>
        <p className="leading-10">{product.description}</p>
      </div>
      <div className="h-[500px] flex-1 mx-10 bg-slate-50 p-4 rounded-lg shadow-md relative">
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority
          sizes="300"
          style={{ objectFit: "cover" }}
        />
      </div>
      <AddCart product={product} />
    </div>
  )
}
