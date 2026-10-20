import { selectSingleRecipe } from '@/integrations/supabase/queries'
import { mapSingleRecipeDbToUI } from "./utils"
import { LanguageType, RecipeType } from '@/shared/types'



export const fetchSingleRecipe = async (id: string, language: LanguageType): Promise<RecipeType> => {
    const dbData = await selectSingleRecipe(id, language)
    return mapSingleRecipeDbToUI(dbData)  
}