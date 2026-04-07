"use server"
import db from '@/lib/db'
import { ProductsActions, Product, ProductActions } from "@/types/global"

export async function productsActions(): Promise<ProductsActions> {
  const result = (await db`SELECT * FROM products`) as Product[];

  return {
    status: 200,
    body: "get product success",
    data: result
  }
}

export async function productActions(id: number): Promise<ProductActions> {
  const result = (await db`SELECT * FROM products WHERE id = ${id}`) as Product[];

  return {
    status: 200,
    body: "get product success",
    data: result[0]
  }
}