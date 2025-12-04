import { configureStore } from "@reduxjs/toolkit";
import { saveData, LOCALSTORAGE_KEYS } from "@/utils";
import recipeFormReducer from '@/features/createRecipe';
import filterReducer from '@/features/filters';
import favouriteReducer from '@/features/favourites';
import groceryListReducer from '@/features/groceryList';

export const store = configureStore({
  reducer: {
    recipeForm: recipeFormReducer,
    filters: filterReducer,
    favourites: favouriteReducer,
    groceryList: groceryListReducer
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
