import { useState } from "react"
import { setFavourite, removeFavourite } from "@/integrations/supabase/services"
import { useAppDispatch } from "@/integrations/redux/hooks"
import { useAuth, useLanguage, useNotification } from "@/contexts"
import { handleError } from "@/errorHandling"
import { RecipeType } from "@/shared/types"
import { translateText } from "@/shared"
import { Heading, IconButton } from "@/components/ui"
import { Favourite, CircleMinus, CirclePlus } from "@/components/icons"
import { addFavourite, deleteFavourite, useIsFavourited } from "@/features/favourites"
import { FilterPill } from "@/features/filters"
import { addIngredients } from "@/features/groceryList"
import { getCategoryColourClasses } from "@/features/filters/helpers/categoryColours"



type Props = {
  recipe: RecipeType
}
const RecipeDetails = ({ recipe }: Props) => {

  const { language } = useLanguage()
  const { user } = useAuth()
  const { showToast } = useNotification()

  const dispatch = useAppDispatch()

  const isFavourite = useIsFavourited(recipe?.id ?? "")
  const [activeSection, setActiveSection] = useState<"ingredients" | "instructions">("ingredients")
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set())
  const [modifiedIngredients, setModifiedIngredients] = useState(recipe.ingredients)
  const [modifiedServings, setModifiedServings] = useState(recipe.servings)


  const updateServings = (newServings: number) => {
    const ratio = newServings / recipe.servings
    setModifiedServings(newServings)
    setModifiedIngredients(recipe.ingredients.map(ingredient => ({
      ...ingredient,
      amount: parseFloat((parseFloat(ingredient.amount) * ratio).toFixed(2)).toString()
    })))
  }

  const toggleCompleted = (instructionId: string) => {
    setCompletedIds((prev) => {
      const next = new Set(prev)
      next.has(instructionId) ? next.delete(instructionId) : next.add(instructionId)
      return next
    })
  }

  const toggleFavourite = async () => {
    if (!user) return

    try {
      if (isFavourite) {
        await removeFavourite(user.id, recipe.id)
        dispatch(deleteFavourite(recipe.id))
      } else {
        const newFavourite = await setFavourite(user.id, recipe.id)
        dispatch(addFavourite(newFavourite))
      }
    } catch (error) {
      showToast(handleError(error), 'error')
    }
  }

  const handleAddToGroceryClick = () => {
    dispatch(addIngredients(modifiedIngredients))
    //display toast, confirming ingredients added to list 
    showToast('Ingredients added to the grocery list', 'info')
  }


  return (
    <div className="px-5 mb-5">
      <div className="flex flex-col md:flex-row md:space-x-5">
        <div className="w-full md:w-1/3">
          {/* top section - titles, servings, categories */}
          <div className="">
            {/* FilterPill, Favorite */}
            <div className="flex mt-5">
              <div className="flex flex-1 gap-2">
                {recipe.mainIngredients.map((filter) => {
                  const { bg } = getCategoryColourClasses(filter.categoryCounter ?? 1)
                  return <FilterPill key={filter.id} text={filter[`${language}_text`]} backgroundColour={bg} />
                })}
              </div>
              <IconButton onClick={() => toggleFavourite()}>
                {user && <Favourite isToggled={isFavourite} />}
              </IconButton>
            </div>
            {/* Title, description */}
            <div className="mt-4 flex flex-col space-y-2">
              <Heading title={recipe.title} headingType="section-heading" />
              <span className="label">{recipe.description}</span>
              {recipe.cuisines.map((cuisine) => (
                <div key={cuisine.id}>
                  <span className="text-sm">{cuisine[`${language}_text`]}</span>
                  {(recipe.cuisines?.length ?? 0) > 1 ? <span>•</span> : null}
                </div>
              ))}
            </div>
            {/* Servings */}
            <div className={`flex mt-5 justify-between items-center rounded`}>
              <span className="label">
                {translateText('recipeDetailCard', 'servings', language)}
              </span>
              <div className="flex items-center gap-5">
                <IconButton
                  className="p-1"
                  disabled={recipe.servings <= 0}
                  onClick={() => updateServings(modifiedServings - 1)}
                >
                  <CircleMinus size="size-7" />
                </IconButton>
                <span className="label">{modifiedServings}</span>
                <IconButton
                  className="p-1"
                  disabled={recipe.servings >= 20}
                  onClick={() => updateServings(modifiedServings + 1)}
                >
                  <CirclePlus size="size-7" />
                </IconButton>
              </div>
            </div>
            {/* Ingredients / instructions toggle */}
            <div className="md:hidden h-9 border-b-1 border-secondary flex justify-center space-x-5 font-medium mt-5">
              <button
                className={`text-primary-text w-full ${activeSection === 'ingredients' ? 'border-b-deepred border-b-2' : 'font-light'}`}
                onClick={() => setActiveSection('ingredients')}
              >
                {translateText('recipeDetailCard', 'ingredients', language)}
              </button>
              <button
                className={`text-primary-text w-full ${activeSection === 'instructions' ? 'border-b-deepred border-b-2' : 'font-light'}`}
                onClick={() => setActiveSection('instructions')}
              >
                {translateText('recipeDetailCard', 'instructions', language)}
              </button>
            </div>
          </div>
          {/* End of top section */}
          {/* Ingredients section */}
          <div className="hidden md:block mt-5">
            <Heading title={translateText('recipeDetailCard', 'ingredients', language)} headingType="sub-heading" />
          </div>
          <div className={`${activeSection === 'ingredients' ? 'block' : 'hidden'} md:block`}>
            <div className={`bg-tertiary my-5 rounded-2xl p-2`}>
              <div className="relative">
                <ul className="list-inside px-2">
                  {modifiedIngredients.map((ingredient, index) => (
                    <li
                      className={`py-3 border-b-1 border-secondary flex justify-between ${index === modifiedIngredients.length - 1 ? "border-none" : ""}`}
                      key={index}
                    >
                      <span className="text-primary-text">{ingredient.name}</span>
                      <span className="text-secondary-text font-medium">{ingredient.amount} {ingredient.unit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              className="w-full rounded-2xl border-lightred border-2 py-3 active:border-primary-bg active:bg-lightred active:text-primary-bg"
              onClick={handleAddToGroceryClick}
            >
              <span className="font-semibold text-lightred flex space-x-2 justify-center">Add to grocery list</span>
            </button>
          </div>
        </div>
        <div className="md:w-2/3 md:border-l-1 border-secondary md:pl-5 md:my-5">
          <div className="hidden md:block">
            <Heading title={translateText('recipeDetailCard', 'instructions', language)} headingType="sub-heading" />
          </div>
          <div className={`my-5 rounded-2xl ${activeSection === 'instructions' ? 'block' : 'hidden'} md:block`}>
            {recipe.instructions.map((instruction, index) => (
              <div
                className="bg-tertiary px-4 py-2 my-4 rounded-2xl"
                key={instruction.id + index}
              >
                <button

                  type="button"
                  className={`flex flex-col mt-2 text-left ${completedIds.has(instruction.id) ? "line-through" : ""}`}
                  onClick={() => toggleCompleted(instruction.id)}
                >
                  <span className="label">
                    <span className="text-lightred">{`Step ${index + 1}`}</span>
                    <span className="inline-block w-3" aria-hidden="true" />
                    {instruction.title}
                  </span>
                  <span>{instruction.text}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeDetails