import { SortOption } from '@/types/global'

export const Title = "SOFN Store";
export const MenuList = [
  { href: "/search", text: "Search" },
  { href: "/account", text: "Account" },
  { href: "/cart", text: "Cart" },
];

export const SortTitle = 'Sort By'
export const SortList: { value: SortOption; label: string }[] = [
  { value: "latest", label: "Latest Arrivals" },
  { value: "low", label: "Price: Low-High" },
  { value: "high", label: "Price: High-Low" },
]

export const ProductsTitle = "All Products";