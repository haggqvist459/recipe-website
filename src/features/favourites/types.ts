import { FilterOptionType } from "@/shared/types"

export type FavouriteType = {
  userId: string,
  recipeId: string,
  createdAt: string,
  title: string
  cuisines: FilterOptionType[],
  mainIngredients: FilterOptionType[]
}

export type FavouriteSliceType = {
  favouriteList: FavouriteType[]
  isLoaded: boolean
}