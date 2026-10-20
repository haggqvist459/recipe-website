import type { RecipeDraftType } from '@/shared/types'

export const mapRecipeDraftToDb = (draft: RecipeDraftType) => {
  return {
    title: draft.title,
    description: draft.description?.trim() || null,
    include_weekly: draft.includeWeekly,     
    ingredients: draft.ingredients,          
    instructions: draft.instructions,
    servings: draft.servings        
  }
}