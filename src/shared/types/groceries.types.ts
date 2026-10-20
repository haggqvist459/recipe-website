import { Unit } from "./recipes.types"

export type ListItemData = {
  id: string
  text: string
  amount?: string,
  unit?: Unit | ''
  completed: boolean
}

export type GroceryListType = { 
  id: string,
  createdAt: string, 
  updatedAt: string,
  userId: string,
  listItems: ListItemData[]
}