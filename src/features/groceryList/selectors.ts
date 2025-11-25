import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/redux' 
import { VISIBILITY_FILTERS } from './constants'
import { ListItemData } from './types';

export const selectItems = createSelector(
  [(state: RootState) => state.groceryList.items, (state: RootState) => state.groceryList.visibilityFilter],
  (items, filter) => {
    switch (filter) {
      case VISIBILITY_FILTERS.MARKED:
        return items.filter((item: ListItemData) => item.completed);
      case VISIBILITY_FILTERS.UNMARKED:
        return items.filter((item: ListItemData) => !item.completed);
      case VISIBILITY_FILTERS.ALL:
      default:
        return items;
    }
  }
);
