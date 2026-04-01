import { selectAllFavourites } from '@/supabase/queries'
import { FavouriteType } from '@/types'

export const fetchAllFavourites = async (uid: string): Promise<FavouriteType[]> => {

    const dbData = await selectAllFavourites(uid)
    const formattedData: FavouriteType[] = dbData.map(row => ({
      userId: row.user_id,
      recipeId: row.recipe_id,
      createdAt: row.created_at,
      title: row.recipes.title
    }))
    return formattedData
}