import { supabase } from '@/integrations/supabase/client'
import { DB_TABLES} from '@/shared/constants'
import { DbRecipeWithRelations } from '@/types'


export const fetchRecipesWithRelationsFromDB = async (): Promise<DbRecipeWithRelations[]> => {

  try {

    const { data } = await supabase
      .from(DB_TABLES.RECIPES)
      .select<string, DbRecipeWithRelations>(`*,
        ${DB_TABLES.RECIPE_MAIN_INGREDIENTS} (
        ${DB_TABLES.MAIN_INGREDIENTS} (*)),
        ${DB_TABLES.RECIPE_CUISINES} (
        ${DB_TABLES.CUISINES} (*))`)
      .throwOnError()

    if (data.length === 0) throw new Error("No recipes found or access denied")
    console.log('fetchRecipesWithRelationsFromDB, data: ', data)
    return data

  } catch (error) {
    throw error
  }

}
