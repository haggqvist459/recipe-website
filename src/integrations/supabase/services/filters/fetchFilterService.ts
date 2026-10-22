import { selectMainIngredients, selectCuisines } from '@/integrations/supabase/queries'
import { FilterOptionType } from '@/shared/types'

export const fetchMainIngredients = async (): Promise<FilterOptionType[]> => {

  const { data } = await selectMainIngredients()
  return data.map(row => ({
    id: row.id,
    categoryCounter: row.category_counter,
    sv_text: row.sv_text ?? '',
    en_text: row.en_text ?? ''
  }))

}

export const fetchCuisines = async (): Promise<FilterOptionType[]> => {

  const { data } = await selectCuisines()

  return data.map(row => ({
    id: row.id,
    categoryCounter: row.category_counter,
    sv_text: row.sv_text ?? '',
    en_text: row.en_text ?? ''
  }))

}