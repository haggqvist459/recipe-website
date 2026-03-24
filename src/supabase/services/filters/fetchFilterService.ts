import { handleError } from '@/errorHandling'
import { selectMainIngredients, selectCuisines } from '@/supabase/queries'
import { FilterOptionType } from '@/types'

export const fetchMainIngredients = async (): Promise<FilterOptionType[]> => {
  try {
    const data = await selectMainIngredients()
    return data
  } catch (error) {
    const errorMessage = handleError(error)
    throw errorMessage
  }
};

export const fetchCuisines = async (): Promise<FilterOptionType[]> => {
  try {
    const data = await selectCuisines()
    return data
  } catch (error) {
    const errorMessage = handleError(error)
    throw errorMessage
  }
};