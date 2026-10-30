import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { FilterStateType, SortingFilterKey } from "./types"
import { FilterOptionType, FilterCategoryType, LanguageType } from "@/shared/types"


const initialState: FilterStateType = {
  mainIngredientFilters: [],
  cuisineFilters: [],
  selectedMainIngredientFilters: [],
  selectedCuisineFilters: [],
  selectedSortingFilter: 'newest'
}


const filterSlice = createSlice({
  name: 'filterSlice',
  initialState,
  reducers: {
    setFilterList: (
      state,
      action: PayloadAction<{
        filterCategory: FilterCategoryType
        list: FilterOptionType[]
      }>
    ) => {
      switch (action.payload.filterCategory) {
        case 'mainIngredients':
          state.mainIngredientFilters = action.payload.list
          break
        case 'cuisines':
          state.cuisineFilters = action.payload.list
          break
        default:
          console.error("filterSlice - setFilterList error: incorrect filterCategory")
          break
      }
    },
    setActiveFilter: (
      state,
      action: PayloadAction<{ filterCategory: FilterCategoryType, filter: FilterOptionType }>
    ) => {
      const { filterCategory, filter } = action.payload

      switch (filterCategory) {
        case 'mainIngredients':
          const typeSelected = state.selectedMainIngredientFilters.some(
            selected => selected.id === filter.id
          )

          state.selectedMainIngredientFilters = typeSelected
            ? state.selectedMainIngredientFilters.filter(selected => selected.id !== filter.id)
            : [...state.selectedMainIngredientFilters, filter]
          break
        case 'cuisines':
          const cuisineSelected = state.selectedCuisineFilters.some(
            selected => selected.id === filter.id
          )

          state.selectedCuisineFilters = cuisineSelected
            ? state.selectedCuisineFilters.filter(selected => selected.id !== filter.id)
            : [...state.selectedCuisineFilters, filter]
          break
        default:
          console.error("filterSlice - setActiveFiler error: incorrect filter category in payload")
          break
      }
    },
    setActiveSorting: (
      state,
      action: PayloadAction<SortingFilterKey>
    ) => {
      state.selectedSortingFilter =
        state.selectedSortingFilter === action.payload ? "newest" : action.payload
    },
    addFilter: (
      state,
      action: PayloadAction<{ filterCategory: FilterCategoryType, filter: FilterOptionType }>
    ) => {
      const { filterCategory, filter } = action.payload

      switch (filterCategory) {
        case 'mainIngredients':
          state.mainIngredientFilters.push(filter)
          break
        case 'cuisines':
          state.cuisineFilters.push(filter)
          break
        default:
          console.error("filterSlice - addFilter error: incorrect filterCategory")
          break
      }
    },
    deleteFilter: (
      state,
      action: PayloadAction<{ filterCategory: FilterCategoryType, filterId: string }>
    ) => {
      const { filterCategory, filterId } = action.payload

      switch (filterCategory) {
        case 'mainIngredients':
          state.mainIngredientFilters = state.mainIngredientFilters.filter(m => m.id !== filterId)
          break
        case 'cuisines':
          state.cuisineFilters = state.cuisineFilters.filter(m => m.id !== filterId)
          break
        default:
          console.error("filterSlice - deleteFilter error: incorrect filterCategory")
          break
      }
    },
    updateFilter: (
      state,
      action: PayloadAction<{
        filterCategory: FilterCategoryType
        filterId: string
        updatedText: string,
        language: LanguageType
      }>
    ) => {
      const { filterCategory, filterId, updatedText, language } = action.payload
      const textField = `${language}_text` as 'en_text' | 'sv_text'

      switch (filterCategory) {
        case 'mainIngredients':
          const typeFilter = state.mainIngredientFilters.find(m => m.id === filterId)
          if (typeFilter) {
            typeFilter[textField] = updatedText
          }
          break
        case 'cuisines':
          const cuisineFilter = state.cuisineFilters.find(m => m.id === filterId)
          if (cuisineFilter) {
            cuisineFilter[textField] = updatedText
          }
          break
        default:
          console.error("filterSlice - updateFilter error: incorrect filterCategory")
          break
      }
    },
    resetState: () => initialState
  }
})

export const { setFilterList, setActiveFilter, setActiveSorting, addFilter, deleteFilter, updateFilter, resetState } = filterSlice.actions
export default filterSlice.reducer