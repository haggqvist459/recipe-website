#### To Do:

### Create Recipes Page: 
## Create Form
- [x] Re-work cuisine and type, move away from enum to join tables 
  - [x] backend functionality to fetch the main_ingredients and cuisines 
- [x] Replace dropdowns with buttons for multple choice 
- [x] Re-work inserts into db 
- [x] look into as unkown on insert db query
- [x] Persist filters in Redux
- [x] Preview section output validation
- [x] Simplify ingredients and instruction input - copy paste friendly
- [x] Form validation, ensure non-empty fields are not left empty for required inputs
- [ ] For how many people are the recipe? 
- [ ] Finalise CreateRecipe forms:
  - [ ] hover: border on buttons in CreateRecipe components 
  - [ ] State is cleared after successful recipe insertion but no re-direct from preview page
  - [ ] Must also trigger a new fetch of recipes 

## Admin Dashboard 
# Edit Form 
- [x] Edit, remove & Add for metadata
- [x] Edit, Remove & Add features for ingredients 
- [x] Edit, Remove & Add features for instructions 
- [x] Delete entire recipe 
# Filters
- [ ] Edit existing filter text
- [ ] Add new filters
- [ ] Remove filters
 - [ ] Cascade into join table
# To do: 
- [ ] finalise the submission for update recipes 
- [ ] fix the breakpoints and styling for the recipe cards 
- [x] Troubleshoot issues with edit form - meta data is lost on page reloads when instructions and ingredients are not, and the filters are not properly selected

## Search function
- [ ] search function should include matches on recipe titles, descriptions, and from the ingredient lists

## Auth: 
- [x] Move auth from AdminLayout to backend

### Main Page: 
- [x] List all recipes 
- [x] Add the filters as dropdowns 
- [x] Details view 
- [x] Mark recipe as favorite for users 
- [ ] Modify the number of people the recipe is for 
- [x] Refactor RecipeDetails.tsx - remove double markup

### Profile Page: 
- [x] Change email
- [x] Change password 
- [x] Edit favorite lists - view / delete
- [ ] Meal planner settings

### Weekly lists: 
- [ ] Generate lists based on full randomisation 
 - [ ] Pick number of days  
 - [ ] Change number of people
 - [ ] Add filter options here too 
 
### Grocery list: 
- [x] Re-use previous list project, add here 
 - [x] Localstorage persist grocery list
 - [x] Add new items to list 
 - [ ] share lists
 - [x] Add ingredients from recipes to list 
 - [x] Backup list to database if authenticated 
 - [ ] Finalise null checks 
 - [ ] Ensure that grocery list ingredient aggregation can identify 'tomato', 'Tomatoes' and 'tomatoes' etc as the same ingredient. 
 - [ ] Add null checks to grocery list db actions for more precise toast messages

### Error Handling: 
- [ ] Review error handling across pages and components 
- [ ] Admin Page must redirect to error in case of non admin roles 
- [ ] Have the AuthContext display error messages in case of failed authentication 

## Success / Error Toast & Modal
- [ ] Ensure dynamic time before disappearing
- [ ] Add on successful favourite marking / removal 
- [ ] Database actions should have either Modal or Toast confirmation/errors 
- [x] Refactor all Modal usage to use the new Context 
- [x] Small toast component for success / error messages.
  - [ ] Finalise the toast styling
  - [ ] Add undo functionality?

### Backend: 
- [ ] Express.js pattern refactoring 
  - [ ] Standardize Request / Response object formats 
  - [ ] Auth middleware to run before handlers 
  - [ ] Error handling middleware
- [ ] Ensure similar structure on the backend layers 
  - [ ] Same import / export principles
  - [ ] Naming standards 

 ### MISC:
 - [x] Language options
  - [x] Translate web elements between ENG/SWE (headings, menu labels etc)
  - [ ] Translate recipes between ENG/SWE
  - [ ] Proper unit translations for ingredients
- [ ] Clean up horizontal menu styles in NavMenu - follow Filters.tsx
- [ ] Refactor Output.tsx 
 - [ ] Ensure full reusability 

- [x] Fix the empty favourite list use case on profile page 
- [x] Fix placement of favourite icon on RecipeDetail.tsx
- [x] Lock favourite icon size on RecipeCard.tsx
- [ ] Button highlights - apply new utility from index.css on buttons
- [ ] add invalid: classes on form elements for CreateRecipe, Auth page, Profile page settings etc
- [ ] Refactor ButtonRow component - use Tailwind instead of JavaScript
- [ ] Inspect sync of local and remote grocery lists
- [ ] Look into the horizontal menu wrapper, see if the active section state can be repeated less 
 
 ## Fade effects: 
- [ ] Include FadeInOutWrapper - allow fade effect on language change
- [ ] Include FadeInOutWrapper on Heading.tsx - allow fade effect on language change 
- [ ] Look into FadeWrappers dubious useEffect 
- [ ] Look into Fading in / out the recipe list once filters are applied 
