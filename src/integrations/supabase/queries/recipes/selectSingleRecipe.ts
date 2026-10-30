import { supabase } from '@/integrations/supabase/client'
import { DB_TABLES, DB_COLUMNS } from '@/shared/constants'

export const selectSingleRecipe = async (
  id: string,
) => {
  const { data } = await supabase
    .from(DB_TABLES.RECIPES)
    .select(`
        *,
        ${DB_TABLES.RECIPE_MAIN_INGREDIENTS} (
        ${DB_TABLES.MAIN_INGREDIENTS} (
        ${DB_COLUMNS.MAIN_INGREDIENTS.ID},
          *
          )
        ),
        ${DB_TABLES.RECIPE_CUISINES} (
        ${DB_TABLES.CUISINES} (
        ${DB_COLUMNS.CUISINES.ID},
          *
          )
        )     
      `)
    .eq(DB_COLUMNS.RECIPES.ID, id)
    .single()
    .throwOnError()

  return data
}
