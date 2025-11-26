import { useState, useRef } from 'react';
import { Circle, CheckSolidCircle, Trashcan } from '@/components';
import { useAppDispatch } from '@/redux';
import { VISIBILITY_FILTERS } from '../constants';
import { deleteItem, toggleCompletion } from '../slice';
import { ListItemData } from '../types';

type Props = {
  item: ListItemData
  activeFilter: (typeof VISIBILITY_FILTERS)[keyof typeof VISIBILITY_FILTERS];
}

const GroceryListItem = ({ item, activeFilter }: Props) => {


  const dispatch = useAppDispatch()
  const [showDelete, setShowDelete] = useState(false)
  const [isSliding, setIsSliding] = useState(false)
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


  const handleToggle = (id: string) => {
    setIsSliding(true);

    // wait for animation to complete before toggling state
    setTimeout(() => {
      setIsSliding(false);
      dispatch(toggleCompletion(id))
    }, 300); // match your transition duration
  };

  return (
    <div className={`flex justify-between items-baseline w-full my-1 py-1 transition-transform duration-300 ease-in-out ${isSliding
      ? activeFilter === VISIBILITY_FILTERS.UNMARKED
        ? 'translate-x-full'
        : activeFilter === VISIBILITY_FILTERS.MARKED
          ? '-translate-x-full'
          : ''
      : 'translate-x-0'
      }`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="flex flex-grow space-x-1 items-center"
        onClick={() => handleToggle(item.id)}
      >
        {item.completed ? <CheckSolidCircle /> : <Circle />}
        <span className={`text-primary-text ${item.completed ? 'line-through' : ''}`}>{item.text}{item.amount && `, ${item.amount} ${item.unit}`}</span>
      </div>
      <div
        className={`transition-all duration-300 overflow-hidden ${showDelete ? 'opacity-100' : 'opacity-0'}`}
        onClick={() => dispatch(deleteItem(item.id))}
      >
        <Trashcan />
      </div>
    </div>
  );
}

export default GroceryListItem;