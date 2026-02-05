import { supabase } from "@/supabase/client"
import { LanguageType } from "@/types"
import { DB_COLUMNS } from "@/utils"

export const updateMainIngredient = async (filterId: string, updatedText: string, language: LanguageType) => {
  const columnName = `${language}_text`;

  await supabase
    .from('main_ingredients')
    .update({ [columnName]: updatedText })
    .eq(DB_COLUMNS.MAIN_INGREDIENTS.ID, filterId)
    .throwOnError()
}

export const updateCuisine = async (filterId: string, updatedText: string, language: LanguageType) => {
  const columnName = `${language}_text`;

  await supabase
    .from('cuisines')
    .update({[columnName]: updatedText})
    .eq(DB_COLUMNS.CUISINES.ID, filterId)
    .throwOnError()
}