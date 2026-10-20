import { selectMainIngredients, selectCuisines } from '@/integrations/supabase/queries'
import { FilterOptionType } from '@/shared/types'

export const fetchMainIngredients = async (): Promise<FilterOptionType[]> => {

    const data = await selectMainIngredients()
    return data

}

export const fetchCuisines = async (): Promise<FilterOptionType[]> => {
 
    const data = await selectCuisines()
    return data
 
}