import { selectAllFavourites } from '@/integrations/supabase/queries'
import { FavouriteType } from '@/features/favourites/types'

export const fetchAllFavourites = async (uid: string): Promise<FavouriteType[]> => {

  const dbData = await selectAllFavourites(uid)
  const formattedData: FavouriteType[] = dbData.map(row => ({
    userId: row.user_id,
    recipeId: row.recipe_id,
    createdAt: row.created_at,
    title: row.recipes.title,
    cuisines: row.recipes.cuisines.map(cuisine => ({
      id: cuisine.id,
      categoryCounter: cuisine.category_counter,
      sv_text: cuisine.sv_text,
      en_text: cuisine.en_text
    })),
    mainIngredients: row.recipes.main_ingredients.map(mainIngredient => ({
      id: mainIngredient.id,
      sv_text: mainIngredient.sv_text,
      en_text: mainIngredient.en_text,
      categoryCounter: mainIngredient.category_counter
    }))
  }))
  return formattedData
}