import { handleError } from "@/errorHandling"
import { deleteCuisine, deleteMainIngredient } from "@/supabase/queries"
import { FilterCategoryType } from "@/types"

export const deleteFilterService = async (filterCategory: FilterCategoryType, filterId: string) => {

  try {
    if (filterCategory === 'types') {
      await deleteMainIngredient(filterId)
    } else if (filterCategory === 'cuisines') {
      await deleteCuisine(filterId)
    }
  } catch (error) {
    const errorMessage = handleError(error)
    throw errorMessage
  }
}