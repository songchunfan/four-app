"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, Trash2 } from "lucide-react"
// import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { CartItem } from "@/types/global"
import { useCartStore } from "@/store"

export default function Cart() {
  const { cartList, removeFromCart, updateQuantity } = useCartStore()

  const handleQuantityChange = (index: number, newQuantity: number) => {
    updateQuantity(index, newQuantity)
  }

  const handleDeleteItem = (index: number) => {
    removeFromCart(index)
  }

  const totalPrice = cartList.reduce(
    (sum, item: CartItem) => sum + item.product.price * item.quantity,
    0,
  )

  const quantiryOptions = Array.from({ length: 10 }, (_, i) => i + 1)

  return (
    <div className="container mx-auto px-4 py-10">
      {cartList.length ? (
        <div className="grid gap-8 lg:grid-cols-[1.8fr_0.9fr]">
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="flex flex-col gap-4 border-b border-slate-200 pb-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-2xl uppercase tracking-[0.3em] text-slate-900">
                  Cart
                </p>
                <h1 className="text-sm font-semibold text-slate-500">
                  Shopping list
                </h1>
              </div>
              <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                {cartList.length} items
              </span>
            </h2>

            <Table className="mt-6">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-75">Product</TableHead>
                  <TableHead className="w-20">Qty</TableHead>
                  <TableHead className="w-20 text-right">Price</TableHead>
                  <TableHead className="w-20 text-right">Total</TableHead>
                  <TableHead className="w-12.5"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cartList.map((item: CartItem, index: number) => (
                  <TableRow key={item.product.id + index}>
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <div className="relative h-20 w-20 overflow-hidden rounded-lg bg-slate-100 shrink-0">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-semibold text-slate-900">
                            {item.product.name}
                          </p>
                          <p className="text-sm text-slate-500 mt-1">
                            Variant:{" "}
                            <span className="font-medium text-slate-700">
                              {item.selectedVariant}
                            </span>
                          </p>
                          <p className="text-xs text-slate-400 mt-1">
                            ID: {item.product.id}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={item.quantity}
                        onValueChange={(value: number | null) => {
                          if (!value) return
                          handleQuantityChange(index, value)
                        }}
                      >
                        <SelectTrigger className="w-16">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {quantiryOptions.map((qty) => (
                            <SelectItem key={qty} value={qty.toString()}>
                              {qty}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right">
                      ${item.product.price.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={() => handleDeleteItem(index)}
                        className="text-slate-400 hover:text-red-500 transition-colors"
                        title="Delete item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>

          <aside className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">Total</h2>
            <div className="mt-6 space-y-4 rounded-3xl bg-slate-50 p-5 text-sm text-slate-700">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Tax estimate</span>
                <span className="text-slate-500">—</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Shipping</span>
                <span className="text-slate-500">—</span>
              </div>
            </div>

            <button className="mt-6 w-full rounded-sm bg-orange-400 px-4 py-3 text-base font-semibold text-white transition hover:bg-orange-500">
              Login to checkout
            </button>
            <p className="mt-3 text-center text-sm text-slate-500">
              You need to login checkout.
            </p>
          </aside>
        </div>
      ) : (
        <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-12 text-center">
          <ShoppingBag className="mb-4 h-5 w-5 text-orange-400" />
          <h1 className="text-3xl font-bold mb-4">Cart</h1>
          <p className="max-w-md text-sm leading-7 text-slate-600 mb-6">
            Your shopping cart is currently empty. Browse products and add them
            to your cart to begin shopping.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 text-orange-400 font-semibold hover:text-orange-500"
          >
            <ShoppingBag className="h-5 w-5" />
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  )
}
