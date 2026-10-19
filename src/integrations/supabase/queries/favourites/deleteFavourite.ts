import { supabase } from '@/integrations/supabase/client'
import { DB_COLUMNS } from '@/shared/constants'

export const deleteFavourite = async (uid: string, recipeId: string): Promise<void> => {
  await supabase
  .from('favourites')
  .delete()
  .eq(DB_COLUMNS.FAVOURITES.USER_ID, uid)
  .eq(DB_COLUMNS.FAVOURITES.RECIPE_ID, recipeId)
  .throwOnError()
}