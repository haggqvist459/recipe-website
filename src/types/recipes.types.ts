import { Tables } from "./database.schema"
import { UNITS } from "@/utils"
import { FilterOptionType } from "./filters";

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
  createdAt: string
}
export type RecipeDraftType = Omit<RecipeType, "id" | "createdAt">

