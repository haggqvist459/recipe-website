import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { selectIngredients, selectInstructions, selectMetadata, setCurrentSection } from "@/features/recipeForms";
import SectionWrapper from "../shared/SectionWrapper";
import { Heading, Output } from '@/components'
import { useLanguage } from "@/contexts";
import { translateText } from "@/utils";


const PreviewSection = () => {

  const { language } = useLanguage();

  const dispatch = useAppDispatch()
  const metaData = useAppSelector(selectMetadata);
  const ingredients = useAppSelector(selectIngredients)
  const instructions = useAppSelector(selectInstructions)

  return (
    <SectionWrapper>
      <div className="md:px-5 md:pt-2">
        <Heading title={translateText('preview', 'title', language)} />
        <div className="h-[60vh] flex flex-col flex-grow overflow-y-auto space-y-4 md:flex-row md:justify-between">
          <div className="space-y-2 w-full">
            <Output
              label={translateText('preview', 'recipeTitle', language)}
              value={metaData.title}
            />
            <Output
              label={translateText('preview', 'description', language)}
              value={metaData.description ?? translateText('preview', 'noDescription', language)}
            />
            <Heading title={translateText('preview', 'categories', language)} headingType="sub-heading" />
            <div className="flex">
              {metaData.types?.map((type) => (
                <Output
                  key={type.id}
                  value={type[`${language}_text`]}
                />
              ))}
            </div>
            <Heading title={translateText('preview', 'cuisines', language)} headingType="sub-heading" />
            <div className="flex">
              {metaData.cuisines?.map((cuisine) => (
                <Output
                  key={cuisine.id}
                  value={cuisine[`${language}_text`]}
                />
              ))}
            </div>
            <Output
              label="Include in weekly suggestions"
              value={metaData.includeWeekly ? "Yes" : "No"}
            />
          </div>
          <div className="space-y-2 w-full">
            <Heading title={translateText('preview', 'ingredients', language)} headingType="sub-heading" />
            {ingredients.map((ingredient) => (
              <div
                key={ingredient.id}
                className="">
                <Output
                  value={`- ${ingredient.amount} ${ingredient.unit} ${translateText('preview', 'of', language)} ${ingredient.name}`}
                />
              </div>
            ))}
          </div>
          <div className="space-y-2 w-full">
            <Heading title={translateText('preview', 'instructions', language)} headingType="sub-heading" />
            {instructions.map((instruction) => (
              <div
                key={instruction.id}
                className="flex flex-col">
                <Output
                  value={instruction.title}
                />
                <Output
                  value={instruction.text}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="w-full mt-2 flex space-x-2 lg:hidden">
          <button
            type="button"
            className="w-1/2 bg-secondary font-medium text-primary-text rounded"
            onClick={() => dispatch(setCurrentSection('Instructions'))}
          >
            {translateText('buttons', 'back', language)}
          </button>
          <button
            type="submit"
            form="recipe-form"
            className="w-1/2 bg-primary font-medium text-primary-text rounded"
          >
            {translateText('buttons', 'submit', language)}
          </button>
        </div>
      </div>
    </SectionWrapper>
  );
}

export default PreviewSection;
