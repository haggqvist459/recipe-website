import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { HorizontalMenuWrapper, SlideWrapper } from "@/components";
import { useLanguage } from "@/contexts";
import { translateText } from "@/utils";
import { useRecipeFormHandlers } from "@/features/recipeForms/hooks";
import { MetaDataSection, IngredientSection, InstructionSection, PreviewSection } from "../sections";
import { setCurrentSection } from "../../slice";
import { SECTIONS } from "../../constants";


const CreateRecipeMobile = () => {

  const { language } = useLanguage();
  const currentSection = useAppSelector(state => state.createRecipe.currentSection)
  const dispatch = useAppDispatch()
  const { handleNavigation, handleSubmit } = useRecipeFormHandlers();
  const [activeSection, setActiveSection] = useState<(typeof SECTIONS)[number]>('Metadata')

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