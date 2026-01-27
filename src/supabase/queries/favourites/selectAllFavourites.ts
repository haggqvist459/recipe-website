import { supabase } from '@/supabase/client';
import { DB_COLUMNS, DB_TABLES } from '@/utils/constants';

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