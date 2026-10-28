import { insertFavourite } from '@/integrations/supabase/queries'
import { FavouriteType } from '@/features/favourites/types'

export const setFavourite = async (uid: string, recipeId: string): Promise<FavouriteType> => {

    const dbData = await insertFavourite(uid, recipeId)
    const formattedData: FavouriteType = {
      userId: dbData.user_id,
      recipeId: dbData.recipe_id,
      createdAt: dbData.created_at,
      title: dbData.recipes.title,
      cuisines: dbData.recipes.cuisines.map(cuisine => ({
        id: cuisine.id,
        categoryCounter: cuisine.category_counter,
        sv_text: cuisine.sv_text,
        en_text: cuisine.en_text
      })),
      mainIngredients: dbData.recipes.main_ingredients.map(mainIngredient => ({
        id: mainIngredient.id,
        categoryCounter: mainIngredient.category_counter,
        sv_text: mainIngredient.sv_text,
        en_text: mainIngredient.en_text
      }))
    } 
    return formattedData

}