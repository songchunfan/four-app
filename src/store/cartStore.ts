import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { devtools } from 'zustand/middleware';

import { CartItem } from '@/types/global'

type CartState = {
  cartList: CartItem[]
  addToCart: (product: CartItem) => void
  removeFromCart: (index: number) => void
  isProductInCart: (name: string, selectedVariant: string) => number
  updateQuantity: (index: number, quantity: number) => void
}

const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set, get) => ({
        cartList: [],
        addToCart: (product: CartItem) => set((state) => ({ cartList: [...state.cartList, product] })),
        removeFromCart: (index: number) => set((state) => {

          // 实现方式一
          state.cartList.splice(index, 1);
          return { cartList: [...state.cartList] };

          // 实现方式二，视频中的实现方式
          // const newCartList = [...state.cartList];
          // newCartList.splice(index, 1);
          // return {cartList: newCartList}
        }),
        isProductInCart: (name: string, selectedVariant: string): number => {
          return get().cartList.findIndex((item: CartItem) => (item.product.name === name && item.selectedVariant === selectedVariant))
        },
        updateQuantity(index, quantity) {
          // 视频中的实现方式
          const newCartList = [...get().cartList]
          newCartList[index].quantity = quantity
          set({ cartList: newCartList })

          // get().cartList[index].quantity = quantity;
          // set({ cartList: [...get().cartList] });
        },
      }),
      {
        name: 'CartStorage'
      }
    ),
    {
      name: "CartStore",
      enabled: process.env.NODE_ENV === 'development'
    }
  )
)



export default useCartStore