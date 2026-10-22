import { supabase } from '@/integrations/supabase/client'

export const selectMainIngredients = async () => {

  return await supabase
    .from('main_ingredients')
    .select('*')
    .throwOnError()
}

export const selectCuisines = async () => {
  return await supabase
    .from("cuisines")
    .select('*')
    .throwOnError()
}