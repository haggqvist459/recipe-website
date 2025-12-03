import { useState } from "react";
import { MetaDataSection, IngredientSection, InstructionSection, PreviewSection } from "../sections";
import { SlideWrapper } from "@/components";
import { useRecipeFormHandlers } from "../../hooks";
import { useLanguage } from "@/contexts";
import { translateText } from "@/utils";

const CreateRecipeDesktop = () => {


  const { language } = useLanguage()
  const { handleNavigation, handleSubmit } = useRecipeFormHandlers();
  const [viewMode, setViewMode] = useState<"Edit" | "Preview">("Edit");

  const desktopSlides = [
    {
      key: "Edit", component: (
        <div className="">
          <div className="flex space-x-2">
            <MetaDataSection />
            <IngredientSection />
            <InstructionSection />
          </div>
          <div className="w-full flex justify-end mt-4 pl-4">
            <button
              type="button"
              onClick={() =>
                handleNavigation(() => setViewMode("Preview"))
              }
              className="w-1/3 bg-primary font-medium rounded border-primary border-2 hover:border-primary-text"
            >
              {translateText('buttons', 'previewRecipe', language)}
            </button>
          </div>
        </div>
      )
    },
    {
      key: "Preview", component: (
        <div className="mx-auto w-2/3">
          <PreviewSection />
          <div className="w-full flex justify-between mt-4">
            <button
              type="button"
              onClick={() => setViewMode("Edit")}
              className="w-1/3 bg-secondary font-medium rounded border-secondary border-2 text-primary-text hover:border-primary-text"
            >
              {translateText('buttons', 'edit', language)}
            </button>
            <button
              type="submit"
              form="create-recipe-form"
              className="w-1/3 bg-primary font-medium rounded border-primary border-2 text-primary-text hover:border-primary-text"
            >
              {translateText('buttons', 'submit', language)}
            </button>
          </div>
        </div>
      )
    },
  ];


  return (
    <div className="my-2">
      <form onSubmit={handleSubmit} id="create-recipe-form">
        <SlideWrapper
          activeKey={viewMode}
          slides={desktopSlides}
        />
      </form>
    </div>
  );
}

export default CreateRecipeDesktop;