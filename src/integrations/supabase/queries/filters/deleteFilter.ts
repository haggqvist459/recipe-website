import { supabase } from "@/integrations/supabase/client"
import { DB_COLUMNS } from "@/shared"

export const deleteMainIngredient = async (filterId: string): Promise<void> => {

  await supabase
  .from('main_ingredients')
  .delete()
  .eq(DB_COLUMNS.MAIN_INGREDIENTS.ID, filterId)
  .throwOnError()

}

export const deleteCuisine = async (filterId: string): Promise<void> => {

  await supabase
  .from('cuisines')
  .delete()
  .eq(DB_COLUMNS.CUISINES.ID, filterId)
  .throwOnError()

}