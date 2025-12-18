import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { HorizontalMenuWrapper, HorizontalMenuButton, SlideWrapper } from "@/components";
import { useLanguage } from "@/contexts";
import { translateText } from "@/utils";
import { useRecipeFormHandlers } from "@/features/recipeForms/hooks";
import { MetaDataSection, IngredientSection, InstructionSection, PreviewSection } from "../sections";
import { setCurrentSection } from "../../slice";
import { SECTIONS } from "../../constants";


const EditRecipeMobile = () => {

  const { language } = useLanguage();
  const currentSection = useAppSelector(state => state.recipeForms.currentSection)
  const dispatch = useAppDispatch()
  const { handleNavigation, handleUpdate } = useRecipeFormHandlers();
  const [activeSection, setActiveSection] = useState<(typeof SECTIONS)[number]>('Metadata')

  const mobileSlides = [
    { key: "Metadata", component: <MetaDataSection /> },
    { key: "Ingredients", component: <IngredientSection toggleButtonState={false} /> },
    { key: "Instructions", component: <InstructionSection toggleButtonState={false} /> },
    { key: "Preview", component: <PreviewSection /> },
  ];


  return (
    <div className="">
      <HorizontalMenuWrapper justify="justify-start">
        <HorizontalMenuButton isActive={activeSection === "Metadata"} onClick={() => {
          handleNavigation(() => {
            dispatch(setCurrentSection("Metadata"))
            setActiveSection('Metadata')
          })
        }}>
          {translateText('createRecipe', 'metadata', language)}
        </HorizontalMenuButton>
        <HorizontalMenuButton isActive={activeSection === "Ingredients"} onClick={() => {
          handleNavigation(() => {
            dispatch(setCurrentSection("Ingredients"))
            setActiveSection('Ingredients')
          })
        }}>
          {translateText('createRecipe', 'ingredients', language)}
        </HorizontalMenuButton>
        <HorizontalMenuButton isActive={activeSection === "Instructions"} onClick={() => {
          handleNavigation(() => {
            dispatch(setCurrentSection("Instructions"))
            setActiveSection('Instructions')
          })
        }}>
          {translateText('createRecipe', 'instructions', language)}
        </HorizontalMenuButton>
        <HorizontalMenuButton isActive={activeSection === "Preview"} onClick={() => {
          handleNavigation(() => {
            dispatch(setCurrentSection("Preview"))
            setActiveSection('Preview')
          })
        }}>
          {translateText('createRecipe', 'preview', language)}
        </HorizontalMenuButton>
      </HorizontalMenuWrapper>
      <form onSubmit={handleUpdate} id="recipe-form">
        <SlideWrapper
          activeKey={currentSection}
          slides={mobileSlides}
          allowSwipe={true}
          onSwipe={(newKey) => {
            dispatch(setCurrentSection(newKey as typeof SECTIONS[number]))
            setActiveSection(newKey as typeof SECTIONS[number])
          }}
        />
      </form>
    </div>
  );
}

export default EditRecipeMobile;