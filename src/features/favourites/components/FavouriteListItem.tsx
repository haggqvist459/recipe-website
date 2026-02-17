import { useState, useRef } from 'react'
import { FavouriteType } from "../types";
import { Trashcan, IconButton } from '@/components';
import { removeFavourite } from '@/supabase/services';
import { useAppDispatch } from '@/redux/hooks';
import { deleteFavourite, addFavourite } from '../slice';

type Props = {
  favourite: FavouriteType
}

const FavouriteListItem = ({ favourite }: Props) => {

  const dispatch = useAppDispatch()
  const [showDelete, setShowDelete] = useState(false)
  const touchStartX = useRef(0);


  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const SWIPE_THRESHOLD = 30;

    if (deltaX < -SWIPE_THRESHOLD) {
      setShowDelete(true);
    } else if (deltaX > SWIPE_THRESHOLD) {
      setShowDelete(false);
    }
    touchStartX.current = 0;
  };

  const handleDelete = async () => {
    try {

      dispatch(deleteFavourite(favourite.recipeId))

      await removeFavourite(favourite.userId, favourite.recipeId)
    } catch (error) {
      console.error('Failed to delete favourite:', error)
      dispatch(addFavourite(favourite))
    }
  }

  return (
    <div className="w-full flex justify-between border-b"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="w-full flex flex-col my-2">
        <span className="font-medium text-primary-text">{favourite.title}</span>
        <span className="font-light text-primary-text">
          {new Date(favourite.createdAt).toLocaleDateString()}
        </span>
      </div>
      <div
        className={`self-center transition-all duration-300 ease-out overflow-hidden ${showDelete ? 'w-auto opacity-100 translate-x-0' : 'w-0 opacity-0 translate-x-full'
          }`}
      >
        <IconButton onClick={() => handleDelete()}>
          <Trashcan />
        </IconButton>
      </div>
    </div>
  )
}

export default FavouriteListItem;