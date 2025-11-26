import { VISIBILITY_FILTERS } from "./constants";
import type { Unit } from "@/types";

export type ListItemData = {
  id: string
  text: string
  amount?: string,
  unit?: Unit | ''
  completed: boolean
}


export type ListState = {
  visibilityFilter: VisibilityFilterData
  items: ListItemData[]
}

export type VisibilityFilterData = typeof VISIBILITY_FILTERS[keyof typeof VISIBILITY_FILTERS];