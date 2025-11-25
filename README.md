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
- [ ] Edit, remove & Add for metadata
- [ ] Edit, Remove & Add features for ingredients 
- [ ] Edit, Remove & Add features for instructions 
- [ ] Delete entire recipe 

## Filters
- [ ] Edit existing filter text
- [ ] Add new filters
- [ ] Remove filters
 - [ ] Cascade into join table

## Search function
- [ ] search function should include matches on recipe titles, descriptions, and from the ingredient lists

## Auth: 
- [x] Move auth from AdminLayout to backend

### Main Page: 
- [x] List all recipes 
- [x] Add the filters as dropdowns 
- [x] Details view 
  - [ ] Link to edit form for admins ?
  - [x] Mark recipe as favorite for users 
  - [ ] Add ingredients to grocery list
  - [ ] Modify the number of people the recipe is for 

### Profile Page: 
- [x] Change email
- [x] Change password 
- [x] Edit favorite lists - view / delete
- [ ]

### Weekly lists: 
- [ ] Generate lists based on full randomisation 
 - [ ] Pick number of days  
 - [ ] Change number of people
 - [ ] Add filter options here too 
 
### Grocery list: 
- [ ] Re-use previous list project, add here 
 - [ ] Localstorage persist grocery list
 - [ ] Add new items to list 
 - [ ] share lists?

 ### MISC:
 - [x] Language options
  - [x] Translate web elements between ENG/SWE (headings, menu labels etc)
  - [ ] Translate recipes between ENG/SWE
  - [ ] Clean up horizontal menu styles in NavMenu - follow Filters.tsx
- [ ] Output.tsx too tightly coupled to single parent. Perhaps not a useful component in this project?
- [ ] Ensure similar structure on the backend layers 
  - [ ] Same try / catch principles 
  - [ ] Same import / export principles
  - [ ] Naming standards 
- [ ] Review error handling across pages and components 
  - [ ] Admin Page must redirect to error in case of non admin roles 
- [ ] Small toast component for undo actions / success messages 
- [ ] Refactor RecipeDetails.tsx - remove double markup