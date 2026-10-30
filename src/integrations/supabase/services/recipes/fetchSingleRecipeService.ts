import { selectSingleRecipe } from '@/integrations/supabase/queries'
import { mapSingleRecipeDbToUI } from "./utils"
import { RecipeType } from '@/shared/types'



export const fetchSingleRecipe = async (id: string): Promise<RecipeType> => {
    const dbData = await selectSingleRecipe(id)
    return mapSingleRecipeDbToUI(dbData)  
}