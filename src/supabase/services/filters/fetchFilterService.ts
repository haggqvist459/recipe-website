import { selectMainIngredients, selectCuisines } from '@/supabase/queries'
import { FilterOptionType } from '@/types'

export const fetchMainIngredients = async (): Promise<FilterOptionType[]> => {

    const data = await selectMainIngredients()
    return data

}

export const fetchCuisines = async (): Promise<FilterOptionType[]> => {
 
    const data = await selectCuisines()
    return data
 
}