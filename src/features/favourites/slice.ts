import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { FavouriteType, FavouriteSliceType } from "./types";


const initialState: FavouriteSliceType = {
  favouriteList: [],
  isLoaded: false
}

const favouriteSlice = createSlice({
  name: 'favouriteSlice',
  initialState,
  reducers: {
    setFavourites: (
      state,
      action: PayloadAction<FavouriteType[]>
    ) => {
      state.favouriteList = action.payload
    },
    addFavourite: (
      state,
      action: PayloadAction<FavouriteType>
    ) => {
      state.favouriteList.push(action.payload)
    },
    deleteFavourite: (
      state,
      action: PayloadAction<string>
    ) => {
     state.favouriteList = state.favouriteList.filter(favourite => favourite.recipeId !== action.payload)
    },
    setLoading: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.isLoaded = action.payload
    },
    resetState: () => initialState
  }
})

export const { setFavourites, resetState, deleteFavourite, addFavourite } = favouriteSlice.actions
export default favouriteSlice.reducer