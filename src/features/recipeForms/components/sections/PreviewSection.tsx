import { useAppSelector, useAppDispatch } from "@/integrations/redux/hooks"
import { selectIngredients, selectInstructions, selectMetadata, setCurrentSection } from "@/features/recipeForms"
import SectionWrapper from "../shared/SectionWrapper"
import { Heading } from '@/components/ui'
import { useLanguage } from "@/contexts"
import { translateText } from "@/shared"
import { FilterPill } from "@/features/filters"
import { getCategoryColourClasses } from "@/features/filters/helpers/categoryColours"


const PreviewSection = () => {

  const { language } = useLanguage()

  const dispatch = useAppDispatch()
  const metaData = useAppSelector(selectMetadata)
  const ingredients = useAppSelector(selectIngredients)
  const instructions = useAppSelector(selectInstructions)

  return (
    <SectionWrapper>
      <div className="md:p-2 space-y-2">
        <div className="flex gap-2">
          {metaData.cuisines.map(cuisine => {
            const { bg } = getCategoryColourClasses(cuisine.categoryCounter ?? 1)
            return <FilterPill key={cuisine.id} text={cuisine[`${language}_text`]} backgroundColour={bg} />
          })}
          {metaData.mainIngredients.map(mainIngredient => {
            const { bg } = getCategoryColourClasses(mainIngredient.categoryCounter ?? 1)
            return <FilterPill key={mainIngredient.id} text={mainIngredient[`${language}_text`]} backgroundColour={bg} />
          })}
        </div>
        <div className="border-b border-b-marblewhite flex flex-col">
          {metaData.title ?
            <Heading title={`${metaData.title}`} headingType="main-heading" />
            : <span className="main-heading">No title yet</span>
          }
          {metaData.description ?
            <span className="text-primary-text text-base font-light">{metaData.description}</span>
            : <span className="text-primary-text text-base font-light">No description yet</span>
          }

          <div className="flex space-x-2 text-sm text-primary-text font-light my-2">
            <span className="">{`${metaData.servings} servings`}</span>
            <span className="">•</span>
            <span className="">{`${ingredients.length} ingredients`}</span>
            <span className="">•</span>
            <span className="">{`${instructions.length} steps`}</span>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="space-y-2 w-full">
            <Heading title={translateText('preview', 'ingredients', language)} headingType="sub-heading" />
            {ingredients.map((ingredient) => (
              <div key={ingredient.id} className="flex justify-between border-b border-marblewhite pb-2">
                <span className="text-primary-text">{ingredient.name}</span>
                <div className="flex space-x-1 text-secondary-text">
                  <span>{ingredient.amount}</span>
                  <span>{ingredient.unit}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-2 w-full">
            <Heading title={translateText('preview', 'instructions', language)} headingType="sub-heading" />
            {instructions.map((instruction) => (
              <div key={instruction.id} className="flex flex-col p-3 bg-marblewhite rounded-lg">
                <div className="flex space-x-2">
                  <span className="text-secondary-text">{`Step ${instruction.order}`}</span>
                  <span className="text-primary-text">{instruction.title}</span>
                </div>
                <span className="text-primary-text font-light">{instruction.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full mt-2 flex space-x-2 lg:hidden">
          <button
            type="button"
            className="w-1/2 bg-secondary-text font-medium text-ceramic rounded button-click"
            onClick={() => dispatch(setCurrentSection('Instructions'))}
          >
            {translateText('buttons', 'back', language)}
          </button>
          <button
            type="submit"
            form="recipe-form"
            className="w-1/2 bg-primary font-medium text-ceramic rounded button-click"
          >
            {translateText('buttons', 'submit', language)}
          </button>
        </div>
      </div>
    </SectionWrapper>
  )
}

export default PreviewSection
