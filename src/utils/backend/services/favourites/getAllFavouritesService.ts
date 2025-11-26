import { selectAllFavourites } from "../../db/favourites/";
import { FavouriteType } from "../../types/";


export const getAllFavouritesService = async (uid: string): Promise<FavouriteType[]> => {

  try {
    const dbData = await selectAllFavourites(uid)
    const formattedData: FavouriteType[] = dbData.map(row => ({
      userId: row.user_id,
      recipeId: row.recipe_id,
      createdAt: row.created_at,
      title: row.recipes.title
    }))
    return formattedData
  } catch (error) {
    throw error
  }
}