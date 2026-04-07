"use client"
// import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

import type { SortOption } from "@/types/global"
import { SortTitle, SortList } from "../lib/constants"
import { useSortStore } from "@/store"

export default function Sort() {
  const { setValue, value } = useSortStore()
  const handleValue = (value: string[]) => {
    // onSortChange(value[0])
    setValue(value[0] as SortOption)
  }
  return (
    <aside className="w-full md:w-56 shrink-0">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 sticky top-8">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          {SortTitle}
        </h2>
        <ul className="space-y-1">
          {SortList.map((option) => (
            <li key={option.value}>
              <button
                onClick={() => handleValue([option.value])}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  value === option.value
                    ? "bg-purple-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>

        {/* <ToggleGroup
          className="space-y-1 mt-2"
          orientation="vertical"
          spacing={1}
          value={[value]}
          onValueChange={handleValue}
        >
          <ToggleGroupItem value="latest">Latest Arrivals</ToggleGroupItem>
          <ToggleGroupItem value="low">Price: Low-High</ToggleGroupItem>
          <ToggleGroupItem value="high">Price: High-Low</ToggleGroupItem>
        </ToggleGroup> */}
      </div>
    </aside>
  )
}
