export const ROUTES = {
  HOME: '/',
  ADMIN: '/admin',
  ERROR: '/*',
  DETAILS: "/recipes/:id",
  DETAILS_PAGE: '/recipes/',
  PROFILE: '/profile',
  SIGN_IN: '/signin',
  GROCERY_LIST: '/groceries'
} as const;

export const NAVBAR_OPTIONS = {
  HOME: {
    route: ROUTES.HOME,
    id: 1,
    labelKey: 'home'
  },
  ADMIN: {
    route: ROUTES.ADMIN,
    id: 2,
    labelKey: 'admin'
  },
  PROFILE: {
    route: ROUTES.PROFILE,
    id: 3,
    labelKey: 'profile'
  },
  SIGN_IN: {
    route: ROUTES.SIGN_IN,
    id: 4,
    labelKey: 'signIn'
  },
  GROCERY_LIST: {
    route: ROUTES.GROCERY_LIST,
    id: 5, 
    labelKey: 'groceries'
  }
} as const ;


export const LOCALSTORAGE_KEYS = { 
  LANGUAGE_OPTION: 'languageOption',
  GROCERY_LIST: 'groceryList'
} as const;