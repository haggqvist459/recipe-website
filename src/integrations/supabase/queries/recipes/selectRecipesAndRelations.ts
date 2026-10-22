import { supabase } from '@/integrations/supabase/client'
import { DB_TABLES } from '@/shared/constants'


export const fetchRecipesWithRelationsFromDB = async ()=> {
  const { data } = await supabase
    .from('recipes')
    .select(`*,
        ${DB_TABLES.RECIPE_MAIN_INGREDIENTS} (
        ${DB_TABLES.MAIN_INGREDIENTS} (*)),
        ${DB_TABLES.RECIPE_CUISINES} (
        ${DB_TABLES.CUISINES} (*))`)
    .throwOnError()

  return data
} 
