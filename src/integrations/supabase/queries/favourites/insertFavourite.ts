import { supabase } from '@/integrations/supabase/client'
import { DB_COLUMNS, DB_TABLES } from '@/shared/constants'

export const insertFavourite = async (uid: string, recipeId: string) => {
  const { data } = await supabase
    .from('favourites')
    .insert({
      [DB_COLUMNS.FAVOURITES.USER_ID]: uid,
      [DB_COLUMNS.FAVOURITES.RECIPE_ID]: recipeId
    })
    .select(`
    *,
    ${DB_TABLES.RECIPES}:${DB_COLUMNS.FAVOURITES.RECIPE_ID}(
      ${DB_COLUMNS.RECIPES.TITLE}
    )
    `)
    .single()
    .throwOnError()

  return data
}