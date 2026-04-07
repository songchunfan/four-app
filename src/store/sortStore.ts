import { create } from 'zustand'

import { SortOption } from '@/types/global'

type SortState = {
  value: SortOption
  setValue: (value: SortOption) => void
}

const useSortStore = create<SortState>(set => ({
  value: "latest",
  setValue: (value: SortOption) => set({ value })
}))

export default useSortStore