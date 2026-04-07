"use client"

import { useState } from "react"
import { Product } from "@/types/global"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/store"

interface AddCartProps {
  product: Product
}

export default function AddCart({ product }: AddCartProps) {
  const { cartList, addToCart, isProductInCart, updateQuantity } =
    useCartStore()

  // product.variant[0] ||
  const [selectedVariant, setSelectedVariant] = useState<string[]>([])

  const handleValueChange = (value: string[]) => {
    console.log("Selected value:", value)
    setSelectedVariant(value)
    // setValue(value[0])
  }

  const handleAddToCart = () => {
    // TODO: 实现添加到购物车的逻辑
    console.log("Adding to cart:", product.name, "Variant:", selectedVariant)
    const [selectVariant] = selectedVariant
    const index = isProductInCart(product.name, selectVariant)
    if (index < 0) {
      // 购物车新增
      addToCart({ product, quantity: 1, selectedVariant: selectVariant })
    } else {
      // 更新购物车
      const newQuantity = cartList[index].quantity + 1
      updateQuantity(index, newQuantity)
    }
    setSelectedVariant([])
  }

  return (
    <div className="w-80 py-12 bg-white rounded-lg shadow-md px-2">
      <h2 className="text-xl font-bold mb-4">Add to Cart</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Variant</label>
        <ToggleGroup
          value={selectedVariant}
          onValueChange={handleValueChange}
          className="justify-start"
          variant="outline"
          spacing={2}
        >
          {product.variant.map((v, index) => (
            <ToggleGroupItem
              key={index}
              value={v}
              className="text-sm px-4 bg-slate-50"
            >
              {v}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <div className="mb-4">
        <h3 className="block text-sm font-medium mb-2">Price</h3>
        <p className="text-2xl font-bold text-green-600">
          ${product.price.toFixed(2)}
        </p>
      </div>
      <Button
        disabled={selectedVariant.length ? false : true}
        onClick={handleAddToCart}
        className="w-full"
        variant="default"
        size="lg"
      >
        Add to Cart
      </Button>
      {/* 
      <ToggleGroup variant="outline" multiple>
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          1
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          2
        </ToggleGroupItem>
        <ToggleGroupItem
          value="strikethrough"
          aria-label="Toggle strikethrough"
        >
          3
        </ToggleGroupItem>
      </ToggleGroup> */}
    </div>
  )
}
