import { supabase } from '@/supabase/client'
import { DB_TABLES, DB_COLUMNS } from '@/utils/constants';
import { DbRecipeWithRelations, LanguageType } from '@/types';

export const selectSingleRecipe = async (
  id: string,
  language: LanguageType
): Promise<DbRecipeWithRelations> => {

  try {
    const { data } = await supabase
      .from(DB_TABLES.RECIPES)
      .select<string, DbRecipeWithRelations>(`
        *,
        ${DB_TABLES.RECIPE_MAIN_INGREDIENTS} (
        ${DB_TABLES.MAIN_INGREDIENTS} (
        ${DB_COLUMNS.MAIN_INGREDIENTS.ID},
          text:${language}_text
          )
        ),
        ${DB_TABLES.RECIPE_CUISINES} (
        ${DB_TABLES.CUISINES} (
        ${DB_COLUMNS.CUISINES.ID},
          text:${language}_text
          )
        )     
      `)
      .eq(DB_COLUMNS.RECIPES.ID, id)
      .single()
      .throwOnError()

    return data

  } catch (error) {
    throw error
  }
}
