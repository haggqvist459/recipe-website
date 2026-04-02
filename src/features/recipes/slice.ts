import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RecipeSliceState } from "./types"
import { RecipeType } from "@/types"



const initialState: RecipeSliceState = {
  needsRefresh: true,
  recipes: [],
  activeRecipe: null
}

const recipeSlice = createSlice({
  name: 'recipeSlice',
  initialState,
  reducers: {
    setRecipes: (state, action: PayloadAction<RecipeType[]>) => {
      state.recipes = action.payload
      state.needsRefresh = false
    },
    markNeedsRefresh: (state) => {
      state.needsRefresh = true
    },
    removeRecipe: (state, action: PayloadAction<string>) => {
      state.recipes = state.recipes.filter(recipe => recipe.id !== action.payload);
    },
    resetState: () => initialState
  }
})


export const { setRecipes, markNeedsRefresh, resetState, removeRecipe } = recipeSlice.actions
export default recipeSlice.reducer