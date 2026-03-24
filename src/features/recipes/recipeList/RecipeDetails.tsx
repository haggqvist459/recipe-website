import { useState } from "react";
import { setFavourite, removeFavourite } from "@/supabase/services";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useAuth, useLanguage } from "@/contexts";
import { translateText } from "@/utils";
import { updateServings } from "../slice";
import { Heading, Favourite, AddListItem, IconButton, CirclePlus, CircleMinus } from "@/components";
import { addFavourite, deleteFavourite, useIsFavourited } from "@/features/favourites";
import { addIngredients } from "@/features/groceryList";


const RecipeDetails = () => {

  const { language } = useLanguage()
  const { user } = useAuth();
  const recipe = useAppSelector(state => state.recipeList.activeRecipe)
  const dispatch = useAppDispatch()

  const isFavourite = useIsFavourited(recipe?.id ?? "")

  const [activeSection, setActiveSection] = useState<"ingredients" | "instructions">("ingredients");
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  if (!recipe) return null
  const toggleCompleted = (instructionId: string) => {
    setCompletedIds((prev) => {
      const next = new Set(prev);
      next.has(instructionId) ? next.delete(instructionId) : next.add(instructionId);
      return next;
    });
  };

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
      if (error instanceof Error) {
        console.error('toggleFavourite error:', error)
      } else {
        console.error('Unknown error: ', error)
      }
    }
  }

  return (
    <div className="">
      <div className="lg:hidden h-9 bg-primary flex justify-center space-x-5 font-medium">
        <button
          className={`text-primary-text ${activeSection === 'ingredients' ? 'underline decoration-2' : 'font-light'}`}
          onClick={() => setActiveSection('ingredients')}
        >
          {translateText('recipeDetailCard', 'ingredients', language)}
        </button>
        <button
          className={`text-primary-text ${activeSection === 'instructions' ? 'underline decoration-2' : 'font-light'}`}
          onClick={() => setActiveSection('instructions')}
        >
          {translateText('recipeDetailCard', 'instructions', language)}
        </button>
      </div>
      <div className="w-11/12 bg-white p-1 rounded-sm inset-shadow-xs/15 shadow-sm/15 mx-auto mt-5 mb-10 px-2 pb-5">
        <div className="flex justify-between items-center">
          <div className="">
            <div className="">
              <Heading title={recipe.title} />
              <Heading title={recipe.description ?? ''} headingType="sub-heading" />
            </div>
            <div className={`flex justify-between items-center rounded p-0.5`}>
              <IconButton
                className="p-1"
                disabled={recipe.servings <= 0}
                onClick={() => dispatch(updateServings(recipe.modifiedServings - 1))}
              >
                <CircleMinus size="size-7" />
              </IconButton>
              <span className="label">
                Servings: {recipe.modifiedServings}
              </span>
              <IconButton
                className="p-1"
                disabled={recipe.servings >= 20}
                onClick={() => dispatch(updateServings(recipe.modifiedServings + 1))}
              >
                <CirclePlus size="size-7" />
              </IconButton>
            </div>
          </div>
          <IconButton onClick={() => toggleFavourite()}>
            {user && <Favourite isToggled={isFavourite} />}
          </IconButton>
        </div>

        <div className="lg:flex lg:space-x-5 mt-5">
          <div className={`lg:w-1/3 ${activeSection === 'ingredients' ? 'block' : 'hid1den'} lg:block`}>
            <div className="relative">
              <ul className="list-disc list-inside px-2">
                {recipe.modifiedIngredients.map((ingredient) => (
                  <li
                    className="py-1"
                    key={ingredient.id}>
                    {ingredient.amount} {ingredient.unit} {translateText('recipeDetailCard', 'of', language)} {ingredient.name}
                  </li>
                ))}
              </ul>
              <IconButton
                className="absolute bottom-0 right-0 p-1 bg-lightblue rounded-full button-click"
                onClick={() => dispatch(addIngredients(recipe.modifiedIngredients))}
              >
                <AddListItem size="size-8" />
              </IconButton>
            </div>
          </div>
          <div className={`lg:w-2/3 ${activeSection === 'instructions' ? 'block' : 'hidden'} lg:block`}>
            {recipe.instructions.map((instruction) => (
              <button
                key={instruction.id}
                type="button"
                className={`flex flex-col mt-2 text-left ${completedIds.has(instruction.id) ? "line-through bg-primary-bg" : ""}`}
                onClick={() => toggleCompleted(instruction.id)}
              >
                <span className="label">{instruction.title}</span>
                <span>{instruction.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div >
  )
}

export default RecipeDetails;