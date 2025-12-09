import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RecipeSliceState } from "./types"
import { RecipeType } from "@/types"



const initialState: RecipeSliceState = {
  needsRefresh: true,
  recipes: []
} 

const recipeSlice = createSlice({
  name:'recipeSlice',
  initialState,
  reducers: {
    setRecipes: (state, action: PayloadAction<RecipeType[]>) => {
      state.recipes = action.payload
      state.needsRefresh = false
    },
    markNeedsRefresh: (state) => {
      state.needsRefresh = true
    },
    resetState: () => initialState  
  }
})


export const { setRecipes, markNeedsRefresh, resetState } = recipeSlice.actions
export default recipeSlice.reducer