import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RecipeSliceState } from "./types"
import { RecipeType } from "@/shared/types"



const initialState: RecipeSliceState = {
  needsRefresh: true,
  recipes: {},
  activeRecipe: null
}

const recipeSlice = createSlice({
  name: 'recipeSlice',
  initialState,
  reducers: {
    setRecipes: (state, action: PayloadAction<Record<string, RecipeType>>) => {
      state.recipes = action.payload
      state.needsRefresh = false
    },
    markNeedsRefresh: (state) => {
      state.needsRefresh = true
    },
    removeRecipe: (state, action: PayloadAction<string>) => {
      const id = action.payload
      const { [id]: removedRecipe, ...remainingRecipes } = state.recipes
      state.recipes = remainingRecipes
    },
    resetState: () => initialState
  }
})


export const { setRecipes, markNeedsRefresh, resetState, removeRecipe } = recipeSlice.actions
export default recipeSlice.reducer