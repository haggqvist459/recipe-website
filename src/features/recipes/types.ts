import { RecipeType } from "@/types"

export type RecipeSliceState = { 
  needsRefresh: boolean,
  recipes: RecipeType[]
}