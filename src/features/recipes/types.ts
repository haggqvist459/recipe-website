import { RecipeType } from "@/shared/types"

type ActiveRecipeType = RecipeType & {
  modifiedServings: number,
  modifiedIngredients: RecipeType['ingredients']
}

export type RecipeSliceState = { 
  needsRefresh: boolean,
  recipes: RecipeType[],
  activeRecipe: ActiveRecipeType | null
}