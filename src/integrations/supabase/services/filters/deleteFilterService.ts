import { deleteCuisine, deleteMainIngredient } from "@/integrations/supabase/queries"
import { FilterCategoryType } from "@/shared/types"

export const deleteFilterService = async (filterCategory: FilterCategoryType, filterId: string) => {

    if (filterCategory === 'mainIngredients') {
      await deleteMainIngredient(filterId)
    } else if (filterCategory === 'cuisines') {
      await deleteCuisine(filterId)
    }

}