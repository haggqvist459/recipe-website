import { SORTING_FILTERS } from "./constants"
import { FilterOptionType } from "@/shared/types"

export type SortingFilterKey = keyof typeof SORTING_FILTERS

export type FilterStateType = {
  mainIngredientFilters: FilterOptionType[]
  selectedMainIngredientFilters: FilterOptionType[]
  cuisineFilters: FilterOptionType[]
  selectedCuisineFilters: FilterOptionType[]
  selectedSortingFilter: SortingFilterKey
}
