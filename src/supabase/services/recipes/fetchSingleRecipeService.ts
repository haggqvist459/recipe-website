import { selectSingleRecipe } from '@/supabase/queries'
import { mapSingleRecipeDbToUI } from "./utils"
import { LanguageType, RecipeType } from '@/types'



export const fetchSingleRecipe = async (id: string, language: LanguageType): Promise<RecipeType> => {
    const dbData = await selectSingleRecipe(id, language)
    return mapSingleRecipeDbToUI(dbData)  
}