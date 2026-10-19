import { supabase } from '@/integrations/supabase/client'
import { DB_COLUMNS, DB_TABLES } from '@/shared/constants'

export const selectAllFavourites = async (uid: string) => {
  const { data } = await supabase
    .from('favourites')
    .select(`
    *,
    ${DB_TABLES.RECIPES}:${DB_COLUMNS.FAVOURITES.RECIPE_ID}(
      ${DB_COLUMNS.RECIPES.TITLE}
    )
    `)
    .eq(DB_COLUMNS.FAVOURITES.USER_ID, uid)
    .throwOnError()

  return data
}