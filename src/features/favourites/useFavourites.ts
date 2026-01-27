import { useEffect } from 'react';
import { useAuth } from '@/contexts';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setFavourites } from '@/features/favourites';
import { fetchAllFavourites } from '@/supabase/services';

export const useFavourites = () => {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const favourites = useAppSelector(state => state.favourites.favouriteList);
  const isLoaded = useAppSelector(state => state.favourites.isLoaded);
  
  useEffect(() => {
    if (user && !isLoaded) {
      fetchAllFavourites(user.id)
        .then(data => dispatch(setFavourites(data)))
        .catch(err => console.error('Load favourites error:', err));
    }
  }, [user, isLoaded]);
  
  return favourites;
};

export const useIsFavourited = (recipeId: string): boolean => {
  const favourites = useFavourites();
  return favourites.some(fav => fav.recipeId === recipeId);
};