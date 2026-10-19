import { deleteFavourite } from '@/integrations/supabase/queries'

export const removeFavourite = async (uid: string, recipeId: string): Promise<void> => {
  
    await deleteFavourite(uid, recipeId)
  
}