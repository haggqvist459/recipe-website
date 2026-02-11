import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import { loadData, LOCALSTORAGE_KEYS, saveData } from '@/utils'
import { VISIBILITY_FILTERS } from './constants'
import type { ListItemData, ListState, VisibilityFilterData } from './types'
import type { IngredientType } from '@/types'

const initialState: ListState = loadData<ListState>(LOCALSTORAGE_KEYS.GROCERY_LIST) ?? {
  visibilityFilter: VISIBILITY_FILTERS.UNMARKED,
  items: [],
  lastModified: ''
}

const groceryListSlice = createSlice({
  name: 'groceryList',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<string>) => {
      state.items.push({
        id: uuidv4(),
        text: action.payload.trim(),
        completed: false
      })
      state.lastModified = new Date().toISOString()
    },
    addIngredients: (state, action: PayloadAction<IngredientType[]>
    ) => {
      action.payload.forEach((ingredient) => {
        const existingItem = state.items.find(
          (item) => item.text === ingredient.name && item.unit === ingredient.unit
        );

        if (existingItem) {
          const currentAmount = parseFloat(existingItem.amount || '0');
          const newAmount = parseFloat(ingredient.amount);
          existingItem.amount = (currentAmount + newAmount).toString();
        } else {
          state.items.push({
            id: uuidv4(),
            text: ingredient.name.trim(),
            amount: ingredient.amount,
            unit: ingredient.unit,
            completed: false
          });
        }
      });
      state.lastModified = new Date().toISOString()
    },
    loadListFromDB: (state, action: PayloadAction<ListItemData[]>) => {
      state.items = action.payload
      state.lastModified = new Date().toISOString()
    },
    toggleCompletion: (state, action: PayloadAction<string>) => {
      const item = state.items.find(item => item.id === action.payload)
      if (item) {
        item.completed = !item.completed
      }
      state.lastModified = new Date().toISOString()
    },
    deleteItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload)
      state.lastModified = new Date().toISOString()
    },
    clearList: (state) => {
      state.items = [];
    },
    setVisibilityFilter: (state, action: PayloadAction<VisibilityFilterData>) => {
      state.visibilityFilter = action.payload;
    },
    resetState: () => {
      const reset: ListState = {
        visibilityFilter: VISIBILITY_FILTERS.UNMARKED,
        items: [],
        lastModified: ''
      }

      saveData(LOCALSTORAGE_KEYS.GROCERY_LIST, reset)
      return reset
    }
  }
})

export const { addItem, addIngredients, loadListFromDB, toggleCompletion, deleteItem, clearList, setVisibilityFilter, resetState } = groceryListSlice.actions;
export default groceryListSlice.reducer;