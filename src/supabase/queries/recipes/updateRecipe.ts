import { UpdateRecipeType } from '@/types';
import { supabase } from '@/supabase/client';
import { DB_COLUMNS } from '@/utils/constants';


export const updateRecipe = async (recipeId: string, recipeDraft: UpdateRecipeType) => {

  const updatedId = await supabase
    .from('recipes')
    .update(recipeDraft)
    .eq(DB_COLUMNS.RECIPES.ID, recipeId)
    .throwOnError()

  return updatedId
}