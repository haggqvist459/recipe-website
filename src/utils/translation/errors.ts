

export const ERROR_TEXT = {
  en: {
    auth: {
      passwordDifferentCurr: 'New password must be different from the current password.',
      passwordLength: 'Password must be at least 8 characters.',
      passwordUppercase: 'Password must contain at least one uppercase letter.',
      passwordLowercase: 'Password must contain at least one lowercase letter.',
      passwordNumber: 'Password must contain at least one number.',
      passwordSpecialChar: 'Password must contain at least one special character.',
    },
    favourites: {},
    filters: {
      filterCategory: 'There is a problem with the filter category provided with the new filter.',
      attachRecipeMainIngredients: '',
      attachRecipeCuisines: '',
      updateFilter: 'The filter category is wrong, can not update the filter.',
    },
    groceries: {
      saveList: 'Failed to create grocery list. Try again.'
    },
    recipes: {
      processRecipeTitle: 'Recipe title is required.',
      processRecipeIngredient: 'Each ingredient must have a text, amount, and unit.',
      processRecipeInstruction: 'Each instruction must have a title and description.',
      processRecipePermission: 'You do not have permission to create a recipe.',
    }
  },
  sv: {
    auth: {
      passwordDifferentCurr: 'Nytt lösenord måste vara annorlunda än det nuvarande lösenordet.',
      passwordLength: 'Lösenordet måster vara minst 8 tecken.',
      passwordUppercase: 'Lösenordet måste innehålla minst en stor bokstav.',
      passwordLowercase: 'Lösenordet måste innehålla minst en liten bokstav.',
      passwordNumber: 'Lösenordet måste innehålla minst ett nummer.',
      passwordSpecialChar: 'Lösenordet måste innehålla minst ett specialtecken.',
    },
    favourites: {},
    filters: {
      filterCategory: 'Det finns ett problem med filterkategorin till det nya filtret.',
      attachRecipeMainIngredients: '',
      attachRecipeCuisines: '',
      updateFilter: 'Felaktiv filterkategori, kan inte uppdatera filtret.',
    },
    groceries: {
      saveList: 'Misslyckades med att spara inköpslistan. Försök igen.'
    },
    recipes: {
      processRecipeTitle: 'Receptets titel saknas.',
      processRecipeIngredient: 'Varje ingrediens behöver en text, mängd och enhet.',
      processRecipeInstruction: 'Varje instruction behöver en titel och en text.',
      processRecipePermission: 'Du saknar behörighet för att skapa ett recept.',
    }
  }
} as const