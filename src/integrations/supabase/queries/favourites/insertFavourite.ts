import { supabase } from '@/integrations/supabase/client'
import { DB_COLUMNS } from '@/shared/constants'

export const insertFavourite = async (uid: string, recipeId: string) => {
  const { data } = await supabase
    .from('favourites')
    .insert({
      [DB_COLUMNS.FAVOURITES.USER_ID]: uid,
      [DB_COLUMNS.FAVOURITES.RECIPE_ID]: recipeId
    })
    .select(`
      *,
      recipes(
        ${DB_COLUMNS.RECIPES.TITLE},
        cuisines(*),
        main_ingredients(*)
      )
    `)
    .single()
    .throwOnError()

  return data
}