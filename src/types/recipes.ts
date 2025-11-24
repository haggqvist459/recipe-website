import { Tables } from "./database.types"
import { FilterOptionType } from "@/features/filters/types";
import { UNITS } from "@/utils"

export type RecipeDbType = Tables<"recipes">

export type Unit = (typeof UNITS)[number];

export type IngredientType = {
  id: string
  name: string
  amount: string
  unit: Unit | ''
}

export type InstructionType = {
  id: string,
  order: number,
  title: string,
  text: string,
}

export type RecipeType = {
  id: string
  title: string
  description: string | null
  cuisines: FilterOptionType[] | null
  types: FilterOptionType[] | null
  includeWeekly: boolean
  ingredients: IngredientType[]
  instructions: InstructionType[]
  createdAt: Date
}



export type FilterOptionType = {
  id: string
  text: string
}