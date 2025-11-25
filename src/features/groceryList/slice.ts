import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import { VISIBILITY_FILTERS } from './constants'
import { ListState, VisibilityFilterData } from './types'


const initialState: ListState = {
  visibilityFilter: VISIBILITY_FILTERS.UNMARKED,
  items: []
}

const groceryListSlice = createSlice({
  name: 'groceryList',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<string>) => {
      state.items.push({
        id: uuidv4(),
        text: action.payload,
        completed: false
      })
    },
    toggleCompletion: (state, action: PayloadAction<string>) => {
      const item = state.items.find(item => item.id === action.payload)
      if (item) {
        item.completed = !item.completed
      }
    },
    deleteItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    },
    clearList: (state) => {
      state.items = [];
    },
    setVisibilityFilter: (state, action: PayloadAction<VisibilityFilterData>) => {
      state.visibilityFilter = action.payload;
    }
  }
})

export const { addItem, toggleCompletion, deleteItem, clearList, setVisibilityFilter } = groceryListSlice.actions;
export default groceryListSlice.reducer;