import { RecipeType } from "@/types"
import { SECTIONS } from "./constants"

export type RecipeDraftType = Omit<RecipeType, "id" | "createdAt">

export type RecipeFormState = {
  recipeDraft: RecipeDraftType
  currentSection: (typeof SECTIONS)[number]
}

