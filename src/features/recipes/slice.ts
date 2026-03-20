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
    setActiveRecipe: (state, action: PayloadAction<RecipeType>) => {
      state.activeRecipe = {
        ...action.payload,
        modifiedServings: action.payload.servings,
        modifiedIngredients: action.payload.ingredients.map(i => ({ ...i }))
      }
    },
    clearActiveRecipe: (state) => {
      state.activeRecipe = null
    },
    updateServings: (state, action: PayloadAction<number>) => {
      if (!state.activeRecipe) return

      const ratio = action.payload / state.activeRecipe.servings
      state.activeRecipe.modifiedServings = action.payload
      state.activeRecipe.modifiedIngredients = state.activeRecipe.ingredients.map(ingredient => ({
        ...ingredient,
        amount: parseFloat((parseFloat(ingredient.amount) * ratio).toFixed(2)).toString()
      }))
    },
    resetState: () => initialState
  }
})


export const { setRecipes, markNeedsRefresh, resetState, removeRecipe, setActiveRecipe, clearActiveRecipe, updateServings } = recipeSlice.actions
export default recipeSlice.reducer