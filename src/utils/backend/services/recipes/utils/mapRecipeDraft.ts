import type { RecipeDraftType } from "../../../types"

export const mapRecipeDraftToDb = (draft: RecipeDraftType) => {
  return {
    title: draft.title,
    description: draft.description?.trim() || null,
    include_weekly: draft.includeWeekly,     
    ingredients: draft.ingredients,          
    instructions: draft.instructions,        
  };
};