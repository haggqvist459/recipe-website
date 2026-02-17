#### To Do:

### Admin Page: 
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

## Edit Form 
- [x] Edit, remove & Add for metadata
- [x] Edit, Remove & Add features for ingredients 
- [x] Edit, Remove & Add features for instructions 
- [x] Delete entire recipe 
- [x] Redirect back to Admin Page after succesful edit 
- [x] Troubleshoot issues with edit form - meta data is lost on page reloads when instructions and ingredients are not, and the filters are not properly selected

## Filters
- [x] Edit existing filter text
- [x] Add new filters
- [x] Remove filters
 - [x] Cascade into join table
- [x] Refactor filters and types to always include both languages, and display only selected language 

### Main Page: 
- [x] List all recipes 
- [x] Add the filters as dropdowns 
- [x] Details view 
- [x] Mark recipe as favorite for users 
- [ ] Modify the number of people the recipe is for 

### Profile Page: 
- [x] Change email
- [x] Change password 
- [x] Edit favorite lists - view / delete
- [ ] Meal planner / weekly list settings

### Weekly lists: 
- [ ] Generate lists based on full randomisation 
 - [ ] Pick number of days  
 - [ ] Change number of people
 - [ ] Add filter options here too 
 
### Grocery list: 
- [x] Re-use previous list project, add here 
 - [x] Localstorage persist grocery list
 - [x] Add new items to list 
 - [ ] Share lists
  - [ ] Share link? Code? 
  - [ ] Second minor UI for shared list vs personal list? 
  - [ ] Menu but ton to share list, generate link / code? 
 - [x] Add ingredients from recipes to list 
 - [x] Backup list to database if authenticated 
 - [ ] Finalise null checks 

### Success / Error Toast & Modal
- [ ] Ensure dynamic time before disappearing
- [ ] Add on successful favourite marking / removal 
- [ ] Database actions should have either Modal or Toast confirmation/errors 
- [ ] Small toast component for success / error messages.
  - [ ] Finalise the toast styling
  - [ ] Add undo functionality?

### Error handling: 
- [ ] Review error handling across pages and components 
  - [ ] Admin Page must redirect to error in case of non admin roles

## Auth: 
- [x] useContext for authentication 
- [x] AdminLayout to protect authenticated paths 
- [x] Use user roles to determine access


## Search function
- [ ] search function should include matches on recipe titles, descriptions, and from the ingredient lists

 ### MISC:
 - [x] Language options
  - [x] Translate web elements between ENG/SWE (headings, menu labels etc)
  - [ ] Translate recipes between ENG/SWE
  - [ ] Proper unit translations for ingredients
  - [ ] Add missing translations for static web elements such as headings and buttons

- [ ] Clean up horizontal menu styles in NavMenu - follow Filters.tsx
- [ ] Look into the horizontal menu wrapper, see if the active section state can be repeated less 
- [ ] Refactor Output.tsx 
 - [ ] Ensure full reusability 
 - [ ] Include FadeInOutWrapper - allow fade effect on language change

- [ ] Include FadeInOutWrapper on Heading.tsx - allow fade effect on language change 

- [ ] Ensure similar structure on the service and query layers 
  - [ ] Same try / catch principles 
  - [ ] Same import / export principles
  - [ ] Naming standards 
 

- [x] Refactor RecipeDetails.tsx - remove double markup
- [ ] Look into FadeWrappers dubious useEffect 
- [ ] Look into Fading in / out the recipe list once filters are applied 
- [x] Fix the empty favourite list use case on profile page 
- [x] Fix placement of favourite icon on RecipeDetail.tsx
- [x] Lock favourite icon size on RecipeCard.tsx
- [ ] Finalise CreateRecipe forms:
  - [ ] hover: border on buttons in CreateRecipe components 
  - [ ] State is cleared after successful recipe insertion but no re-direct from preview page
  - [ ] Must also trigger a new fetch of recipes 
  - [ ] Form validation - no validation occuring on the large input fields on ingredients and instructions 
- [x] Button highlights - apply new utility (button-click) from index.css on buttons
- [ ] add invalid: classes on form elements for CreateRecipe, Auth page, Profile page settings etc
- [x] Refactor ButtonRow component - use Tailwind instead of JavaScript
- [ ] Inspect sync of local and remote grocery lists
- [ ] Add null checks to grocery list db actions for more precise toast messages
- [x] Refactor all Modal usage to use the new Context 

- [ ] Ensure that grocery list ingredient aggregation can identify 'tomato', 'Tomatoes' and 'tomatoes' etc as the same ingredient. 


