import { configureStore } from "@reduxjs/toolkit";
import { saveData, LOCALSTORAGE_KEYS } from "@/utils";
import recipeForms from '@/features/recipeForms';
import filters from '@/features/filters';
import favourites from '@/features/favourites';
import groceryList from '@/features/groceryList';
import recipeList from '@/features/recipes';

export const store = configureStore({
  reducer: {
    recipeForms,
    filters,
    favourites,
    groceryList,
    recipeList
  }
})

store.subscribe(() => {
  const state = store.getState();

  // Object.values(LOCALSTORAGE_KEYS).forEach((key) => {
  //   saveData(key, state.appState[key]);
  // });

  saveData(LOCALSTORAGE_KEYS.GROCERY_LIST, state.groceryList)

});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
