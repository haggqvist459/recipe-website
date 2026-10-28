import { supabase } from '@/integrations/supabase/client'
import { DB_COLUMNS } from '@/shared/constants'

export const selectAllFavourites = async (uid: string) => {
  const { data } = await supabase
    .from('favourites')
    .select(`
      *,
      recipes(
        ${DB_COLUMNS.RECIPES.TITLE},
        cuisines(*),
        main_ingredients(*)
      )
    `)
    .eq(DB_COLUMNS.FAVOURITES.USER_ID, uid)
    .order('created_at', { ascending: false})
    .throwOnError()

  return data
}