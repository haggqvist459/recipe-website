import { RecipeType } from "@/types"
import { SECTIONS } from "./constants"

export type RecipeDraftType = Omit<RecipeType, "id" | "createdAt">



export type RecipeFormErrors = {
  title?: boolean
  servings?: boolean
  ingredients?: Record<string, { name?: boolean; amount?: boolean; unit?: boolean }>
  instructions?: Record<string, { title?: boolean; text?: boolean }>
}

export type RecipeFormState = {
  recipeDraft: RecipeDraftType
  currentSection: (typeof SECTIONS)[number]
  errors: RecipeFormErrors
}
