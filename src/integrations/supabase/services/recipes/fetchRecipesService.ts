import { mapMultipleRecipesDbToUI } from './utils'
import { fetchRecipesWithRelationsFromDB } from '@/integrations/supabase/queries'
import { RecipeType } from '@/types'

export const fetchAllRecipes = async (): Promise<RecipeType[]> => {
    const dbData = await fetchRecipesWithRelationsFromDB()
    return mapMultipleRecipesDbToUI(dbData)
}