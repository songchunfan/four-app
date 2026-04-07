"use client"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { MenuList, Title } from "@/lib/constants"
import { Fragment } from "react"
import { useCartStore } from "@/store"

export default function Header() {
  const { cartList } = useCartStore()
  const cartsQuantity = cartList.length
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-purple-600">{Title}</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-4 h-1/3 items-center">
            {MenuList.map((menu, index) => {
              return (
                <Fragment key={menu.href}>
                  {index !== 0 ? <Separator orientation="vertical" /> : null}
                  <Link
                    href={menu.href}
                    className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {menu.text}
                    {menu.text === "Cart" && cartsQuantity > 0
                      ? `(${cartsQuantity})`
                      : null}
                  </Link>
                </Fragment>
              )
            })}
          </nav>
        </div>
      </div>
    </header>
  )
}
