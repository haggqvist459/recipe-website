import { useEffect } from 'react';
import { useAuth, useNotification } from '@/contexts';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setFavourites } from '@/features/favourites';
import { fetchAllFavourites } from '@/supabase/services';

export const useFavourites = () => {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const favourites = useAppSelector(state => state.favourites.favouriteList);
  const isLoaded = useAppSelector(state => state.favourites.isLoaded);

  const { showToast } = useNotification()

  useEffect(() => {

    const loadFavourites = async () => {
      if (user && !isLoaded) {
        try {
         const favourites = await fetchAllFavourites(user.id)
         dispatch(setFavourites(favourites))
        } catch (error) {
          if (typeof error === 'string'){
            showToast(error, 'error')          
          } else {
            showToast('An unknown error occurred while fetching favourites.', 'error')
          }
        }
      }
    }

    loadFavourites()
  }, [user, isLoaded]);

  return favourites;
};

export const useIsFavourited = (recipeId: string): boolean => {
  const favourites = useFavourites();
  return favourites.some(fav => fav.recipeId === recipeId);
};