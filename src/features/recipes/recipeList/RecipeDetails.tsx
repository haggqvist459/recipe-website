import { useState } from "react";
import { Heading, Favourite, AddListItem } from "@/components";
import { RecipeType } from "@/types";
import { useAuth, useLanguage } from "@/contexts";
import { translateText } from "@/utils";
import { setFavourite, removeFavourite } from "@/supabase/services";
import { useAppDispatch } from "@/redux/hooks";
import { addFavourite, deleteFavourite, useIsFavourited } from "@/features/favourites";
import { addIngredients } from "@/features/groceryList";

type Props = {
  recipe: RecipeType
}

const RecipeDetails = ({ recipe }: Props) => {

  const { language } = useLanguage()
  const { user } = useAuth();

  const dispatch = useAppDispatch()
  const isFavourite = useIsFavourited(recipe.id)


  const [activeSection, setActiveSection] = useState<"ingredients" | "instructions">("ingredients");
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

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
            <Heading title={recipe.title} />
            <Heading title={recipe.description ?? ''} headingType="sub-heading" />
          </div>
          <div className="py-2 self-start"
            onClick={() => toggleFavourite()}
          >
            {user && <Favourite isToggled={isFavourite} />}
          </div>
        </div>

        <div className="lg:flex lg:space-x-5 mt-5">
          <div className={`lg:w-1/3 ${activeSection === 'ingredients' ? 'block' : 'hidden'} lg:block`}>
            <div className="relative">
              <ul className="list-disc list-inside px-2">
                {recipe.ingredients.map((ingredient) => (
                  <li
                    className="py-1"
                    key={ingredient.id}>
                    {ingredient.amount} {ingredient.unit} {translateText('recipeDetailCard', 'of', language)} {ingredient.name}
                  </li>
                ))}
              </ul>
              <button
                className="absolute bottom-0 right-0 p-1 bg-lightblue rounded-full button-click"
                onClick={() => dispatch(addIngredients(recipe.ingredients))}
              >
                <AddListItem size="size-8" />
              </button>
            </div>
          </div>
          <div className={`lg:w-2/3 ${activeSection === 'instructions' ? 'block' : 'hidden'} lg:block`}>
            {recipe.instructions.map((instruction) => (
              <div
                key={instruction.id}
                className={`flex flex-col mt-2 cursor-pointer ${completedIds.has(instruction.id) ? "line-through bg-primary-bg" : ""
                  }`}
                onClick={() => toggleCompleted(instruction.id)}
              >
                <span className="label">{instruction.title}</span>
                <span>{instruction.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div >
  )
}

export default RecipeDetails;