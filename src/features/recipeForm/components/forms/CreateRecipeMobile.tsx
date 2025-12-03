import { useAppSelector } from "@/redux/hooks";
import { MetaDataSection, IngredientSection, InstructionSection, PreviewSection } from "../sections";
import { SlideWrapper } from "@/components";
import { useRecipeFormHandlers } from "../../hooks";


const CreateRecipeMobile = () => {

  const currentSection = useAppSelector(state => state.recipeForm.currentSection)
  
  const { handleNavigation, handleSubmit } = useRecipeFormHandlers();

  const mobileSlides = [
    { key: "Metadata", component: <MetaDataSection handleNavigation={handleNavigation} /> },
    { key: "Ingredients", component: <IngredientSection handleNavigation={handleNavigation} /> },
    { key: "Instructions", component: <InstructionSection handleNavigation={handleNavigation} /> },
    { key: "Preview", component: <PreviewSection /> },
  ];


  return (
    <div className="my-2">
      <form onSubmit={handleSubmit} id="create-recipe-form">
        <SlideWrapper
          activeKey={currentSection}
          slides={mobileSlides}
        />
      </form>
    </div>
  );
}

export default CreateRecipeMobile;