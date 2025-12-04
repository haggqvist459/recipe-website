import { v4 as uuidv4 } from "uuid";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { RecipeFormState } from "./types";
import { IngredientType, InstructionType, FilterOptionType } from "@/types";
import { SECTIONS } from "./constants";

const initialState: RecipeFormState = {
  recipeDraft: {
    title: "",
    description: "",
    cuisines: null,
    types: null,
    includeWeekly: true,
    ingredients: [{
      id: uuidv4(),
      name: "",
      amount: "",
      unit: ""
    }],
    instructions: [{
      id: uuidv4(),
      order: 1,
      title: "",
      text: "",
    }]
  },
  currentSection: 'Metadata',
  cuisineFilterList: [],
  typeFilterList: []
}
const recipeFormSlice = createSlice({
  name: 'recipeFormSlice',
  initialState,
  reducers: {
    updateMetadataField: <
      K extends keyof RecipeFormState["recipeDraft"]
    >(
      state: RecipeFormState,
      action: PayloadAction<{ key: K; value: RecipeFormState["recipeDraft"][K] }>
    ) => {
      state.recipeDraft[action.payload.key] = action.payload.value
    },
    toggleFilter: (
      state,
      action: PayloadAction<{ filterCategory: "types" | "cuisines"; filter: FilterOptionType }>
    ) => {
      const { filterCategory, filter } = action.payload;
      const existing = state.recipeDraft[filterCategory] ?? [];

      const index = existing.findIndex(f => f.id === filter.id);

      state.recipeDraft[filterCategory] =
        index >= 0
          ? existing.filter(f => f.id !== filter.id)
          : [...existing, filter];

    },
    updateIngredientField: <
      K extends keyof IngredientType
    >(
      state: RecipeFormState,
      action: PayloadAction<{ id: string; key: K; value: IngredientType[K] }>
    ) => {
      const { id, key, value } = action.payload;
      const ingredient = state.recipeDraft.ingredients.find(i => i.id === id);
      if (ingredient) {
        ingredient[key] = value;
      }
    },
    setIngredients: (state, action: PayloadAction<IngredientType[]>) => {
      state.recipeDraft.ingredients = action.payload;
    },
    addIngredient: (state) => {
      state.recipeDraft.ingredients.push({
        id: uuidv4(),
        name: "",
        amount: "",
        unit: "",
      });
    },
    removeIngredient: (state, action: PayloadAction<{ id: string }>) => {
      state.recipeDraft.ingredients = state.recipeDraft.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload.id
      );
    },
    updateInstructionField: <
      K extends keyof InstructionType
    >(
      state: RecipeFormState,
      action: PayloadAction<{ id: string, key: K, value: InstructionType[K] }>
    ) => {
      const { id, key, value } = action.payload;
      const instruction = state.recipeDraft.instructions.find(i => i.id === id)
      if (instruction) {
        instruction[key] = value
      }
    },
    setInstructions: (state, action: PayloadAction<InstructionType[]>) => {
      state.recipeDraft.instructions = action.payload;
    },
    addInstruction: (state) => {
      const lastOrder =
        state.recipeDraft.instructions.length > 0
          ? Math.max(...state.recipeDraft.instructions.map(i => i.order))
          : 0;

      state.recipeDraft.instructions.push({
        id: uuidv4(),
        order: lastOrder + 1,
        title: "",
        text: "",
      });
    },
    removeInstruction: (state, action: PayloadAction<{ id: string }>) => {
      state.recipeDraft.instructions = state.recipeDraft.instructions
        .filter((instruction) => instruction.id !== action.payload.id)
        // Reassign order sequentially
        .map((instruction, index) => ({
          ...instruction,
          order: index + 1,
        }));
    },
    setCurrentSection: (state, action: PayloadAction<(typeof SECTIONS)[number]>) => {
      state.currentSection = action.payload;
    },
    resetState: () => initialState
  }
})

export const {
  updateMetadataField,
  toggleFilter,
  updateIngredientField,
  setIngredients,
  addIngredient,
  removeIngredient,
  updateInstructionField,
  setInstructions,
  addInstruction,
  removeInstruction,
  setCurrentSection,
  resetState,
} = recipeFormSlice.actions
export default recipeFormSlice.reducer