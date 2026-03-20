import { RecipeType } from "@/types"

type ActiveRecipeType = RecipeType & {
  modifiedServings: number,
  modifiedIngredients: RecipeType['ingredients']
}

export type RecipeSliceState = { 
  needsRefresh: boolean,
  recipes: RecipeType[],
  activeRecipe: ActiveRecipeType | null
}