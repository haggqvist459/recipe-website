export const ROUTES = {
  HOME: '/',
  ADMIN: '/admin',
  ERROR: '/*',
  RECIPES: '/recipes',
  DETAILS: ":id",
  PROFILE: '/profile',
  SIGN_IN: '/signin',
  GROCERY_LIST: '/groceries',
  CREATE_RECIPE: '/create',
  EDIT_RECIPE: ':id',
} as const;

export const NAVBAR_OPTIONS = {
  HOME: {
    route: ROUTES.HOME,
    id: 1,
    labelKey: 'home',
    end: true,
  },
  RECIPES: {
    route: ROUTES.RECIPES,
    id: 2,
    labelKey: 'recipes',
    end: false,
  },
  ADMIN: {
    route: ROUTES.ADMIN,
    id: 3,
    labelKey: 'admin',
    end: true,
  },
  PROFILE: {
    route: ROUTES.PROFILE,
    id: 4,
    labelKey: 'profile',
    end: true,
  },
  SIGN_IN: {
    route: ROUTES.SIGN_IN,
    id: 5,
    labelKey: 'signIn',
    end: true,
  },
  GROCERY_LIST: {
    route: ROUTES.GROCERY_LIST,
    id: 6,
    labelKey: 'groceries',
    end: true,
  },
  CREATE_RECIPE: {
    route: ROUTES.CREATE_RECIPE,
    id: 7,
    labelKey: 'createRecipe',
    end: true,
  }

} as const;


export const LOCALSTORAGE_KEYS = {
  LANGUAGE_OPTION: 'languageOption',
  GROCERY_LIST: 'groceryList'
} as const;

export const LANGUAGES = [
  { code: 'sv', label: 'Svenska' },
  { code: 'en', label: 'English' }
] as const;
