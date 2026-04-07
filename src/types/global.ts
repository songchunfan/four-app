
export type SortOption = 'latest' | 'low' | 'high';

export type Product = {
  id: number
  name: string
  price: number
  image: string
  createdAt: Date
  description: string
  variant: string[]
}

export type ProductsActions = {
  status: number
  body: string
  data: Product[]
}

export type ProductActions = {
  status: number
  body: string
  data: Product
}

export type CartItem = {
  product: Product
  quantity: number
  selectedVariant: string
}

export type NotAccountType = "login" | "register"

export type Address = {
  id: number
  name: string
  city: string
  address: string
  phone: string
  userid: string
}