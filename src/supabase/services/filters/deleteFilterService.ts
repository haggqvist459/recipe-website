import { deleteCuisine, deleteMainIngredient } from "@/supabase/queries"
import { FilterCategoryType } from "@/types"

export const deleteFilterService = async (filterCategory: FilterCategoryType, filterId: string) => {

    if (filterCategory === 'types') {
      await deleteMainIngredient(filterId)
    } else if (filterCategory === 'cuisines') {
      await deleteCuisine(filterId)
    }

}